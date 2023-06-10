const uuid_v4 = require('uuid').v4;
const Sets = require('../models/set');
const Flashcards = require('../models/flashcard');
const axios = require('axios');
const GATEWAY_URL = process.env.GATEWAY_URL || "http://localhost:8080"

class SetController {
    static getSetObjs(sets) {
        return sets.map(item => {
            return {
                setUid: item.set_uid, 
                name: item.name, 
                description: item.description, 
                level: item.level, 
                categoryId: item.category_id,
                username: item.username
            }
        })
    }
    static getSetObj(set, flashcards) {
        let cards = flashcards.map(item => {
            return {
                id: item.id,
                word: item.word,
                meaning: item.meaning,
                example: item.example
            }
        })
        return {
            setUid: set.set_uid,
            name: set.name,
            description: set.description,
            level: set.level, 
            categoryId: set.category_id,
            flashcards: cards
        }
    }

    static getSets = async(req, res, next) => {
        let username = req.query.username
        let page = req.query.page || 1;
        let limit = req.query.size || 1;
        let offset = (page-1) * limit;
        let queryRes = {};
        try{
            if(username){
                queryRes = await Sets.findAndCountAll({ where: {username: username}, offset, limit }); 
            } else {
                queryRes = await Sets.findAndCountAll({ where: {}, offset, limit }); 
            }
            return res.status(200).json({
                page: Number(page), 
                pageSize: Number(limit), 
                totalElements: queryRes.count, 
                items: this.getSetObjs(queryRes.rows)
            });
        } catch (e) {
            return res.status(500).json({'error': e})
        }
    }

    static getLearned = async(req, res, next) => {
        let page = req.query.page || 1;
        let limit = req.query.size || 1;
        const authHeader = req.headers['authorization'];
        try{
            let learned = await axios.get(GATEWAY_URL + `/api/v1/history?page=${page}&size=${limit}`, 
                { headers: {"Authorization" : authHeader}});
            let setIds = learned.data.items.map(item => {return item.setUid});
            if(setIds.length > 0) {
                let rows = await Sets.findAll({ where: {set_uid: setIds}});
                return res.status(200).json({
                    page: Number(page), 
                    pageSize: Number(limit), 
                    totalElements: rows.length, 
                    items: this.getSetObjs(rows)
                });
            } else {
                return res.status(200).json({
                    page: Number(page), 
                    pageSize: Number(limit), 
                    totalElements: 0, 
                    items: []
                });
            }
        } catch (e) {
            return res.status(500).json({'error': e})
        }

    }

    static getSet = async(req, res, next) => {
        const set = await Sets.findOne({where: {set_uid: req.params.setUid}})
        if (set) {
            const rows = await Flashcards.findAll({ where: { set_id: set.id }})
            return res.status(200).json(this.getSetObj(set, rows))
        } else {
            return res.status(404).json({message: "Item not found"})
        }
    }

    static newSet = async(req, res, next) => {
        let username = req.headers['x-user-name'];
        let {name, description, level, categoryId, flashcards} = req.body
        let uid = uuid_v4()
        const MODEL = {
            set_uid: uid,
            name: name,
            description: description,
            level: level,
            category_id: categoryId,
            username: username
        }
        try{
            const set = await Sets.create(MODEL)
            let cards = []
            for(let card of flashcards) {
                cards.push(await Flashcards.create({
                    word: card.word,
                    meaning: card.meaning,
                    example: card.example,
                    set_id: set.id
                }))
            }
            return res.status(201).json(this.getSetObj(set, cards))
        } catch (e) {
            return res.status(500).json({'error': e})
        }
    }
    
    static updateSet = async(req, res, next) => {
        let username = req.headers['x-user-name'];
        let {name, description, level, categoryId, flashcards} = req.body;
        let set = await Sets.findOne({where: {set_uid: req.params.setUid}})
        if (set) {
            if (set.username != username){
                return res.status(401).json({message: "No permission"})
            }
            try{
                await Sets.update({
                    name: name,
                    description: description,
                    level: level,
                    category_id: categoryId
                }, {where: { id: set.id }})
                let cards_before = await Flashcards.findAll({where: { set_id: set.id }})
                let flashcards_ids = flashcards.map(item => {return item.id})
                for(let card of cards_before) {
                    if (! flashcards_ids.includes(card.id)) {
                        await Flashcards.delete({where: {id: card.id}})
                    }
                }
                for(let card of flashcards) {
                    if (card.id) {
                        await Flashcards.update({
                            word: card.word,
                            meaning: card.meaning,
                            example: card.example,
                        } ,{where: { id : card.id }})
                    } else {
                        await Flashcards.create({
                            word: card.word,
                            meaning: card.meaning,
                            example: card.example,
                            set_id: set.id
                        })
                    } 
                }
                return res.status(204).json()
            } catch (e) {
                return res.status(500).json({'error': e})
            }  
        } else {
            return res.status(404).json({message: "Item not found"})
        }              
    }

    static deleteSet = async(req, res, next) => {
        let username = req.headers['x-user-name'];
        let set = await Sets.findOne({where: {set_uid: req.params.setUid}})
        if (set) {
            if (set.username != username){
                return res.status(401).json({message: "No permission"})
            }
            await Flashcards.destroy({ where: { set_id: set.id }})
            await Sets.destroy({where: { id: set.id }})
            return res.status(204).json()
        } else {
            return res.status(404).json({message: "Item not found"})
        }     
    }

    static copySet = async(req, res, next) => {
        let username = req.headers['x-user-name'];
        const set = await Sets.findOne({where: {set_uid: req.params.setUid}})
        if (set) {
            const flashcards = await Flashcards.findAll({ where: { set_id: set.id }})
            let uid = uuid_v4()
            const MODEL = {
                set_uid: uid,
                name: set.name,
                description: set.description,
                level: set.level,
                category_id: set.category_id,
                username: username
            }
            try {
                const newSet = await Sets.create(MODEL)
                let cards = []
                for(let card of flashcards) {
                    cards.push(await Flashcards.create({
                        word: card.word,
                        meaning: card.meaning,
                        example: card.example,
                        set_id: newSet.id
                    }))
                }
                return res.status(201).json(this.getSetObj(newSet, cards))
            } catch (e) {
                return res.status(500).json({'error': e})
            }
        } else {
            return res.status(404).json({message: "Item not found"})
        }
        
    }
}

module.exports = SetController;
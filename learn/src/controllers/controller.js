const uuid_v4 = require('uuid').v4;
const Histories = require('../models/history');
const Op = require('sequelize').Op;

class LearnController {
    static getHistoryObjs(histories) {
        return histories.map(item => {return this.getHistoryObj(item)})
    }
    static getHistoryObj(item) {
        return {
            historyUid: item.history_uid,
            setUid: item.set_uid, 
            username: item.username, 
            rememberRate: item.remember_rate, 
            lastLearn: item.last_learn, 
            lastTest: item.last_test,
            notification: item.notification
        }
    }

    static getAll = async(req, res, next) => {
        let username = req.headers['x-user-name'];
        let page = req.query.page || 1;
        let limit = req.query.size || 1;
        let offset = (page-1) * limit;
        try{          
            const {count, rows} = await Histories.findAndCountAll({ where: {username}, offset, limit });
            return res.status(200).json({
                page: Number(page), 
                pageSize: Number(limit), 
                totalElements: count, 
                items: this.getHistoryObjs(rows)
            });
        } catch (e) {
            return res.status(500).json({'error': e})
        }        
    }

    static getOne = async(req, res, next) => {
        const item = await Histories.findOne({where: {history_uid: req.params.historyUid}})
        return res.status(200).json(this.getHistoryObj(item))
    }

    static updateOne = async(req, res, next) => {
        let username = req.headers['x-user-name'];
        let item = await Histories.findOne({where: {history_uid: req.params.historyUid}})
        if (item) {
            if (item.username != username){
                return res.status(401).json({message: "No permission"})
            }
            let {action, value, rate} = req.body
            try {    
                if (action == 'NOTIFICATION') {
                    await Histories.update({notification: value}, {where: {id: item.id}})
                } else if (action == 'LEARN') {
                    await Histories.update({last_learn: value}, {where: {id: item.id}})
                } else if (action == 'TEST') {
                    await Histories.update({last_test: value, remember_rate: rate}, {where: {id: item.id}})
                } else if (action = 'SET') {
                    await Histories.update({set_uid: value}, {where: {id: item.id}})
                }
                return res.status(204).json()
            } catch (e) {
                return res.status(500).json({'error': e})
            }    
        } else {
            return res.status(404).json({message: "Item not found"})
        }            
    }

    static deleteOne = async(req, res, next) => {
        let username = req.headers['x-user-name'];
        let item = await Histories.findOne({where: {history_uid: req.params.historyUid}});         
        if (item) {
            if (item.username != username){
                return res.status(401).json({message: "No permission"});
            }
            await Histories.destroy({where: { id: item.id }});
            return res.status(204).json();            
        } else {
            return res.status(404).json({message: "Item not found"})
        }             
    }

    static get = async(req, res, next) => {
        let username = req.headers['x-user-name'];
        const item = await Histories.findOne({where: {set_uid: req.params.setUid, username: username}})
        return res.status(200).json(this.getHistoryObj(item))
    }

    static new = async(req, res, next) => {
        let username = req.headers['x-user-name'];
        let {setUid} = req.body
        let uid = uuid_v4();
        const history = await Histories.findOne({where: {set_uid: setUid, username: username}})
        if (history) {
            return res.status(200).json({})
        } else {
            const MODEL = {
                set_uid: setUid,
                username: username,
                history_uid: uid
            }
            try{     
                const item = await Histories.create(MODEL)
                return res.status(201).json(this.getHistoryObj(item))
            } catch (e) {
                return res.status(500).json({'error': e})
            } 
        }               
    }

    static update = async(req, res, next) => {
        let username = req.headers['x-user-name'];
        let history = await Histories.findOne({where: {set_uid: req.params.setUid, username: username}})
        if (!history) {
            let uid = uuid_v4();
            const MODEL = {
                set_uid: req.params.setUid,
                username: username,
                history_uid: uid
            }
            try {     
                history = await Histories.create(MODEL)
            } catch (e) {
                return res.status(500).json({'error': e})
            } 
        }       
        let {action, value, rate} = req.body   
        try {    
            if (action == 'NOTIFICATION') {
                await Histories.update({notification: value}, {where: {id: history.id}})
            } else if (action == 'LEARN') {
                await Histories.update({last_learn: value}, {where: {id: history.id}})
            } else if (action == 'TEST') {
                await Histories.update({last_test: value, remember_rate: rate}, {where: {id: history.id}})
            } else if (action = 'SET') {
                await Histories.update({set_uid: value}, {where: {id: history.id}})
            }
            return res.status(204).json()
        } catch (e) {
            return res.status(500).json({'error': e})
        }     
    }

    static getNotice = async(req, res, next) => {
        let username = req.headers['x-user-name'];
        try{          
            const rows = await Histories.findAll({ where: {username: username, notification : {  [Op.lte]: new Date() }} });
            if(rows.length > 0) {
                return res.status(200).json({items: this.getHistoryObjs(rows)});
            } else {
                return res.status(200).json({items: []});
            }
        } catch (e) {
            return res.status(500).json({'error': e})
        }        
    }

}

module.exports = LearnController;
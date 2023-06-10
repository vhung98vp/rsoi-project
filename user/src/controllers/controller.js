const Users = require('../models/user');

class UserController {
    static getUserObj(user) {
        return {
            email: user.email,
            username: user.username
        }
    }

    static getAll = async(req, res, next) => {
        try {
            const items = await Users.findAll()
            return res.status(200).json(items)
        } catch (e) {
            return res.status(500).json({'error': e})
        }  
    }

    static getOne = async(req, res, next) => {
        const item = await Users.findOne({where: {id: req.params.id}})
        return res.status(200).json(item)            
    }

    static new = async(req, res, next) => {
        let {email, username} = req.body
        const MODEL = {
            email: email,
            username: username
        }
        try{
            const item = await Users.create(MODEL)
            return res.status(201).json(this.getUserObj(item))
        } catch (e) {
            return res.status(500).json({'error': e})
        }       
    }
    
    static updateOne = async(req, res, next) => {
        let item = await Users.findOne({where: {id: req.params.id}})
        let {email, username} = req.body
        if (item) {
            try {
                await Users.update({
                    email: email,
                    username: username
                }, {where: { id: item.id }})
                return res.status(204).json()
            } catch (e) {
                return res.status(409).json()
            }
        } else {
            return res.status(404).json({message: "Item not found"})
        }                   
    }

    static deleteOne = async(req, res, next) => {
        let item = await Users.findOne({where: {id: req.params.id}})
        if (item) {
            await Users.destroy({where: { id: item.id }})
            return res.status(204).json()
        } else {
            return res.status(404).json({message: "Item not found"})
        }            
    }

    static get = async(req, res, next) => {
        let username = req.headers['x-user-name'];
        let item = await Users.findOne({where: {username}})
        if(item) {
            return res.status(200).json(this.getUserObj(item)) 
        } else {
            let email = req.headers['x-email'];
            const MODEL = {
                email: email,
                username: username
            }
            try{
                item = await Users.create(MODEL)
                return res.status(201).json(this.getUserObj(item))
            } catch (e) {
                return res.status(500).json({'error': e})
            }       

        }
        
    }

    static isAdmin = async(req, res, next) => {
        let username = req.headers['x-user-name'];
        const item = await Users.findOne({where: {username}})
        if(item) {
            return res.status(200).json({ admin: item.role == 'ADMIN'})
        } else {
            return res.status(404).json({message: "Item not found"})
        }
        
    }
}

module.exports = UserController;
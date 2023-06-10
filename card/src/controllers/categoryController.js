const Categories = require('../models/category');

class CategoryController {
    static getAll = async(req, res, next) => {
        const items = await Categories.findAll()
        return res.status(200).json(items)        
    }

    static getOne = async(req, res, next) => {
        const item = await Categories.findOne({where: {id: req.params.id}})
        return res.status(200).json(item)        
    }

    static new = async(req, res, next) => {
        let {name} = req.body
        const MODEL = {
            name: name,
        }
        try{
            const item = await Categories.create(MODEL)
            return res.status(201).json(item)
        } catch (e) {
            return res.status(500).json({'error': e})
        }
    }
    
    static updateOne = async(req, res, next) => {
        let item = await Categories.findOne({where: {id: req.params.id}})
        let {name} = req.body;
        if (item) {
            try {
                await Categories.update({name}, {where: { id: item.id }})
                return res.status(204).json()
            } catch (e) {
                return res.status(500).json({'error': e})
            }
        } else {
            return res.status(404).json({message: "Item not found"})
        }        
    }

    static deleteOne = async(req, res, next) => {
        let item = await Categories.findOne({where: {id: req.params.id}})
        if (item) {
            try {
                await Categories.destroy({where: { id: item.id }})
                return res.status(204).json()
            } catch (e) {
                return res.status(500).json({'error': e})
            }
        } else {
            return res.status(404).json({message: "Item not found"})
        }        
    }
}

module.exports = CategoryController;
const Statistics = require('../models/statistic');

class StatisticController {

    static getAll = async(req, res, next) => {
        let page = req.query.page || 1;
        let limit = req.query.size || 1;
        let offset = (page-1) * limit;
        try {
            const rows = await Statistics.findAll({ order: [['date', 'DESC']], offset, limit }); 
            return res.status(200).json({
                page: Number(page), 
                pageSize: Number(limit), 
                totalElements: rows.count, 
                items: rows
            });
        } catch (e) {
            return res.status(500).json({'error': e})
        }  
    }

    static new = async(req, res, next) => {
        let {method, url} = req.body
        const MODEL = {
            date: new Date(),
            method: method,
            url: url
        }
        try{
            const item = await Statistics.create(MODEL)
            return res.status(201).json(item)
        } catch (e) {
            return res.status(500).json({'error': e})
        }       
    }
    
}

module.exports = StatisticController;
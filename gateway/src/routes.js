const STATISTIC_URL = process.env.STATISTIC_URL || 'http://localhost:8040';
const USER_URL = process.env.USER_URL || 'http://localhost:8050';
const CARD_URL = process.env.CARD_URL || 'http://localhost:8060';
const LEARN_URL = process.env.LEARN_URL || 'http://localhost:8070';

const ROUTES = [
    {
        url: '/api/v1/history',
        options: {
            target: LEARN_URL,
            changeOrigin: true,
            pathRewrite: {'^/api/v1' : ''}
        }
    },
    {
        url: '/api/v1/set',
        options: {
            target: CARD_URL,
            changeOrigin: true,
            pathRewrite: {'^/api/v1' : ''}
        }
    },
    {
        url: '/api/v1/category',
        options: {
            target: CARD_URL,
            changeOrigin: true,
            pathRewrite: {'^/api/v1' : ''}
        }
    },
    {
        url: '/api/v1/user',
        options: {
            target: USER_URL,
            changeOrigin: true,
            pathRewrite: {'^/api/v1' : ''}
        }
    },
    {
        url: '/api/v1/statistic',
        options: {
            target: STATISTIC_URL,
            changeOrigin: true,
            pathRewrite: {'^/api/v1' : ''}
        }
    }
]

module.exports = ROUTES;
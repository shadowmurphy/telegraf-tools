module.exports = (bot) => {
    const loaderlib = require('./src/loadlib')(bot); 
    return {
        ...loaderlib,
        logger: require('./src/logger'),
    }
};
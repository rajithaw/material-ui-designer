var debug = require('debug');

class LogService {
    constructor(namespace){
        // create error logger
        this.errorLogger = debug(`${namespace}:error`);

        // create info logger
        this.infoLogger = debug(`${namespace}:info`);
        // eslint-disable-next-line
        this.infoLogger.log = console.info.bind(console);

        // create debug logger
        this.debugLogger = debug(`${namespace}:debug`);
        // eslint-disable-next-line
        this.debugLogger.log = console.log.bind(console);
    }

    logInfo(message) {
        this.infoLogger(message);
    }

    logDebug(message) {
        this.debugLogger(message);
    }

    logError(error) {
        this.errorLogger(error);
    }
}

module.exports = (namespace) => {
    return new LogService(namespace);
}
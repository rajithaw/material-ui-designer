var debug = require('debug');
var appInsights = require("applicationinsights");

class LogService {
    constructor(namespace){
        this.namespace = namespace;

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

        this.appInsightsLogger = appInsights.defaultClient;
    }

    logInfo(message) {
        this.infoLogger(message);
        this.appInsightsLogger.trackTrace({message: `Info: ${this.namespace} : ${message}`});
    }

    logDebug(message) {
        this.debugLogger(message);
        this.appInsightsLogger.trackTrace({message: `Debug: ${this.namespace} : ${message}`});
    }

    logError(error) {
        this.errorLogger(error);

        const message = typeof(error) === 'string' ? error : error.message;
        this.appInsightsLogger.trackException({exception: new Error(`Error: ${this.namespace} : ${message}`)});
    }
}

module.exports = (namespace) => {
    return new LogService(namespace);
}
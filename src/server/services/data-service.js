const MongoClient = require('mongodb').MongoClient;
const logger = require('./log-service')('services:project-service');

class DataService {
    constructor() {
        this.muiDesignerMongoUrl = process.env.MONGO_DB_URL || 'mongodb://username:password@yourserver.com:port_number/mui-designer';
    }

    // Connect to DB
    connectToDb(callBack) {
        MongoClient.connect(
            this.muiDesignerMongoUrl,
            { useNewUrlParser: true },
            function(err, client) {
                const db = client.db('mui-designer');
                callBack(db);
                client.close();
            }
        );
    }

    // Get database client
    async getDbClient() {
        const client = new MongoClient(this.muiDesignerMongoUrl, { useNewUrlParser: true });

        try {
            await client.connect();
            return client;
        }
        catch(err) {
            logger.logError(err);
            throw err;
        }
    }
}

module.exports = new DataService();
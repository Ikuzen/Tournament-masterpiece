import { MongoClient, Db, Collection } from 'mongodb';
import * as debug from 'debug';

const log = debug('tn:dbmanager');

interface DbManagerOptions {
    mongodbUrl: string;
    dbName: string;
    collectionName: string;
}

export class DbManager {
    private client!: MongoClient;
    private db!: Db;
    private collection!: Collection;
    constructor(options: DbManagerOptions) {
        const { dbName, collectionName, mongodbUrl } = options;
        MongoClient.connect(mongodbUrl).then((client) => {
            log('MongoDB connected');
            this.client = client;
            this.db = client.db(dbName);
            this.collection = this.db.collection(collectionName);
            // this.collection.createIndex({"name": 1}, { unique: true } ) // forces unique tournament name
        });
    }

    async putDocument(obj: any) {
        log(`Inserting object: ${JSON.stringify(obj, null, 2)}`);
        const res = await this.collection.insertOne(obj);
        return res;    
    }

    async listDocuments() {
        log('Listing documents...');
        const res = await this.collection.find();
        return res.toArray();
    }

    async getDocument(_id: string) {
        log('Get document...');
        const res = await this.collection.findOne({_id});
        return res;
    }

    async deleteDocument(_id: string) {
        log('Delete document...');
        const res = await this.collection.deleteOne({_id});
        return res;
    }

    async deleteAllDocuments() {
        log('Delete all documents...');
        const res = await this.collection.deleteMany({});
        return res;
    }
    async getDocumentByName(username:string){
        log('Get document...');
        const res = await this.collection.findOne({username});
        return res;
    }
    
    async updateDocument(_id:string, obj: any) {
        log('Updating document...');
        
        try{
            const res = this.collection.updateOne(
                {"_id": _id},
                {$set: obj}
            );
            console.log('update successful')
            return res;
        }
        catch(e){
            console.log(e)
        }
    }
}


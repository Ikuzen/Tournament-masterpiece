import { MongoClient, Db, Collection } from 'mongodb';
import * as debug from 'debug';

const log = debug('tn:dbmanager');
const mongoose = require('mongoose');

interface DbManagerOptions {
    mongodbUrl: string;
    dbName: string;
    collectionName: string;
    model: any;
}

export class DbManager {
    private db!: Db;
    private collection!: Collection;
    private model: any;
    constructor(options: DbManagerOptions) {
        const { dbName, collectionName, mongodbUrl, model } = options;
        mongoose.connect(mongodbUrl)
        this.db = mongoose.connection;
        this.collection = this.db.collection(collectionName);
        this.model = model
    }

    async putDocument(obj: any) {
        log(`Inserting object: ${JSON.stringify(obj, null, 2)}`);
        const res = await this.collection.insertOne(obj);
        return res;    
    }

    async listDocuments() {
        log('Listing documents...');
        const res = await this.model.find((err, res)=>{
            return res;
        })
        return res
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


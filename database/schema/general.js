const { MongoDBNamespace } = require("mongodb");
const mongoodb = require("mongoose");
const Schema = mongoodb.Schema;
const generalSchema = new Schema({
subscribeUser:[{
    type: mongoodb.SchemaTypes.ObjectId,
    required:false
}]
});

module.exports = mongoodb.model('General',generalSchema)
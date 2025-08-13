const { ObjectId } = require('mongodb');
const {client} = require('../config/db.js');

const getCollection = (collectionName) => client.db('Dashdeals').collection(collectionName);
exports.getFlashSalesProducts = async (req, res) => {
    const collection = getCollection('flashSalesProducts');
    const result = await collection.find().toArray();
    res.send(result);
};

exports.getBestSellingProducts = async (req, res) => {
    const collection = getCollection('bestSellingProducts');
    const result = await collection.find().toArray();
    res.send(result);
};

exports.getExploreOurProducts = async (req, res) => {
    const collection = getCollection('exploreOurProducts');
    const result = await collection.find().toArray();
    res.send(result);
};

exports.getFlashSalesProductById = async (req, res) => {
    const id = req.params.id;
    const collection = getCollection('flashSalesProducts');
    const result = await collection.findOne({ _id: new ObjectId(id) });
    res.send(result);
};

exports.getSearchedProducts = async (req, res) => {
    const searchString = req.params.searchString;
    console.log(searchString, req.params);
};
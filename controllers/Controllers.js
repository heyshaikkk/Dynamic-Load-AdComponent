require('../models/database');
const animals = require('../models/animals');
const birds = require('../models/birds');
const plants = require('../models/plants');
const nature = require('../models/nature');

exports.animals = async (req, res) => {
    try {
        const limitNumber = 10;
        const animals = await animals.find({}).limit(limitNumber);
        res.render('index', { title: "Ad Load", animals });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

exports.plants = async (req, res) => {
    try {
        const limitNumber = 10;
        const plants = await plants.find({}).limit(limitNumber);
        res.render('plants', { title: "Ad Load", plants });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

exports.birds = async (req, res) => {
    try {
        const limitNumber = 10;
        const birds = await birds.find({}).limit(limitNumber);
        res.render('birds', { title: "Ad Load", birds });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

exports.nature = async (req, res) => {
    try {
        const limitNumber = 10;
        const nature = await nature.find({}).limit(limitNumber);
        res.render('nature', { title: "Ad Load", nature });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}
const Pet = require('../models/pet');

exports.getPets = async (req, res) => {
    try {
        const pets = await Pet.find();
        res.status(200).json(pets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPetByID = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);

        pet !== null
            ? res.status(200).json(pet)
            : res.status(404).json({ message: 'Pet Not Found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createPet = async (req, res) => {
    const pet = new Pet({
        name: req.body.name,
        breed: req.body.breed,
        weight: req.body.weight,
        age: req.body.age
    });

    try {
        const newPet = await Pet.create(pet);
        res.status(201).json(newPet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updatePet = async (req, res) => {
    const _id = req.params.id;
    const { name, breed, weight, age } = req.body;

    const petData = {
        _id,
        name,
        breed,
        weight,
        age
    };

    try {
        const updatedPet = await Pet.findByIdAndUpdate(_id, petData, {
            new: true
        });
        res.status(200).json(updatedPet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deletePet = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndDelete(req.params.id);

        pet !== null
            ? res.status(200).json({ message: 'Pet Deleted' })
            : res.status(404).json({ message: 'Pet Not Found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

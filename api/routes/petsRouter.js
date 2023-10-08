const express = require('express');

const {
    getPets,
    getPetByID,
    createPet,
    updatePet,
    deletePet
} = require('../controllers/petsController');

const router = express.Router();

router.get('/', getPets);
router.get('/:id', getPetByID);
router.post('/', createPet);
router.patch('/:id', updatePet);
router.delete('/:id', deletePet);

module.exports = router;

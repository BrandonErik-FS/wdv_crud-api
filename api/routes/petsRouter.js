const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport');

const {
    getPets,
    getPetByID,
    createPet,
    updatePet,
    deletePet
} = require('../controllers/petsController');

const protectedRoute = passport.authenticate('jwt', { session: false });

const router = express.Router();

router.get('/', protectedRoute, getPets);
router.get('/:id', protectedRoute, getPetByID);
router.post('/', protectedRoute, createPet);
router.patch('/:id', protectedRoute, updatePet);
router.delete('/:id', protectedRoute, deletePet);

module.exports = router;

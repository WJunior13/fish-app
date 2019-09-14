const express = require('express');
const router = express.Router();


const cadastro = require('./controladorRouter')


router.use('/', cadastro)



router.get('/*', (req, res) => res.status(404).json({ error: 'Router not found' }))
router.post('/*', (req, res) => res.status(404).json({ error: 'Router not found' }))
router.patch('/*', (req, res) => res.status(404).json({ error: 'Router not found' }))
router.delete('/*', (req, res) => res.status(404).json({ error: 'Router not found' }))

module.exports = router;
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

//We cannot use app in this file, as it would refer to a different instance of express, and 
//is not the one the server.js file is set up to listen to, router will be used instead
const router = require('express').Router();

//Used to filter multiple animals by user query
router.get('/animals', (req, res) => {
    let results = animals;
    
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

//Used to filter 1 specific animal based on ID
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
      if (result) {
        res.json(result);
      } else {
          res.send(404);
      }
  });

//Handles users POSTing new information to the database
router.post('/animals', (req, res) => {
    // req.body is where our incoming content will be
    //Set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    //If any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
        res.status(400).send(`The animal is not properly formatted.`);
    } else {
        //Add animal to json file and animals array in this function
        const animal = createNewAnimal(req.body, animals);

        res.json(animal);
    };
});

module.exports = router;
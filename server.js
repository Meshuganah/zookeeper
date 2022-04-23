const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

const { animals } = require('./data/animals');

//Handles the user query 
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray =[];
    //Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        //Save personalityTraits as a dedicated Array
        //If personalityTraits is a string, place it into a new array and save
        if(typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
            //Loop through each trait in the personalityTraits array:
        personalityTraitsArray.forEach(trait => {
            //Check the trait against each animal in the filteredResults array.
            //Remember, it is initially a copy of the animalsArray,
            //but here we're updating it for each trait in the .forEach() loop,.
            //For each trait being targeted by the filter, the filteredResults
            //array will then contain only the entries that contain the trait,
            //so at the end we'll have an array of animals that have every one
            //of the traits when the .forEach() loop is finished.
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    };

    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animals.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if(query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}

//Handles the user param by id search
function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
  }

//Used to filter multiple animals by user query
app.get('/api/animals', (req, res) => {
    let results = animals;
    
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

//Used to filter 1 specific animal based on ID
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
      if (result) {
        res.json(result);
      } else {
          res.send(404);
      }
  });

//Handles users POSTing new information to the database
app.post('./api/animals', (req, res) =>{
    // req.body is where our incoming content will be
    console.log(req.body);
    res.json(req.body);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
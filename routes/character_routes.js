import express from 'express';
import _ from 'lodash';
import httpError from 'http-errors';
import { getCharacterId, getCharacterInfo } from '../utils';
import CharactersDAO from '../daos/CharactersDAO';


const router = express.Router();

/**
 * GET /api/characters
 * Returns 2 random characters of the same gender that have not been voted yet.
 */
router.get('/', function(req, res, next) {
  let choices = ['Female', 'Male'];
  var randomGender = _.sample(choices);

  CharactersDAO
  .getRandomCharacters(2,randomGender)
  .then(characters => {
      
      if (characters.length < 2) {
          let oppositeGender = _.first(_.without(choices, randomGender));
          return CharactersDAO.getRandomCharacters(2,oppositeGender)
          
       }else{
           return res.send(characters);
       }
       
      /*
        Character.update({}, { $set: { voted: false } }, { multi: true }, function(err) {
            if (err) return next(err);
            res.send([]);
          });
      */ 
  }).catch(err => {
     return next(err);         
  })

});

/**
 * POST /api/characters
 * Adds new character to the database.
 */
router.post('/', function(req, res, next) {
  //get gender
  var gender = req.body.gender;
  //get character name
  var characterName = req.body.name;
  //making HTTP requests to the EVE Online API to get character id.
  getCharacterId(characterName)
  .then(getCharacterInfo)
  .then((info) => {
    //Save the character
    var character = new Character({
      characterId: info.characterId,
      name: characterName,
      race: info.race,
      bloodline: info.bloodline,
      gender: gender,
      random: [Math.random(), 0]
    });

    character.save(function(err) {
      if (err) return next(err);
      res.send({ message: characterName + ' has been added successfully!' });
    });
  }).catch((error => {
    return next(error);
  }))
});

/**
 * GET /api/characters/count
 * Returns the total number of characters.
 */
router.get('/count', function(req, res, next) {
    CharactersDAO.getCharacterCount().then(count => {
        res.send({ count: count });
    }).catch(err => {
        return next(err);
    })
  
});


/**
 * GET /api/characters/top
 * Return 100 highest ranked characters. Filter by gender, race and bloodline.
 */
router.get('/top', function(req, res, next) {
  var params = req.query;
  var conditions = {};

  _.each(params, function(value, key) {
    conditions[key] = new RegExp('^' + value + '$', 'i');
  });

  Character
    .find(conditions)
    .sort('-wins')
    .limit(100)
    .exec(function(err, characters) {
      if (err) return next(err);

      characters.sort(function(a, b) {
        if (a.wins / (a.wins + a.losses) < b.wins / (b.wins + b.losses)) { return 1; }
        if (a.wins / (a.wins + a.losses) > b.wins / (b.wins + b.losses)) { return -1; }
        return 0;
      });

      res.send(characters);
    });
});

export default router;




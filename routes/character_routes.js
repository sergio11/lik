import express from 'express';
import _ from 'lodash';
import { getCharacterId, getCharacterInfo } from '../utils';
import Character from '../models/character';


const router = express.Router();

/**
 * GET /api/characters
 * Returns 2 random characters of the same gender that have not been voted yet.
 */
router.get('/', function(req, res, next) {
  let choices = ['Female', 'Male'];
  var randomGender = _.sample(choices);

  Character.find({ random: { $near: [Math.random(), 0] } })
    .where('voted', false)
    .where('gender', randomGender)
    .limit(2)
    .exec(function(err, characters) {
      if (err) return next(err);

      if (characters.length === 2) {
        return res.send(characters);
      }

      var oppositeGender = _.first(_.without(choices, randomGender));

      Character
        .find({ random: { $near: [Math.random(), 0] } })
        .where('voted', false)
        .where('gender', oppositeGender)
        .limit(2)
        .exec(function(err, characters) {
          if (err) return next(err);

          if (characters.length === 2) {
            return res.send(characters);
          }

          Character.update({}, { $set: { voted: false } }, { multi: true }, function(err) {
            if (err) return next(err);
            res.send([]);
          });
        });
    });
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
  Character.count({}, function(err, count) {
    if (err) return next(err);
    res.send({ count: count });
  });
});


export default router;




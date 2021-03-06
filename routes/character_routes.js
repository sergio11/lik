import express from 'express';
import _ from 'lodash';
import httpError from 'http-errors';
import { getTwoRandomCharacters, getCharacterId, getCharacterInfo, userExistenceCheck } from '../utils';
import CharactersDAO from '../daos/CharactersDAO';


const router = express.Router();

/**
 * GET /api/characters
 * Returns 2 random characters of the same gender that have not been voted yet.
 */
router.get('/', function(req, res, next) {
  
  getTwoRandomCharacters()
  .then(characters => {
      if(!characters || !characters.length){
          return CharactersDAO.resetRound().then(() => {
              return getTwoRandomCharacters();
          })
      }else{
          return characters;
      }
  })
  .then(characters => {
      res.send(characters);
  }).catch(err => {
     return next(err);         
  })

});

/**
 * GET /api/characters/search
 * Looks up a character by name. (case-insensitive)
 */
router.get('/search', function(req, res, next) {
  var characterName = new RegExp(req.query.name, 'i');
  CharactersDAO
  .getCharacterByName(characterName)
  .then(character => {
      if (!character) {
          throw httpError(404,'Character not found.');
       }
       res.send(character);
  })
  .catch(err => {
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
  .then(userExistenceCheck)
  .then(getCharacterInfo)
  .then((info) => {
    //Save the character
    CharactersDAO.save({
        characterId: info.characterId,
        name: characterName,
        race: info.race,
        bloodline: info.bloodline,
        gender: gender,
        random: [Math.random(), 0]
    }).then(() => {
        res.send({ message: characterName + ' has been added successfully!' });
    }).catch(err => {
        next(err);
    });
    
  }).catch((error => {
    return next(error);
  }))
});


/**
 * PUT /api/characters
 * Update winning and losing count for both characters.
 */

router.put('/', function(req, res, next) {
  let winner = req.body.winner;
  let loser = req.body.loser;

  if (!winner || !loser) {
      throw httpError(400,'Voting requires two characters.');
  }else if(winner === loser){
      throw httpError(400,'Cannot vote for and against the same character.');
  }else{
      Promise.all([
          CharactersDAO.getCharacterById(winner),
          CharactersDAO.getCharacterById(loser),
      ]).then(results => {
          let winner = results[0], loser = results[1];
          if (!winner || !loser) {
              throw httpError(400,'One of the characters no longer exists.');
          }
          
          if (winner.voted || loser.voted) {
                Promise.resolve();
          }
          
          return Promise.all([
              (function(){
                  console.log(winner.wins);
                  winner.wins++;
                  console.log("Next : " + winner.wins);
                  winner.voted = true;
                  winner.random = [Math.random(), 0];
                  return winner.saveAsync();
              })(),
              (function(){
                  loser.losses++;
                  loser.voted = true;
                  loser.random = [Math.random(), 0];
                  return loser.saveAsync();
              })()
          ])
          
          
      })
      .then(results => {
           res.status(200).end();
       })
      .catch(err => {
          next(err);
      });
  }

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
 * GET /api/characters/shame
 * Returns 100 lowest ranked characters.
 */
router.get('/shame/:start?/:count?', function(req, res, next) {
    
    let limit = {start: req.params.start || 0, count: req.params.count || 10};
    
    CharactersDAO
    .getShameCharacters(limit)
    .then(characters => {
        res.send({characters: characters, total: 100});
    })
    .catch(err => {
        next(err);
    });
});

/**
 * GET /api/characters/:id
 * Returns detailed character information.
 */
router.get('/:id', function(req, res, next) {
  let id = req.params.id;
  CharactersDAO
  .getCharacterById(id)
  .then(character => {
      if (!character) {
          throw httpError(404,'Character not found.');
      }
      res.send(character);
  })
  .catch(err => {
      next(err);
  });

});



/**
 * GET /api/characters/top/:start/:count
 * Return :count highest ranked characters from :start position. Filter by gender, race and bloodline.
 */
router.get('/top/:start?/:count?', function(req, res, next) {
    
    let conditions = {}, limit = {start: parseInt(req.params.start) || 0, count: parseInt(req.params.count) || 10};

   _.each(req.query, function(value, key) {
        conditions[key] = new RegExp('^' + value + '$', 'i');
   });
   
   Promise.all([
       CharactersDAO.getTopCharacters(conditions,limit),
       CharactersDAO.getCharacterCount(conditions)
   ])
   .then(results => {
       
       let result = {};
       result.total = results[1];
       result.characters = results[0].sort((a, b) => {
            if (a.wins / (a.wins + a.losses) < b.wins / (b.wins + b.losses)) { return 1; }
            if (a.wins / (a.wins + a.losses) > b.wins / (b.wins + b.losses)) { return -1; }
            return 0;
        });
        
        res.send(result);
    })
    .catch(err => {
        next(err);
    })
});



export default router;




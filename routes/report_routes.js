import express from 'express';
import _ from 'lodash';
import httpError from 'http-errors';
import { getCharacterId, getCharacterInfo } from '../utils';
import CharactersDAO from '../daos/CharactersDAO';


const router = express.Router();

/**
 * POST /api/report
 * Reports a character. Character is removed after 4 reports.
 */
router.post('/', function(req, res, next) {
    let characterId = req.body.characterId;
    
    CharactersDAO
    .getCharacterById(characterId)
    .then(character => {
        if (!character) {
            throw httpError(404,'Character not found.');
        }
        character.reports++;
        if (character.reports > 4) {
            character.remove();
            return res.send({ message: character.name + ' has been deleted.' });
        }
        
       character.saveAsync().then(() => {
            res.send({ message: character.name + ' has been reported.' });
        });

    })
    
    .catch(err => {
        next(err);
    });
  
});

export default router;
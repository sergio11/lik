import express from 'express';
import _ from 'lodash';
import httpError from 'http-errors';
import CharactersDAO from '../daos/CharactersDAO';
import {getRaceLeader, getBloodlineLeader} from '../utils';


const router = express.Router();

/**
 * GET /api/stats
 * Returns characters statistics.
 */
router.get('/', (req, res, next) => {
    
    Promise.all([
        CharactersDAO.getCharacterCount(),
        CharactersDAO.getCharacterCount({ race: 'Amarr' }),
        CharactersDAO.getCharacterCount({ race: 'Caldari' }),
        CharactersDAO.getCharacterCount({ race: 'Gallente' }),
        CharactersDAO.getCharacterCount({ race: 'Minmatar' }),
        CharactersDAO.getCharacterCount({ gender: 'Male' }),
        CharactersDAO.getCharacterCount({ gender: 'Female' }),
        getRaceLeader(),
        getBloodlineLeader()
    ])
    .then(results => {
        
        res.send({
            totalCount: results[0],
            amarrCount: results[1],
            caldariCount: results[2],
            gallenteCount: results[3],
            minmatarCount: results[4],
            maleCount: results[5],
            femaleCount: results[6],
            leadingRace: results[7],
            leadingBloodline: results[8]
            //totalVotes: results[7],
           
            
        });

    })
    .catch(err => {
        next(err);
    });
    
});

export default router;
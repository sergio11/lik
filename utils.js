import request from 'request-promise';
import bluebird from 'bluebird';
import xml2js from 'xml2js';
import httpError from 'http-errors';
import Character from './models/character';
import CharactersDAO from './daos/CharactersDAO';
import _ from 'lodash';

let xml2jsfy = bluebird.promisifyAll(xml2js);

export const userExistenceCheck = function(id){
    return CharactersDAO.getCharacterById(id).then(character => {
        if(character)
            throw httpError(409,  character.name + ' is already in the database.');
        else
            return id;
    });
}

export const getRaceLeader = function(){
    
    return CharactersDAO
    .getTop100Races()
    .then(characters => {
        let raceCount =  _.countBy(characters, (character) => { return character.race; });
        let max = _.max(_.values(raceCount));
        let inverted = _.invert(raceCount);
        let topRace = inverted[max];
        let topCount = raceCount[topRace];
        return { race: topRace, count: topCount };
    })
}

//return res.status(400).send({ message: 'XML Parse Error' });
//return res.status(409).send({ message: character.name + ' is already in the database.' });
//res.status(404).send({ message: characterName + ' is not a registered citizen of New Eden.' });
export const getCharacterId = function(characterName){
  let characterIdLookupUrl = 'https://api.eveonline.com/eve/CharacterID.xml.aspx';
  return request({
    uri:characterIdLookupUrl,
    qs: {
        names: characterName
    },
    transform: xml  => xml2jsfy.parseStringAsync(xml)
  })
  .then(res =>  {
    let id = res.eveapi.result[0].rowset[0].row[0].$.characterID;
    if(!parseInt(id))
      throw httpError(404, 'Character Not Found');
    return id;
  });

};

export const getCharacterInfo = function(id){
    var characterInfoUrl = 'https://api.eveonline.com/eve/CharacterInfo.xml.aspx';
    return request({
      uri:characterInfoUrl,
      qs: {
          characterID: id
      },
      transform: xml  => xml2jsfy.parseStringAsync(xml)
    })
    .then(res =>  {
      return {
        characterId: id,
        name: res.eveapi.result[0].characterName[0],
        race: res.eveapi.result[0].race[0],
        bloodline: res.eveapi.result[0].bloodline[0]
      }
    });
}


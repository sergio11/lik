import request from 'request-promise';
import bluebird from 'bluebird';
import xml2js from 'xml2js';
import httpError from 'http-errors';
import Character from './models/character';

let xml2jsfy = bluebird.promisifyAll(xml2js);

function userExistenceCheck(id){
    return Character.findOneAsync({ characterId: id }).then(character => {
      return character ? true : false;
    });
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
        name: res.eveapi.result[0].characterName[0],
        race: res.eveapi.result[0].race[0],
        bloodline: res.eveapi.result[0].bloodline[0]
      }
    });
}


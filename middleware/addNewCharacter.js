import request from 'request-promise';
import bluebird from 'bluebird';
import xml2js from 'xml2js';
import Character from '../models/character';

let xml2jsfy = bluebird.promisifyAll(xml2js);
let Characterfy = bluebird.promisifyAll(Character,{suffix: "Async"});


function userExistenceCheck(id){
    return Characterfy.findOneAsync({ characterId: id }).then(character => {
      return character ? true : false;
    });
}

//return res.status(400).send({ message: 'XML Parse Error' });
//return res.status(409).send({ message: character.name + ' is already in the database.' });
//res.status(404).send({ message: characterName + ' is not a registered citizen of New Eden.' });
function getCharacterId(characterName){
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
      throw new Error("Character Not Found");
    return id;
  });

}

function getCharacterInfo(id){
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



export default function(req, res, next) {
  //get gender
  var gender = req.body.gender;
  //get character name
  var characterName = req.body.name;
  //making HTTP requests to the EVE Online API to get character id.
  getCharacterId(characterName)
  .then(getCharacterInfo)
  .then((info) => {
    console.log("Save the character with info");
    console.log(info);
    res.send({ message: characterName + ' has been added successfully!' });
    //Save the character
    /*var character = new Character({
      characterId: characterId,
      name: name,
      race: race,
      bloodline: bloodline,
      gender: gender,
      random: [Math.random(), 0]
    });

    character.save(function(err) {
      if (err) return next(err);
      res.send({ message: characterName + ' has been added successfully!' });
    });*/
  }).catch((error => {
    return next(error);
  }))

};

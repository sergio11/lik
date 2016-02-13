import request from 'superagent';

class API {

  _getJSON(endpoint,params){
     return new Promise((resolve,reject) => {
        request.get(endpoint).set('Accept', 'application/json').end((err, res) => {
          !err ? resolve(res) : reject(err);
        });
     });
  }

  getCharacterCount(){
    return this._getJSON('/api/characters/count');
  }

  getTopCharacters(){
    return this._getJSON('/api/characters/top');
  }

  findCharacter(params){
    return this._getJSON('/api/characters/search',params);
  }
}
export default new API();

import request from 'superagent';

class API {

  _sendRequest(type,endpoint,params){
     return new Promise((resolve,reject) => {
       ( type == 'post' ? request.post(endpoint) : request.get(endpoint))
       .send(params)
       .set('Accept', 'application/json')
       .end((err, res) => {
          !err ? resolve(res) : reject(err);
        });
     });
  }

  getCharacterCount(){
    return this._sendRequest('/api/characters/count');
  }

  getTopCharacters(){
    return this._sendRequest('/api/characters/top');
  }

  findCharacter(params){
    return this._sendRequest('/api/characters/search',params);
  }

  addCharacter(params){
    return this._sendRequest('post','/api/characters',params);
  }
}
export default new API();

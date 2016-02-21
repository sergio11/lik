import request from 'request-promise';

class API {

  _sendRequest(type,endpoint,params){

    let options = {};
    options.method = type || 'GET';
    options.uri = 'http://localhost:3000'+endpoint;
    if(type == 'GET'){
      options.qs = params;
    }else{
      options.body = params
    }
    options.json = true

    return request(options)
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

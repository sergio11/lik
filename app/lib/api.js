import request from 'request-promise';

class API {

  _sendRequest(type,endpoint,params){

    let options = {};
    options.method = type ;
    options.uri = 'http://localhost:3000'+endpoint;
    console.log(options.uri);
    if(type == 'GET'){
      options.qs = params;
    }else{
      options.body = params
    }
    options.json = true

    return request(options)
  }

  getCharacterCount(){
    return this._sendRequest('GET','/api/characters/count');
  }

  getTopCharacters(count){
    return this._sendRequest('GET','/api/characters/top/'+count);
  }

  findCharacter(params){
    return this._sendRequest('GET','/api/characters/search',params);
  }

  addCharacter(params){
    return this._sendRequest('POST','/api/characters',params);
  }
  
  getTwoCharacters(){
      return this._sendRequest('GET','/api/characters'); 
  }
  
  vote(params){
      return this._sendRequest('PUT','/api/characters',params);
  }
  
  
}
export default new API();

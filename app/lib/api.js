import request from 'superagent';

const API = {

  getJSON: (endpoint,params) => {
     return new Promise((resolve,reject) => {
        request.get(endpoint).set('Accept', 'application/json').end((err, res) => {
          !err ? resolve(res) : reject(err);
        });
     });
  },
  getCharacterCount: () => {
    return this.getJSON('/api/characters/count');
  },
  getTopCharacters: () => {
    return this.getJSON('/api/characters/top');
  },
  findCharacter: (params) => {
    return this.getJSON('/api/characters/search',params);
  }

}

import alt from '../alt';
import api from '../lib/api';
import AppActions from '../actions/AppActions';

class CharacterListActions {
    
    constructor() {
        this.generateActions(
        'getCharactersSuccess',
        'getCharactersFail'
        );
    }

    getCharacters(payload,limit) {
      
        limit = limit || {start:0, count: 10}
        let params = {
            race: payload.race,
            bloodline: payload.bloodline
        };

        if (payload.category === 'female') {
            params.gender = 'female';
        } else if (payload.category === 'male') {
            params.gender = 'male';
        }
        
        let promise = null;
        if (payload.category === 'shame') {
            promise = api.getShameCharacters(limit);
        }else{
            promise = api.getTopCharacters(limit,params);
        }
        
        promise.then(data => {
            this.actions.getCharactersSuccess(data);
        })
        .catch(err => {
            this.actions.getCharactersFail(err);
        });
    }
    
    
    updateCurrentPage(page){
        return page;
    }
}

export default alt.createActions(CharacterListActions);
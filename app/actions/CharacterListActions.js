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

    getCharacters(payload) {
        
        console.log("Payload");
        console.log(payload);
 
        let params = {
            race: payload.race,
            bloodline: payload.bloodline
        };

        if (payload.category === 'female') {
            params.gender = 'female';
        } else if (payload.category === 'male') {
            params.gender = 'male';
        }
        
        api
        .getTopCharacters(100,params)
        .then(data => {
            this.actions.getCharactersSuccess(data);
        })
        .catch(err => {
            this.actions.getCharactersFail(err);
        });
    }
}

export default alt.createActions(CharacterListActions);
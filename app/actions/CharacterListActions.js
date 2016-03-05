import alt from '../alt';
import api from '../lib/api';
import AppActions from '../actions/AppActions';

class CharacterListActions {
    
    constructor() {
        this.generateActions(
        'getCharactersSuccess',
        'getCharactersFail',
        'getCharacterCountSuccess',
        'getCharacterCountFail'
        );
    }

    getCharacters(payload,limit) {
        
        console.log("Payload");
        console.log(payload);
        console.log("Limit");
        console.log(limit);
 
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
        .getTopCharacters(limit,params)
        .then(data => {
            this.actions.getCharactersSuccess(data);
        })
        .catch(err => {
            this.actions.getCharactersFail(err);
        });
    }
    
    getCharacterCount() {
        api.getCharacterCount().then((data) => {
        this.actions.getCharacterCountSuccess(data);
        }).catch((err) => {
        this.actions.getCharacterCountFail(err)
        });
    }
}

export default alt.createActions(CharacterListActions);
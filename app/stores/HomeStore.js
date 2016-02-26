import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
    
    constructor() {
        /*bindActions is a magic Alt method which binds actions to their handlers defined in the store.*/
        this.bindActions(HomeActions);
        this.state = {
            characters: []
        };
    }
    
    onGetTwoCharactersSuccess(data) {
        this.state.characters = data;
    }

    onGetTwoCharactersFail(err) {}

    onVoteFail(err) {}
    
    getState(){
        return this.state ;
    }
}

export default alt.createStore(HomeStore);
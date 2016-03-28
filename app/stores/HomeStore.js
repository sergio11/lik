import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
    
    constructor() {
        /*bindActions is a magic Alt method which binds actions to their handlers defined in the store.*/
        this.bindActions(HomeActions);
        this.state = {
            characters: [],
            loaded: false
        };
    }
    
    onCharactersLoaded(){
        this.state.loaded = true;
    }
    
    onCharactersLoading(){
        this.state.loaded = false;
    }

    onGetTwoCharactersSuccess(data) {
        this.state.characters = data;
    }
    
    onEmptyCharacters(){
        this.state.characters = [];
    }

    onGetTwoCharactersFail(err) {}
    
    

    onVoteFail(err) {}
    
    getState(){
        return this.state;
    }
}

export default alt.createStore(HomeStore);
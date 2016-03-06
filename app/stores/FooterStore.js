import alt from '../alt';
import FooterActions from '../actions/FooterActions';

class FooterStore {
  constructor() {
    /*bindActions is a magic Alt method which binds actions to their handlers defined in the store.*/
    this.bindActions(FooterActions);
    this.state = {
      characters: []
    };
  }

  onGetTopCharactersSuccess(data) {
    this.state.characters = data.characters;
  }

  onGetTopCharactersFail(err) {
    console.log("Error");
    console.log(err);
  }

  getState(){
    return this.state;
  }
}

export default alt.createStore(FooterStore);

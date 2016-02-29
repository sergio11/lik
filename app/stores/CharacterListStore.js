import alt from '../alt';
import CharacterListActions from '../actions/CharacterListActions';

class CharacterListStore {
  constructor() {
    this.bindActions(CharacterListActions);
    this.state = {
        characters: []
    }
  }

  onGetCharactersSuccess(data) {
      this.state.characters = data;
  }

  onGetCharactersFail() {
    
  }
}

export default alt.createStore(CharacterListStore);
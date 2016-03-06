import alt from '../alt';
import CharacterListActions from '../actions/CharacterListActions';
import _ from 'lodash';

class CharacterListStore {
  constructor() {
    this.bindActions(CharacterListActions);
    this.state = {
        characters: [],
        total: 0,
        chaPerPage: 10,
        currentPage: 0
    }
  }

  onGetCharactersSuccess(data) {
      _.assign(this.state,data);
  }

  onGetCharactersFail() {}

  
  onUpdateCurrentPage(page){
      this.state.currentPage = page;
  } 
}

export default alt.createStore(CharacterListStore);
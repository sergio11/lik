import alt from '../alt';
import CharacterListActions from '../actions/CharacterListActions';

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
      this.state.characters = data;
  }

  onGetCharactersFail() {}
  
  onGetCharacterCountSuccess(data) {
    this.state.total = data.count;
  }

  onGetCharacterCountFail(err) {}
  
  onUpdateCurrentPage(page){
      this.state.currentPage = page;
  } 
}

export default alt.createStore(CharacterListStore);
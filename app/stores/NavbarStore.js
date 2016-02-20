import alt from '../alt';
import NavbarActions from '../actions/NavbarActions';

class NavbarStore {
  constructor() {
    this.bindActions(NavbarActions);
    this.state = {
      totalCharacters: 0,
      onlineUsers: 0,
      searchQuery: ''
    }
  }

  onFindCharacterSuccess(payload) {
    payload.history.pushState(null, '/characters/' + payload.characterId);
  }

  onFindCharacterFail(payload) {}

  onUpdateOnlineUsers(data) {
    this.state.onlineUsers = data.onlineUsers;
  }

  onUpdateSearchQuery(event) {
    this.searchQuery = event.target.value;
  }

  onGetCharacterCountSuccess(data) {
    this.totalCharacters = data.count;
  }

  onGetCharacterCountFail(err) {}


  getState(){
    return this.state;
  }
}

export default alt.createStore(NavbarStore);

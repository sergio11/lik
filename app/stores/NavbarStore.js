import alt from '../alt';
import NavbarActions from '../actions/NavbarActions';
import {browserHistory} from 'react-router';

class NavbarStore {
  constructor() {
    this.bindActions(NavbarActions);
    this.state = {
      totalCharacters: 0,
      onlineUsers: 0,
      search:{
          state: 'pristine',
          value: ''
      },
      options: [],
    }
  }

  onFindCharacterSuccess(data) {
       this.state.search.state = 'success';
       browserHistory.push(`/characters/${data.characterId}`);
  }

  onFindCharacterFail(err) {
      this.state.search.state = 'fail';
  }

  onUpdateOnlineUsers(data) {
    this.state.onlineUsers = data.onlineUsers;
  }

  onUpdateSearchQuery(value) {
    this.state.search.value = value;
    this.state.search.state = 'dirty';
  }

  onGetCharacterCountSuccess(data) {
    this.state.totalCharacters = data.count;
  }

  onGetCharacterCountFail(err) {}


  getState(){
    return this.state;
  }
}

export default alt.createStore(NavbarStore);

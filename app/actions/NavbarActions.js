import alt from '../alt';
import api from '../lib/api';
import _ from 'lodash';

class NavbarActions {
  constructor() {
    this.generateActions(
      'updateOnlineUsers',
      'updateAjaxAnimation',
      'updateSearchQuery',
      'getCharacterCountSuccess',
      'getCharacterCountFail',
      'findCharacterSuccess',
      'findCharacterFail'
    );
  }

  findCharacter(searchQuery) {
    api.findCharacter({name:searchQuery})
    .then((data) => {
      this.actions.findCharacterSuccess.defer(data);
    }).catch((err) => {
      this.actions.findCharacterFail(err);
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

export default alt.createActions(NavbarActions);

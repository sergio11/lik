import alt from '../alt';
import api from '../lib/api';
import {assign} from 'underscore';

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

  findCharacter(payload) {
    api.findCharacter({
      name: payload.searchQuery
    }).then((data) => {
      assign(payload, data);
      this.actions.findCharacterSuccess(payload);
    }).catch((err) => {
      this.actions.findCharacterFail(payload);
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

import alt from '../alt';
import api from '../lib/api';
import AppActions from '../actions/AppActions';

class FooterActions {

  constructor() {
    this.generateActions(
      'getTopCharactersSuccess',
      'getTopCharactersFail'
    );
  }
  //Get Top characters
  getTopCharacters() {
    api.getTopCharacters(5).then((data) => {
      this.actions.getTopCharactersSuccess(data)
    }).catch((err) => {
      this.actions.getTopCharactersFail(err);
      //lanzamos notificación de error.
      AppActions.throwNotification.defer({
        id: 1,
        title: 'Title',
        message: 'Message',
        type: 'error'
      });
    });
  }
}

export default alt.createActions(FooterActions);

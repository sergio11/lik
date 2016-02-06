import alt from '../alt';
import api from '../lib/api';

class FooterActions {

  constructor() {
    this.generateActions(
      'getTopCharactersSuccess',
      'getTopCharactersFail'
    );
  }
  //Get Top characters
  getTopCharacters() {
    api.getTopCharacters().then((data) => {
      this.actions.getTopCharactersSuccess(data)
    }).catch((err) => {
      this.actions.getTopCharactersFail(err)
    })
  }
}

export default alt.createActions(FooterActions);

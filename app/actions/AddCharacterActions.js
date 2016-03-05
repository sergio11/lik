import alt from '../alt';
import api from '../lib/api';
import AppActions from '../actions/AppActions';

class AddCharacterActions {
  constructor() {
    this.generateActions(
      'addCharacterSuccess',
      'addCharacterFail',
      'updateName',
      'updateGender',
      'invalidName',
      'validName'
    );
  }

  addCharacter(name, gender) {
    api.addCharacter({
      name: name,
      gender: gender
    }).then((response) => {
        this.actions.addCharacterSuccess();
        //lanzamos notificación de error.
        AppActions.throwNotification.defer({
          title: 'Add Character',
          message: response.message ,
          type: 'success'
        });
    }).catch((err) => {
      this.actions.addCharacterFail();
      //lanzamos notificación de error.
      AppActions.throwNotification.defer({
        title: 'Error al crear personaje',
        message: err.error.message,
        type: 'error'
      });
    });

  }
}

export default alt.createActions(AddCharacterActions);

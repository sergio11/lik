import alt from '../alt';
import api from '../lib/api';
import AppActions from '../actions/AppActions';

class HomeActions {
  constructor() {
    this.generateActions(
      'getTwoCharactersSuccess',
      'getTwoCharactersFail',
      'voteFail'
    );
  }
  
  getTwoCharacters() {
      api.getTwoCharacters()
      .then((data) => {
        this.actions.getTwoCharactersSuccess(data);
      })
      .catch((err) => {
        this.actions.getTwoCharactersFail(err);
         //lanzamos notificación de error.
        AppActions.throwNotification.defer({
            id: 2,
            title: 'Error al obtener personajes',
            message: err,
            type: 'error'
        });
      });
  }

  vote(winner, loser) {
      api.vote({ winner: winner, loser: loser })
      .then((data) => {
          this.actions.getTwoCharacters();
      })
      .catch((err) => {
          this.actions.voteFail(err);
          //lanzamos notificación de error.
          AppActions.throwNotification.defer({
                id: 3,
                title: 'Error al realizar voto',
                message: err,
                type: 'error'
            });
      });
  }
  
}

export default alt.createActions(HomeActions);
import alt from '../alt';
import api from '../lib/api';
import AppActions from '../actions/AppActions';

class CharacterActions {
    
    constructor() {
        this.generateActions(
        'reportSuccess',
        'reportFail',
        'getCharacterSuccess',
        'getCharacterFail'
        );
    }

    getCharacter(characterId) {
        api
        .getCharacter(characterId)
        .then(character => {
            this.actions.getCharacterSuccess(character);
        })
        .catch(err => {
            this.actions.getCharacterFail(err);
            //lanzamos notificación de error.
            AppActions.throwNotification.defer({
                id: 2,
                title: 'Error al obtener personaje',
                message: 'Error al obtener el personaje',
                type: 'error'
            });
        });
    }

    report(characterId) {
        
        api
        .report({characterId: characterId})
        .then(() => {
            this.actions.reportSuccess();
            //lanzamos notificación de error.
            AppActions.throwNotification.defer({
                id: 3,
                title: 'Personaje Reportado',
                message: 'Personaje Reportado con éxito',
                type: 'success'
            });
        })
        .catch(err => {
            this.actions.reportFail(err);
            //lanzamos notificación de error.
            AppActions.throwNotification.defer({
                id: 4,
                title: 'Error al reportar personaje',
                message: 'Error al reportar el personaje',
                type: 'error'
            });
        })
        
    }
}

export default alt.createActions(CharacterActions);
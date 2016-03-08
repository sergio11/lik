import alt from '../alt';
import api from '../lib/api';
import AppActions from '../actions/AppActions';

class StatsActions {
    constructor() {
        this.generateActions(
            'getStatsSuccess',
            'getStatsFail'
        );
    }

    getStats() {
        
        api
        .getStats()
        .then(data => {
            console.log("Stats Data");
            console.log(data);
            this.actions.getStatsSuccess(data);
        })
        .catch(err => {
             this.actions.getStatsFail(err);
             //lanzamos notificación de error.
            AppActions.throwNotification.defer({
                id: 6,
                title: 'Error al obtener estadísticas',
                message: err.error.message,
                type: 'error'
            });
        });
    }
}

export default alt.createActions(StatsActions);
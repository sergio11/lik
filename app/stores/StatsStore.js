import alt from '../alt';
import StatsActions from '../actions/StatsActions';
import _ from 'lodash';

class StatsStore {
    
    constructor() {
        this.bindActions(StatsActions);
        this.state = {
            leadingRace: { race: 'Unknown', count: 0 },
            leadingBloodline: { bloodline: 'Unknown', count: 0 },
            amarrCount: 0,
            caldariCount: 0,
            gallenteCount: 0,
            minmatarCount: 0,
            totalVotes: 0,
            femaleCount: 0,
            maleCount: 0,
            totalCount: 0
        }
    }

    onGetStatsSuccess(data) {
        _.assign(this.state, data);
    }

    onGetStatsFail(err) {}
}

export default alt.createStore(StatsStore);
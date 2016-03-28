import _ from 'lodash';
import alt from '../alt';
import CharacterActions from '../actions/CharacterActions';

class CharacterStore {
    
    constructor() {
        this.bindActions(CharacterActions);
        this.state = {
            characterId: 0,
            name: 'TBD',
            race: 'TBD',
            bloodline: 'TBD',
            gender: 'TBD',
            wins: 0,
            losses: 0,
            winLossRatio: 0,
            isReported: false,
            loaded: false
        }
        
    }
    
    onCharacterLoading(){
        this.state.loaded = false;
    }
    
    onCharacterLoaded(){
        this.state.loaded = true;
    }

    onGetCharacterSuccess(data) {
        _.assign(this.state, data);
        /*$(document.body).attr('class', 'profile ' + this.race.toLowerCase());
        let localData = localStorage.getItem('lik') ? JSON.parse(localStorage.getItem('lik')) : {};
        let reports = localData.reports || [];
        this.isReported = contains(reports, this.characterId);*/
        // If is NaN (from division by zero) then set it to "0"
        this.state.isReported = false;
        this.state.winLossRatio = ((this.state.wins / (this.state.wins + this.state.losses) * 100) || 0).toFixed(1);
    }

    onGetCharacterFail(err) {
    }

    onReportSuccess() {
        /*this.isReported = true;
        let localData = localStorage.getItem('NEF') ? JSON.parse(localStorage.getItem('NEF')) : {};
        localData.reports = localData.reports || [];
        localData.reports.push(this.characterId);
        localStorage.setItem('NEF', JSON.stringify(localData));
        toastr.warning('Character has been reported.');*/
    }

    onReportFail() {
    }
}

export default alt.createStore(CharacterStore);
import alt from '../alt';
import AppActions from '../actions/AppActions';
import Immutable from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';

class AppStore {
  
  constructor() {
    /*bindActions is a magic Alt method which binds actions to their handlers defined in the store.*/
    this.bindActions(AppActions);
    this.state = Immutable.Map({
        notifications: Immutable.List()
    });
  }

  onDropNotification(notification){
      this.state.notifications = this.state.get('notifications').filter(n => n.id !== notification.id);
  }

  onThrowNotification(notification){
      this.state = this.state.updateIn(['notifications'], arr => arr.push(notification));
  }

}

export default alt.createStore(immutable(AppStore));

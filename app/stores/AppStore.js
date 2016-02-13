import alt from '../alt';
import AppActions from '../actions/AppActions';

class AppStore {
  constructor() {
    /*bindActions is a magic Alt method which binds actions to their handlers defined in the store.*/
    this.bindActions(AppActions);
    this.state = {
      notifications: []
    };
  }

  onDropNotification(notification){
    this.state.notifications = this.state.notifications.filter(n => n.id !== notification.id);
  }

  onThrowNotification(notification){
    this.state.notifications.push(notification);
  }

  getState(){
    return this.state;
  }
}

export default alt.createStore(AppStore);

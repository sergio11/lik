import alt from '../alt';

class AppActions {
  constructor() {
    this.generateActions(
      'dropNotification',
      'throwNotification'
    );
  }
  
  

}

export default alt.createActions(AppActions);

import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import AppStore from '../../stores/AppStore';
import AppActions from '../../actions/AppActions';
import connectToStores from 'alt-utils/lib/connectToStores';
import Template from './App.rt.js';

class App extends React.Component {

  static getStores() {
      return [AppStore];
  }

  static getPropsFromStores() {
      return AppStore.getState();
  }

  constructor(props){
    super(props);
  }

  handleRequestHide(notification){
    AppActions.dropNotification(notification);
  };

  render() {
      return Template.apply(this,[]);
  }
}


export default connectToStores(App);

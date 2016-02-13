import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Notifications from 'react-notifications';
import AppStore from '../stores/AppStore';
import AppActions from '../actions/AppActions';
import connectToStores from '../hoc/connectToStores';

class App extends React.Component {

  static getStores() {
      return [AppStore];
  }

  static getState() {
      return AppStore.getState();
  }

  constructor(props){
    super(props);
  }

  handleRequestHide(notification){
    console.log("Notificación a ocultar");
    console.log(notification);
    AppActions.dropNotification(notification);
  };

  render() {
    return (
      <div>
        <Navbar />
        <Notifications notifications={this.props.notifications} onRequestHide={this.handleRequestHide.bind(this)}/>
        {this.props.children}
        <Footer />
      </div>
    );
  }
}


export default connectToStores(App);

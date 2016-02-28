import React from 'react';
import BackgroundVideo from 'react-background-video';
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
    AppActions.dropNotification(notification);
  };

  render() {
      
      const videos = [{
          src: 'videos/video_1.mp4',
          type: 'video/mp4'
      },{
          src: 'videos/video_1.ogg',
          type: 'video/ogg'
      }];
      
      return (
        <BackgroundVideo videos={videos} autoPlay loop poster='img/fondo.jpg' muted overlay>
            <Navbar />
            <Notifications notifications={this.props.notifications} onRequestHide={this.handleRequestHide.bind(this)}/>
            {this.props.children}
            <Footer />
        </BackgroundVideo>
    );
  }
}


export default connectToStores(App);

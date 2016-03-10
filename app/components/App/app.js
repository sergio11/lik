import React from 'react';
import BackgroundVideo from 'react-background-video';
import { Scrollbars } from 'react-custom-scrollbars';
import Navbar from './Navbar';
import Footer from './Footer';
import Notifications from 'react-notifications';
import AppStore from '../stores/AppStore';
import AppActions from '../actions/AppActions';
import connectToStores from 'alt-utils/lib/connectToStores';

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
      
      const videos = [{
          src: 'http://localhost:3000/videos/video_1.mp4',
          type: 'video/mp4'
      },{
          src: 'http://localhost:3000/videos/video_1.ogg',
          type: 'video/ogg'
      }];
      
      return (
          <BackgroundVideo videos={videos} autoPlay loop poster='http://localhost:3000/img/fondo.jpg' muted overlay>
              <Navbar />
              <Notifications notifications={this.props.notifications} onRequestHide={this.handleRequestHide.bind(this)}/>
              <main className='main'>
                 {this.props.children}
               </main>
               <Footer />
          </BackgroundVideo>
    );
  }
}


export default connectToStores(App);

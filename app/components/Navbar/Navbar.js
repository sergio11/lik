import React from 'react';
import NavbarStore from '../../stores/NavbarStore';
import NavbarActions from '../../actions/NavbarActions';
import connectToStores from 'alt-utils/lib/connectToStores';
import socket from 'socket.io-client';
import Template from './Navbar.rt.js';

class Navbar extends React.Component {

  static getStores() {
      return [NavbarStore];
  }

  static getPropsFromStores() {
      return NavbarStore.getState();
  }

  constructor(props,context) {
    super(props,context);
    this.i18n = context.i18n;
  }
 

  componentDidMount() {
    let client = socket('http://localhost:3000');
    client.on('connect', () => {
      console.log("Estoy conectado vamos!!!!");
    });

    client.on('onlineUsers', (data) => {
      console.log("Nuevo usuario conectado ...");
      console.log(data);
      NavbarActions.updateOnlineUsers(data);
    });
    
    NavbarActions.getCharacterCount();

  }
  
  onKeyDown(event){
      NavbarActions.updateSearchQuery(event.target.value);
  }
  
  handleSubmit(event) {
    event.preventDefault();
    
    let searchQuery = this.props.search.value.trim();
    console.log(searchQuery);
    searchQuery && NavbarActions.findCharacter(searchQuery);

  }
  
  render() {
    return Template.apply(this,[]);
  }
}

Navbar.contextTypes = {
    i18n: React.PropTypes.object
};

export default connectToStores(Navbar);

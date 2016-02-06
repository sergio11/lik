import React from 'react';
import {Link} from 'react-router';
import NavbarStore from '../stores/NavbarStore';
import NavbarActions from '../actions/NavbarActions';
import connectToStores from '../hoc/connectToStores';

@connectToStores
class Navbar extends React.Component {

  static getStores() {
      return [NavbarStore];
  }

  static getState() {
      return NavbarStore.getState();
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    NavbarActions.getCharacterCount();
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return(
      <div></div>
    );
  }
}

export default Navbar;

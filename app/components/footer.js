import React from 'react';
import {Link} from 'react-router';
import FooterStore from '../stores/FooterStore'
import FooterActions from '../actions/FooterActions';
import connectToStores from '../hoc/connectToStores';

@connectToStores
class Footer extends React.Component {

  static getStores() {
      return [FooterStore];
  }

  static getState() {
      return FooterStore.getState();
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    FooterActions.getTopCharacters();
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default Footer;

import React from 'react';
import FooterStore from '../../stores/FooterStore'
import FooterActions from '../../actions/FooterActions';
import connectToStores from 'alt-utils/lib/connectToStores';
import Template from './Footer.rt.js';


class Footer extends React.Component {

  static getStores() {
      return [FooterStore];
  }

  static getPropsFromStores() {
      return FooterStore.getState();
  }

  constructor(props,context) {
    super(props,context);
    this.i18n = context.i18n;
  }

  componentDidMount() {
    FooterActions.getTopCharacters();
  }

  render() {
      return Template.apply(this,[]);
  }
}


Footer.contextTypes = {
    i18n: React.PropTypes.object
};

export default connectToStores(Footer);

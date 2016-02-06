import React from 'react';
import { Alert } from 'react-bootstrap';

class Home extends React.Component {
  render() {
    return (
      <Alert bsStyle="success"><strong>{this.i18n.t('greeting')}</strong></Alert>
    );
  }
}

Home.contextTypes = {
    i18n: React.PropTypes.object
};

export default Home;

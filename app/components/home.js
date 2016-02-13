import React from 'react';
import { Alert } from 'react-bootstrap';

class Home extends React.Component {

  constructor(props,context){
    super(props,context);
    this.i18n = context.i18n;
  }

  render() {
    return (
      <Alert bsStyle="success">{this.i18n.t('greeting')}</Alert>
    );
  }
}

Home.contextTypes = {
    i18n: React.PropTypes.object
};

export default Home;

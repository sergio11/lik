import React from 'react';
import { Alert } from 'react-bootstrap';

class Home extends React.Component {
  render() {
    return (
      <Alert bsStyle="success">Hello from <strong>Home component</strong></Alert>
    );
  }
}

export default Home;

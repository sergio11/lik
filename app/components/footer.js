import React from 'react';
import {Link} from 'react-router';
import { Image, Grid, Row, Col } from 'react-bootstrap';
import FooterStore from '../stores/FooterStore'
import FooterActions from '../actions/FooterActions';
import connectToStores from 'alt-utils/lib/connectToStores';

class Footer extends React.Component {

  static getStores() {
      return [FooterStore];
  }

  static getPropsFromStores() {
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
      <footer>
        <Grid fluid>
            <Row className="show-grid">
              <Col sm={5}>
                <h3 className='lead'><strong>Information</strong> and <strong>Copyright</strong></h3>
                <p>Powered by <strong>Node.js</strong>, <strong>MongoDB</strong> and <strong>React</strong> with Flux architecture and server-side rendering.</p>
                <p>You may view the <a href='https://github.com/sergio11/lik' target='_blank'>Source Code</a> behind this project on GitHub.</p>
                <p>© 2016 Sergio Sánchez Sánchez.</p>
              </Col>
              <Col sm={7} xsHidden>
                <h3 className='lead'><strong>Leaderboard</strong> Top 5 Characters</h3>
                <ul className='list-inline'>
                  {this.props.characters.map((character) => {
                    return (
                      <li key={character.characterId}>
                        <Link to={'/characters/' + character.characterId}>
                          <Image src={'http://image.eveonline.com/Character/' + character.characterId + '_128.jpg'} thumbnail />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Col>
            </Row>
        </Grid>
      </footer>
    );
  }
}

export default connectToStores(Footer);

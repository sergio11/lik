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

  constructor(props,context) {
    super(props,context);
    this.i18n = context.i18n;
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
                <h3 className='lead' dangerouslySetInnerHTML={{__html: this.i18n.t('footer.copyright.title')}}></h3>
                <p dangerouslySetInnerHTML={{__html: this.i18n.t('footer.copyright.powered_by')}}></p>
                <p dangerouslySetInnerHTML={{__html: this.i18n.t('footer.copyright.repository')}}></p>
                <p>© 2016 Sergio Sánchez Sánchez.</p>
              </Col>
              <Col sm={7} xsHidden>
                <h3 className='lead' dangerouslySetInnerHTML={{__html: this.i18n.t('footer.top')}}></h3>
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


Footer.contextTypes = {
    i18n: React.PropTypes.object
};

export default connectToStores(Footer);

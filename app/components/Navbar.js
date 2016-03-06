import React from 'react';
import {Link} from 'react-router';
import NavBarB from 'react-bootstrap/lib/Navbar'
import {Nav, NavItem, Badge, Input, Button, Glyphicon, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from  'react-router-bootstrap';
import NavbarStore from '../stores/NavbarStore';
import NavbarActions from '../actions/NavbarActions';
import connectToStores from 'alt-utils/lib/connectToStores';
import socket from 'socket.io-client';
import classNames from 'classNames';
import {Typeahead} from 'react-typeahead';


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

  handleSubmit(event) {
    event.preventDefault();
    
    let searchQuery = this.props.search.value.trim();
    console.log(searchQuery);
    searchQuery && NavbarActions.findCharacter(searchQuery);

  }
  

  render() {
    return(
      <NavBarB inverse fixedTop>
        <NavBarB.Header staticTop>
          <div className={classNames({'fadeIn': this.props.search.state == 'dirty','fadeOut': this.props.search.state !== 'dirty'},'animated')}>
            <div className='loader'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
          </div>
          <NavBarB.Brand>
            <Link to='/'>
              LIK<Badge className='badge-up badge-danger'>{this.props.onlineUsers}</Badge>
            </Link>
          </NavBarB.Brand>
          <NavBarB.Toggle />
        </NavBarB.Header>
        <NavBarB.Collapse>
          <NavBarB.Form pullLeft className={classNames(
              {'has-success':this.props.search.state == 'success','has-error': this.props.search.state == 'fail'} ,'animated', {'shake': this.props.search.state == 'fail' }
             )}>
             <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                <Typeahead
                    className="form-group"
                    placeholder={this.props.totalCharacters + ' characters'}
                    value={this.props.search.value}
                    options={['John', 'Paul', 'George', 'Ringo']}
                    maxVisible={2}
                    customClasses={{
                        input: 'form-control'
                    }}
                    inputProps={{
                        onChange: NavbarActions.updateSearchQuery
                    }}
                />
                <Button type='submit' className='btn btn-primary'><Glyphicon glyph="search" /></Button>
             </form>
          </NavBarB.Form>
          <Nav>
            <LinkContainer to={{ pathname: '/'}}>
              <NavItem eventKey={1} href="#">Home</NavItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: '/stats'}}>
              <NavItem eventKey={2} href="#">Stats</NavItem>
            </LinkContainer>
            <NavDropdown eventKey={3} title="Top 100" id="basic-nav-dropdown">
              <LinkContainer to={{ pathname: '/top'}}>
                <MenuItem eventKey={3.1} href="#">Top Overall</MenuItem>
              </LinkContainer>
              <MenuItem divider/>
              <MenuItem header>Caldari</MenuItem>
              <LinkContainer to={{ pathname: '/top/caldari/achura'}}>
                <MenuItem eventKey={3.3} href="#">Achura</MenuItem>
              </LinkContainer>
              <LinkContainer to={{ pathname: '/top/caldari/civire'}}>
                <MenuItem eventKey={3.4} href="#">Civire</MenuItem>
              </LinkContainer>
              <LinkContainer to={{ pathname: '/top/caldari/deteis'}}>
                 <MenuItem eventKey={3.5} href="#">Deteis</MenuItem>
              </LinkContainer>
              <MenuItem divider/>
              <MenuItem header>Gallente</MenuItem>
              <LinkContainer to={{ pathname: '/top/gallente/gallente'}}>
                 <MenuItem eventKey={3.7} href="#">Gallente</MenuItem>
              </LinkContainer>
              <LinkContainer to={{ pathname: '/top/gallente/intaki'}}>
                 <MenuItem eventKey={3.8} href="#">Intaki</MenuItem>
              </LinkContainer>
              <LinkContainer to={{ pathname: '/top/gallente/jin-mei'}}>
                 <MenuItem eventKey={3.9} href="#">Jin-Mei</MenuItem>
              </LinkContainer>
              <MenuItem divider/>
              <MenuItem header>Minmatar</MenuItem>
              <LinkContainer to={{ pathname: '/top/minmatar/brutor'}}>
                 <MenuItem eventKey={4} href="#">Brutor</MenuItem>
              </LinkContainer>
              <LinkContainer to={{ pathname: '/top/minmatar/sebiestor'}}>
                 <MenuItem eventKey={4.1} href="#">Sebiestor</MenuItem>
              </LinkContainer>
              <LinkContainer to={{ pathname: '/top/minmatar/vherokior'}}>
                 <MenuItem eventKey={4.2} href="#">Vherokior</MenuItem>
              </LinkContainer>
              <MenuItem divider/>
              <MenuItem header>Amarr</MenuItem>
              <LinkContainer to={{ pathname: '/top/amarr/amarr'}}>
                 <MenuItem eventKey={5} href="#">Amarr</MenuItem>
              </LinkContainer>
              <LinkContainer to={{ pathname: '/top/amarr/ni-kunni'}}>
                 <MenuItem eventKey={5.1} href="#">Ni-Kunni</MenuItem>
              </LinkContainer>
              <LinkContainer to={{ pathname: '/top/amarr/khanid'}}>
                 <MenuItem eventKey={5.2} href="#">Khanid</MenuItem>
              </LinkContainer>
              <MenuItem divider/>
              <LinkContainer to={{ pathname: '/shame'}}>
                 <MenuItem eventKey={6} href="#">Hall of Shame</MenuItem>
              </LinkContainer>
            </NavDropdown>
            <LinkContainer to={{ pathname: '/add'}}>
              <NavItem eventKey={4.7} href="#">{this.i18n.t('navbar.add_character')}</NavItem>
            </LinkContainer>
          </Nav>
        </NavBarB.Collapse>
      </NavBarB>

    );
  }
}

Navbar.contextTypes = {
    i18n: React.PropTypes.object
};

export default connectToStores(Navbar);

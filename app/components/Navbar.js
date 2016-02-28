import React from 'react';
import {Link} from 'react-router';
import NavBarB from 'react-bootstrap/lib/Navbar'
import {Nav, NavItem, Badge, Input, Button, Glyphicon, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from  'react-router-bootstrap';
import NavbarStore from '../stores/NavbarStore';
import NavbarActions from '../actions/NavbarActions';
import connectToStores from '../hoc/connectToStores';
import socket from 'socket.io-client';

class Navbar extends React.Component {

  static getStores() {
      return [NavbarStore];
  }

  static getState() {
      return NavbarStore.getState();
  }

  constructor(props,context) {
    super(props,context);
    this.i18n = context.i18n;
    console.log("Estas son las props del Navbar")
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
  }

  render() {
    return(
      <NavBarB inverse>
        <NavBarB.Header staticTop>
          <div className='triangles fadeIn animated'>
            <span className='tri invert animated'></span>
            <span className='tri invert animated'></span>
            <span className='tri animated'></span>
            <span className='tri invert animated'></span>
            <span className='tri invert animated'></span>
            <span className='tri animated'></span>
            <span className='tri invert animated'></span>
            <span className='tri animated'></span>
            <span className='tri invert animated'></span>
          </div>
          <NavBarB.Brand>
            <Link to='/'>
              LIK<Badge className='badge-up badge-danger'>{this.props.onlineUsers}</Badge>
            </Link>
          </NavBarB.Brand>
          <NavBarB.Toggle />
        </NavBarB.Header>
        <NavBarB.Collapse>
          <NavBarB.Form pullLeft onSubmit={this.handleSubmit.bind(this)}>
            <Input type="text" placeholder={this.props.totalCharacters + ' characters'} value={this.props.searchQuery} onChange={NavbarActions.updateSearchQuery} buttonAfter={<Button type='submit'><Glyphicon glyph="search" /></Button>} />
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
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
            <LinkContainer to={{ pathname: '/add'}}>
              <NavItem eventKey={4} href="#">{this.i18n.t('navbar.add_character')}</NavItem>
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

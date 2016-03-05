import React from 'react';
import {Link} from 'react-router';
import { Grid, Row, Thumbnail} from 'react-bootstrap';
import Loader  from 'react-loader';
import _ from 'lodash';
import HomeActions from '../actions/HomeActions';
import HomeStore from '../stores/HomeStore';
import connectToStores from 'alt-utils/lib/connectToStores';

class Home extends React.Component {
    
  static getStores() {
      return [HomeStore];
  }

  static getPropsFromStores() {
      return HomeStore.getState();
  }

  constructor(props,context){
    super(props,context);
    this.i18n = context.i18n;
  }
  
  componentDidMount() {
      HomeActions.getTwoCharacters();
  }
  
  componentWillUnmount() {
      HomeActions.setCharacterLoaded(false);
  }
  
  handleClick(character) {
      let winner = character.characterId;
      let loser = _.head(_.without(this.props.characters,_.find(this.props.characters, { characterId: winner }))).characterId;
      HomeActions.vote(winner, loser);
  }
  
  render() {
            
    return (
        <Grid>
            <Row>
                <h3 className='text-center col-xs-12 invert'>{this.i18n.t('home.title')}</h3>
            </Row>
            <Row>
                <Loader loaded={this.props.loaded} width={10} color='#fff'>
                {
                    this.props.characters.map((character, index) => {
                        return (
                           <div key={character.characterId} className={index === 0 ? 'col-xs-3 col-sm-6 col-md-5 col-md-offset-1' : 'col-xs-3 col-sm-6 col-md-5'}>
                                <Thumbnail onClick={this.handleClick.bind(this, character)} className="fadeInUp animated" src={'http://image.eveonline.com/Character/' + character.characterId + '_512.jpg'} alt={character.name}>
                                    <h3 className='caption text-center'>{character.name}</h3>
                                    <ul className='list-inline'>
                                        <li><strong>Race:</strong> {character.race}</li>
                                        <li><strong>Bloodline:</strong> {character.bloodline}</li>
                                    </ul>
                                    <h4>
                                        <Link to={'/characters/' + character.characterId}><strong>{character.name}</strong></Link>
                                    </h4>
                                 </Thumbnail>
                             </div> 
                         )
                     })
                 }
                </Loader>
            </Row>
         </Grid>
        );
    }
}

Home.contextTypes = {
    i18n: React.PropTypes.object
};

export default connectToStores(Home);

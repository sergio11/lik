import React from 'react';
import {Link} from 'react-router';
import { Grid, Row, Thumbnail} from 'react-bootstrap';
import _ from 'lodash';
import HomeActions from '../actions/HomeActions';
import HomeStore from '../stores/HomeStore';
import connectToStores from '../hoc/connectToStores';

class Home extends React.Component {
    
  static getStores() {
      return [HomeStore];
  }

  static getState() {
      return HomeStore.getState();
  }

  constructor(props,context){
    super(props,context);
    this.i18n = context.i18n;
  }
  
  componentDidMount() {
    HomeActions.getTwoCharacters();
  }
  
  handleClick(character) {
    var winner = character.characterId;
    var loser = _.head(_.without(this.props.characters,[character])).characterId;
    HomeActions.vote(winner, loser);
  }
  
  
  renderCharacters(){
      
      return this.props.characters.map((character,index) => {
                        
          <div key={character.characterId} className={index === 0 ? 'col-xs-6 col-sm-6 col-md-5 col-md-offset-1' : 'col-xs-6 col-sm-6 col-md-5'}>
               <Thumbnail onClick={this.handleClick.bind(this, character)} className="fadeInUp animated" src="/assets/thumbnaildiv.png" alt="242x200">
                  <h3 className='caption text-center'>Thumbnail label</h3>
                  <ul className='list-inline'>
                       <li><strong>Race:</strong> {character.race}</li>
                       <li><strong>Bloodline:</strong> {character.bloodline}</li>
                  </ul>
                  <h4>
                     <Link to={'/characters/' + character.characterId}><strong>{character.name}</strong></Link>
                  </h4>
               </Thumbnail>
           </div> 
      });
      
  }

  render() {
            
    return (
        <Grid>
            <h3 className='text-center'>{this.i18n.t('home.title')}</h3>
            <Row>
                {this.renderCharacters()}
            </Row>
         </Grid>
        );
    }
}

Home.contextTypes = {
    i18n: React.PropTypes.object
};

export default connectToStores(Home);

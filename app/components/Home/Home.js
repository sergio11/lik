import React from 'react';
import _ from 'lodash';
import HomeActions from '../../actions/HomeActions';
import HomeStore from '../../stores/HomeStore';
import connectToStores from 'alt-utils/lib/connectToStores';
import Template from './Home.rt.js';

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
    return Template.apply(this,[]);
  }
}

Home.contextTypes = {
    i18n: React.PropTypes.object
};

export default connectToStores(Home);

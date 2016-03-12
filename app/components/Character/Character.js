import React from 'react';
import CharacterStore from '../../stores/CharacterStore';
import CharacterActions from '../../actions/CharacterActions';
import connectToStores from 'alt-utils/lib/connectToStores';
import Template from './Character.rt.js';

class Character extends React.Component {
    
    static getStores() {
      return [CharacterStore];
    }

    static getPropsFromStores() {
      return CharacterStore.getState();
    }
    
    constructor(props,context) {
        super(props,context);
        this.i18n = context.i18n;
    }

    componentDidMount() {
        CharacterActions.getCharacter(this.props.params.id);
    }

    componentWillUnmount() {
        $(document.body).removeClass();
    }

    componentDidUpdate(prevProps) {
        // Fetch new charachter data when URL path changes
        if (prevProps.params.id !== this.props.params.id) {
            CharacterActions.getCharacter(this.props.params.id);
        }
    }
    
    report(characterId){
        CharacterActions.report(characterId);
    }
    
    _preloader() {
        return <img src='/img/loader.gif' />;
    }

    render() {
        return Template.apply(this,[]);
    }
}

Character.contextTypes = {
    i18n: React.PropTypes.object
}

export default connectToStores(Character);
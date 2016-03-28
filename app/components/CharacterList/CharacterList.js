import React from 'react';
import _ from 'lodash';
import CharacterListStore from '../../stores/CharacterListStore';
import CharacterListActions from '../../actions/CharacterListActions';
import connectToStores from 'alt-utils/lib/connectToStores';
import Template from './CharacterList.rt.js';

class CharacterList extends React.Component {
    
    static getStores() {
      return [CharacterListStore];
    }

    static getPropsFromStores() {
      return CharacterListStore.getState();
    }
    
    constructor(props,context) {
        super(props,context);
        this.i18n = context.i18n;
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.params, this.props.params)) {
            CharacterListActions.updateCurrentPage(0);
            CharacterListActions.getCharacters(this.props.params);
        }
    }
    
    componentWillUnmount(){
        CharacterListActions.emptyCharacterList();
    }
    
    _nextPage(e){
        //Object { selected: 1 }
        let page = e.selected, limit = {start:this.props.chaPerPage * e.selected,count:this.props.chaPerPage};
        CharacterListActions.updateCurrentPage(page);
        CharacterListActions.getCharacters(this.props.params,limit);
    }

     _preloader() {
        return <img src='/img/loader.gif' />;
    }

    render() {
        return Template.call(this);
       
    }
}

CharacterList.contextTypes = {
    i18n: React.PropTypes.object
};

export default connectToStores(CharacterList);
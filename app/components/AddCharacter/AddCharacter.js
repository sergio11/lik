import React from 'react';
import AddCharacterStore from '../../stores/AddCharacterStore';
import AddCharacterActions from '../../actions/AddCharacterActions';
import connectToStores from 'alt-utils/lib/connectToStores';
import Template from './AddCharacter.rt.js';

class AddCharacter extends React.Component {
    
    static getStores() {
        return [AddCharacterStore];
    }

    static getPropsFromStores() {
        return AddCharacterStore.getState();
    }

    constructor(props,context) {
        super(props,context);
        this.i18n = context.i18n;
    }

    componentDidMount() {}

    componentWillUnmount() {}

    onChangeName(e){
        let name = e.target.value.trim();
        AddCharacterActions.updateName(name);
        if (!name.length) {
        AddCharacterActions.invalidName();
        }else{
        AddCharacterActions.validName();
        }

    }

    onChangeGender(e){
        let gender = e.target.value;
        AddCharacterActions.updateGender(gender);
    }

    handleSubmit(event) {
        event.preventDefault();
        let name,gender;
        name = this.props.character_name.value;
        gender = this.props.gender;
        if (name && gender) {
            AddCharacterActions.addCharacter(name,gender);
        }

    }
    
    characterNameStyle(status) {
        if (status == 'invalid') return 'error';
        if (status == 'valid') return 'success';
        return "warning";            
    }
    
    characterNameHelpText(status) {
        let help = null;
        if (status == 'invalid'){
            help = this.i18n.t('add_character.character_name.empty');
        }
        return help;    
    }


    render() {
        return Template.apply(this,[]);
    }
}

AddCharacter.contextTypes = {
    i18n: React.PropTypes.object
};

export default connectToStores(AddCharacter);

import React from 'react';
import {Grid, Row, Col, Panel, Input, ButtonInput} from 'react-bootstrap';
import AddCharacterStore from '../stores/AddCharacterStore';
import AddCharacterActions from '../actions/AddCharacterActions';
import connectToStores from 'alt-utils/lib/connectToStores';

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


    render() {
        let characterNameStyle,characterNameHelpBlock;
        if (this.props.character_name.status == 'invalid') {
        characterNameStyle = 'error';
        characterNameHelpBlock = this.i18n.t('add_character.character_name.empty');
        }else if (this.props.character_name.status == 'valid') {
        characterNameStyle = 'success';
        }
        return (
        <Grid>
            <Row>
            <Col sm={8}>
                <Panel header={this.i18n.t('add_character.panel_title')} bsStyle="primary" className='flipInX animated'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <Input type="text"
                        bsStyle={characterNameStyle}
                        hasFeedback={characterNameStyle ? true : false}
                        label={this.i18n.t('add_character.character_name.label')}
                        value={this.props.character_name.value}
                        placeholder={this.i18n.t('add_character.character_name.placeholder')}
                        help={characterNameHelpBlock}
                        autoFocus
                        onChange={this.onChangeName.bind(this)}/>
                    <Input type='radio'
                        name='gender'
                        label={this.i18n.t('add_character.gender.female')}
                        defaultChecked={this.props.gender == 'female' ? true : false}
                        value='Female'
                        onChange={this.onChangeGender.bind(this)}/>
                    <Input type='radio'
                        name='gender'
                        label={this.i18n.t('add_character.gender.male')}
                        defaultChecked={this.props.gender == 'male' ? true : false}
                        value='Male'
                        onChange={this.onChangeGender.bind(this)} />
                    <ButtonInput bsStyle="primary" type="submit" value={this.i18n.t('add_character.submit')} disabled={this.props.character_name.status == 'valid' ? false :true}/>
                </form>
                </Panel>
            </Col>
            </Row>
        </Grid>
        );
    }
}

AddCharacter.contextTypes = {
    i18n: React.PropTypes.object
};

export default connectToStores(AddCharacter);

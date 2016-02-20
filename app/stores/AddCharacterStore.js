import alt from '../alt';
import AddCharacterActions from '../actions/AddCharacterActions';

class AddCharacterStore {

  constructor() {
    this.bindActions(AddCharacterActions);
    this.state = {
      character_name: {
        state: 'pristine',
        value: ''
      },
      gender: 'female',
    }
  }

  onAddCharacterSuccess() {
    this.state.character_name.value = '';
    this.state.character_name.status = 'pristine';
    this.state.gender = 'female';
  }

  onAddCharacterFail() {}

  onUpdateName(name) {
    this.state.character_name.value = name;
    this.state.character_name.status = 'dirty';
  }

  onInvalidName() {
    this.state.character_name.status = 'invalid';
  }

  onValidName(){
    this.state.character_name.status = 'valid';
  }


  getState(){
    return this.state;
  }

}

export default alt.createStore(AddCharacterStore);

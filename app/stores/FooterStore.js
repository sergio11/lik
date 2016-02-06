import alt from '../alt';
import FooterActions from '../actions/FooterActions';

class FooterStore {
  constructor() {
    /*bindActions is a magic Alt method which binds actions to their handlers defined in the store.*/
    this.bindActions(FooterActions);
    this.characters = [];
  }

  onGetTopCharactersSuccess(data) {
    this.characters = data.slice(0, 5);
  }

  onGetTopCharactersFail(err) {
    console.log("Error !!!");
    console.log(err);
    // Handle multiple response formats, fallback to HTTP status code number.
    //toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }
}

export default alt.createStore(FooterStore);
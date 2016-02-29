import React from 'react';
import {Link} from 'react-router';
import {Grid, ListGroup} from 'react-bootstrap';
import _ from 'lodash';
import CharacterListStore from '../stores/CharacterListStore';
import CharacterListActions from '../actions/CharacterListActions';
import connectToStores from '../hoc/connectToStores';

class CharacterList extends React.Component {
    
    static getStores() {
      return [CharacterListStore];
    }

    static getState() {
      return CharacterListStore.getState();
    }
    
    constructor(props) {
        super(props);
        console.log("Props");
        console.log(props);
    }

    componentDidMount() {
        CharacterListActions.getCharacters(this.props.params);
    }
    
    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.params, this.props.params)) {
            CharacterListActions.getCharacters(this.props.params);
        }
    }


    render() {
        console.log("Pintando Top 100");
        console.log(this.props.characters);
        return (
            <Grid>
                <ListGroup componentClass="ul">
                    {
                         this.props.characters.map((character, index) => {
                             
                             return (
                                 <div key={character.characterId} className='list-group-item animated fadeIn'>
                                    <div className='media'>
                                        <span className='position pull-left'>{index + 1}</span>
                                        <div className='pull-left thumb-lg'>
                                            <Link to={'/characters/' + character.characterId}>
                                                <img className='media-object' src={'http://image.eveonline.com/Character/' + character.characterId + '_128.jpg'} />
                                            </Link>
                                        </div>
                                        <div className='media-body'>
                                            <h4 className='media-heading'>
                                                <Link to={'/characters/' + character.characterId}>{character.name}</Link>
                                            </h4>
                                            <small>Race: <strong>{character.race}</strong></small>
                                            <br />
                                            <small>Bloodline: <strong>{character.bloodline}</strong></small>
                                            <br />
                                            <small>Wins: <strong>{character.wins}</strong> Losses: <strong>{character.losses}</strong></small>
                                        </div>
                                    </div>
                                </div>
                             )
                         })
                        
                    }
                </ListGroup>
            </Grid>
        );
       
    }
}

export default connectToStores(CharacterList);
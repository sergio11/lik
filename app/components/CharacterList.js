import React from 'react';
import {Link} from 'react-router';
import {Grid,Row, ListGroup} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import ImageLoader from 'react-imageloader';
import _ from 'lodash';
import CharacterListStore from '../stores/CharacterListStore';
import CharacterListActions from '../actions/CharacterListActions';
import connectToStores from 'alt-utils/lib/connectToStores';

class CharacterList extends React.Component {
    
    static getStores() {
      return [CharacterListStore];
    }

    static getPropsFromStores() {
      return CharacterListStore.getState();
    }
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        CharacterListActions.getCharacterCount();
    }
    
    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.params, this.props.params)) {
            CharacterListActions.getCharacters(this.props.params);
        }
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
        return (
            
                <Grid>
                    <ListGroup componentClass="ul">
                        {
                            this.props.characters.map((character, index) => {
                                
                                return (
                                    <div key={character.characterId} className='list-group-item animated fadeIn'>
                                        <div className='media'>
                                            <span className='position pull-left'>{this.props.currentPage * this.props.chaPerPage + index + 1}</span>
                                            <div className='pull-left thumb-lg'>
                                                <Link to={'/characters/' + character.characterId}>
                                                    <ImageLoader
                                                        className='media-object'
                                                        src={'http://image.eveonline.com/Character/' + character.characterId + '_128.jpg'}
                                                        imgProps={{'thumbnail':true}}
                                                        wrapper={React.DOM.div}
                                                        preloader={this._preloader}>
                                                        Image load failed!
                                                    </ImageLoader>
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
                    <Row>
                        <ReactPaginate 
                            breakLabel={"..."}
                            pageNum={this.props.total / this.props.chaPerPage}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            activeClassName={"active"}
                            containerClassName={""}
                            subContainerClassName={"pagination pagination-lg"}
                            initialSelected={this.props.currentPage}
                            clickCallback={this._nextPage.bind(this)} />
                    </Row>    
                </Grid>
        );
       
    }
}

export default connectToStores(CharacterList);
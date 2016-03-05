import React from 'react';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import ImageLoader from 'react-imageloader';
import CharacterStore from '../stores/CharacterStore';
import CharacterActions from '../actions/CharacterActions'
import connectToStores from '../hoc/connectToStores';
import Loader  from 'react-loader';

class Character extends React.Component {
    
    static getStores() {
      return [CharacterStore];
    }

    static getState() {
      return CharacterStore.getState();
    }
    
    constructor(props) {
        super(props);
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
    
    _preloader() {
        return <img src='/img/loader.gif' />;
    }

    render() {

        return (
            <Grid>
               <Row>
                  <Col xs={6} md={4}>
                    <ImageLoader
                        src={'https://image.eveonline.com/Character/' + this.props.characterId + '_256.jpg'}
                        imgProps={{'thumbnail':true}}
                        wrapper={React.DOM.div}
                        preloader={this._preloader}>
                        Image load failed!
                    </ImageLoader>
                   </Col>
                   <Col xs={6} md={8}>
                      <h2 className='invert'><strong>{this.props.name}</strong></h2>
                      <h4 className='lead invert'>Race: <strong>{this.props.race}</strong></h4>
                      <h4 className='lead invert'>Bloodline: <strong>{this.props.bloodline}</strong></h4>
                      <h4 className='lead invert'>Gender: <strong>{this.props.gender}</strong></h4>
                      <button className='btn btn-transparent'
                           onClick={CharacterActions.report.bind(this, this.props.characterId)}
                           disabled={this.props.isReported}>
                           {this.props.isReported ? 'Reported' : 'Report Character'}
                       </button>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className='profile-stats'>
                        <ul>
                           <li><span className='stats-number'>{this.props.winLossRatio}</span>Winning Percentage</li>
                           <li><span className='stats-number'>{this.props.wins}</span> Wins</li>
                           <li><span className='stats-number'>{this.props.losses}</span> Losses</li>
                        </ul>
                     </Col>
                 </Row>
             </Grid>
        );
    }
}

export default connectToStores(Character);
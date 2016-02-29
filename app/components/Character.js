import React from 'react';
import {Grid, Row, Col, Image} from 'react-bootstrap';
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


    render() {
        return (
            <Grid>
               <Row>
                  <Col xs={6} md={4}>
                      <Image src={'https://image.eveonline.com/Character/' + this.props.characterId + '_256.jpg'} thumbnail />
                   </Col>
                   <Col xs={6} md={8}>
                      <h2><strong>{this.props.name}</strong></h2>
                      <h4 className='lead'>Race: <strong>{this.props.race}</strong></h4>
                      <h4 className='lead'>Bloodline: <strong>{this.props.bloodline}</strong></h4>
                      <h4 className='lead'>Gender: <strong>{this.props.gender}</strong></h4>
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
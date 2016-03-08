import React from 'react';
import {Grid, Row, Panel, Table} from 'react-bootstrap';
import StatsStore from '../stores/StatsStore';
import StatsActions from '../actions/StatsActions';
import connectToStores from 'alt-utils/lib/connectToStores';

class Stats extends React.Component{
    
    static getStores() {
      return [StatsStore];
    }

    static getPropsFromStores() {
      return StatsStore.getState();
    }

    constructor(props,context){
        super(props,context);
        this.i18n = context.i18n;
    }
    
    componentDidMount(){
        StatsActions.getStats();
    }
    
    render(){
        return (
            <Grid>
                <Row>
                    <Panel header="Stats" bsStyle="primary" className="animated fadeIn">
                        <Table striped>
                            <tbody>
                                <tr>
                                    <td>Leading race in Top 100</td>
                                    <td>{this.props.leadingRace.race} with {this.props.leadingRace.count} characters</td>
                                </tr>
                                <tr>
                                    <td>Leading bloodline in Top 100</td>
                                    <td>{this.props.leadingBloodline.bloodline} with {this.props.leadingBloodline.count} characters</td>
                                </tr>
                                <tr>
                                    <td>Amarr Characters</td>
                                    <td>{this.props.amarrCount}</td>
                                </tr>
                                <tr>
                                    <td>Caldari Characters</td>
                                    <td>{this.props.caldariCount}</td>
                                </tr>
                                <tr>
                                    <td>Gallente Characters</td>
                                    <td>{this.props.gallenteCount}</td>
                                </tr>
                                <tr>
                                    <td>Minmatar Characters</td>
                                    <td>{this.props.minmatarCount}</td>
                                </tr>
                                <tr>
                                    <td>Total votes cast</td>
                                    <td>{this.props.totalVotes}</td>
                                </tr>
                                <tr>
                                    <td>Female characters</td>
                                    <td>{this.props.femaleCount}</td>
                                </tr>
                                <tr>
                                    <td>Male characters</td>
                                    <td>{this.props.maleCount}</td>
                                </tr>
                                <tr>
                                    <td>Total number of characters</td>
                                    <td>{this.props.totalCount}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Panel>
                  </Row>
            </Grid>
        );
    }
}

Stats.contextTypes = {
    i18n: React.PropTypes.object
};

export default connectToStores(Stats);
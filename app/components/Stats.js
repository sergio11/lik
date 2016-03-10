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
                    <Panel header={this.i18n.t('stats.header')} bsStyle="primary" className="animated fadeIn">
                        <Table striped>
                            <tbody>
                                <tr>
                                    <td>{this.i18n.t('stats.table.leading_race')}</td>
                                    <td>{this.props.leadingRace.race} with {this.props.leadingRace.count} characters</td>
                                </tr>
                                <tr>
                                    <td>{this.i18n.t('stats.table.leading_bloodline')}</td>
                                    <td>{this.props.leadingBloodline.bloodline} with {this.props.leadingBloodline.count} characters</td>
                                </tr>
                                <tr>
                                    <td>{this.i18n.t('stats.table.amarr')}</td>
                                    <td>{this.props.amarrCount}</td>
                                </tr>
                                <tr>
                                    <td>{this.i18n.t('stats.table.caldari')}</td>
                                    <td>{this.props.caldariCount}</td>
                                </tr>
                                <tr>
                                    <td>{this.i18n.t('stats.table.gallente')}</td>
                                    <td>{this.props.gallenteCount}</td>
                                </tr>
                                <tr>
                                    <td>{this.i18n.t('stats.table.minmatar')}</td>
                                    <td>{this.props.minmatarCount}</td>
                                </tr>
                                <tr>
                                    <td>{this.i18n.t('stats.table.total_votes')}</td>
                                    <td>{this.props.totalVotes}</td>
                                </tr>
                                <tr>
                                    <td>{this.i18n.t('stats.table.female')}</td>
                                    <td>{this.props.femaleCount}</td>
                                </tr>
                                <tr>
                                    <td>{this.i18n.t('stats.table.male')}</td>
                                    <td>{this.props.maleCount}</td>
                                </tr>
                                <tr>
                                    <td>{this.i18n.t('stats.table.total_character')}</td>
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
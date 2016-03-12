import React from 'react';
import StatsStore from '../../stores/StatsStore';
import StatsActions from '../../actions/StatsActions';
import connectToStores from 'alt-utils/lib/connectToStores';
import Template from './Stats.rt.js';

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
    
    render() {
        return Template.apply(this,[]);
    }
}

Stats.contextTypes = {
    i18n: React.PropTypes.object
};

export default connectToStores(Stats);
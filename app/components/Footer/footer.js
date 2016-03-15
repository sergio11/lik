import React from 'react';
import FooterStore from '../../stores/FooterStore';
import FooterActions from '../../actions/FooterActions';
import connectToStores from 'alt-utils/lib/connectToStores';
import Template from './Footer.rt.js';

class Footer extends React.Component{
    
    static getStores() {
        return [FooterStore];
    }

    static getPropsFromStores() {
        return FooterStore.getState();
    }

    constructor(props,context) {
        super(props,context);
        this.i18n = context.i18n;
    }
    
    _loadTop(mediaQuery){
        
        let count = 0;
        switch(mediaQuery){
            case 'small':
                count = 3;
            break;
            case 'medium':
                count = 5;
            break;
            case 'large':
                count = 10;
            break;
        }
        
        FooterActions.getTopCharacters(count);
    }
   
    componentDidMount() {
        this._loadTop(this.props.mediaQuery);
        
    }
    
    componentWillReceiveProps(nextProps){
        console.log("Media Query : " + nextProps.mediaQuery);
        if(this.props.mediaQuery !== nextProps.mediaQuery){
            this._loadTop(nextProps.mediaQuery);
        }
    }
    
    render() {
        return Template.apply(this,[]);
    }
    
}

Footer.contextTypes = {
    i18n: React.PropTypes.object
};


export default connectToStores(Footer);
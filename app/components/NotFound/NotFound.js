import React from 'react';
import Template from './NotFound.rt.js';

class NotFound extends React.Component{
    
    constructor(props,context){
        super(props,context);
        this.i18n = context.i18n;
    }
    
    render() {
        return Template.apply(this,[]);
    }
    
}

NotFound.contextTypes = {
    i18n: React.PropTypes.object
};

export default NotFound;
import React from 'react';
import {Link} from 'react-router';
import {Alert} from 'react-bootstrap';

class NotFound extends React.Component{
    
    constructor(props,context){
        super(props,context);
        this.i18n = context.i18n;
    }
    
    render() {
        
        return (
            <div className='container'>
                <Alert bsStyle="danger">
                    <h4>{this.i18n.t('not_found.title')}</h4>
                    <p>{this.i18n.t('not_found.content')}</p>
                </Alert>
            </div>
        )
        
    }
    
}

NotFound.contextTypes = {
    i18n: React.PropTypes.object
};

export default NotFound;
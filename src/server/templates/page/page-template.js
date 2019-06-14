const pageTemplate = 
`/*********************************************************************/
/* This code was generated using Material UI Designer.                */
/* If this file is generated again your changes will be overwritten.  */
/**********************************************************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withRouter } from "react-router";
%s

@withRouter
@inject('rootStore')
@observer
class %s extends Component {

    render() {
        //eslint-disable-next-line
        const { show, transitions } = this.props.rootStore;
        
        return (
            %s
        );
    }

    /***** Start custom code *****/

    /***** End custom code *****/
}

%s.propTypes = {
    rootStore: PropTypes.object,
    history: PropTypes.object
}

export default %s;
`;

module.exports = pageTemplate;
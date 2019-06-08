const pageTemplate = 
`/******************************************************************************************************************/
/* This code was generated using Material UI Designer. If this file is generated again your changes will be overwritten.  */
/* Therefore please keep your custom changes within 'Start custom code' and 'End custom code' section.            */
/******************************************************************************************************************/
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
%s

@inject('rootStore')
@observer
class %s extends Component {

    render() {
        return (
            %s
        );
    }

    /***** Start custom code *****/

    /***** End custom code *****/
}

export default %s;
`;

module.exports = pageTemplate;
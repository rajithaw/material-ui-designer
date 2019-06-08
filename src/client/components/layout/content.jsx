import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Designer from '../designer/designer';
import Preview from '../preview/preview';

const styles = theme => ({
    content: {
        display: 'flex',
        flexGrow: 1
    },
    contentWithHeader: {
        marginTop: '64px',
        [theme.breakpoints.down('xs')]: {
            marginTop: '56px'
        }
    }
});

@inject('rootStore')
@observer
class Content extends React.Component {
    render() {
        const { classes, rootStore } = this.props;

        return (
            <div className={classNames(classes.content, {[classes.contentWithHeader]: !rootStore.isPreviewMode})}>
                <Grid container>
                    {
                        rootStore.isPreviewMode &&
                        <Preview />
                    }
                    {
                        !rootStore.isPreviewMode &&
                        <Designer />
                    }
                </Grid>
            </div>
        );
    }
}

Content.propTypes = {
    classes: PropTypes.object.isRequired,
    rootStore: PropTypes.object
}

export default withStyles(styles)(Content);

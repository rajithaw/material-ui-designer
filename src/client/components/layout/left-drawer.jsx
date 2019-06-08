import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import ComponentTree from '../designer/component-tree';

const styles = theme => ({
    leftDrawerPaper: {
        position: 'relative',
        width: '0px',
        marginTop: '64px',
        height: 'calc(100% - 64px)',
        [theme.breakpoints.down('xs')]: {
            marginTop: '56px',
            height: 'calc(100% - 56px)'
        }
    },
    leftDrawerPaperOpen: {
        width: '300px'
    }
});

@inject('rootStore')
@observer
class LeftDrawer extends React.Component {
    render() {
        const { classes, rootStore } = this.props;
        const open = !rootStore.isPreviewMode;

        return (
            <Drawer
                variant="persistent"
                open={open}
                classes={{
                    paper: classNames(classes.leftDrawerPaper, { [classes.leftDrawerPaperOpen]: open })
                }}
            >
                <ComponentTree/>
            </Drawer>
        );
    }
}

LeftDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    rootStore: PropTypes.object
}

export default withStyles(styles)(LeftDrawer);

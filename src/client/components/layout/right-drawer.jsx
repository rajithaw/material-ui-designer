import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, AppBar, Tab, Tabs } from '@material-ui/core';

import ComponentPanel from '../designer/component-panel';
import ComponentProperties from '../designer/component-properties';
import ProjectContent from '../project/project-content';

const styles = theme => ({
    rightDrawerPaper: {
        position: 'relative',
        width: '0px',
        marginTop: '64px',
        height: 'calc(100% - 64px)',
        [theme.breakpoints.down('xs')]: {
            marginTop: '56px',
            height: 'calc(100% - 56px)'
        }
    },
    rightDrawerPaperOpen: {
        width: '360px'
    },
    tabRoot: {
        textTransform: 'initial',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing.unit
    }
});

@inject('rootStore', 'designerStore')
@observer
class RightDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
    }

    render() {
        const { classes, rootStore, designerStore } = this.props;
        const { value } = this.state;
        const open = !rootStore.isPreviewMode;

        return (
            <Drawer
                variant="persistent"
                anchor="right"
                open={open}
                classes={{
                    paper: classNames(classes.rightDrawerPaper, { [classes.rightDrawerPaperOpen]: open })
                }}
            >
                <div>
                    <AppBar position="sticky" color="default">
                        <Tabs value={value} onChange={this.handleTabChange}>
                            <Tab classes={{ root: classes.tabRoot }} label="Components" />
                            <Tab classes={{ root: classes.tabRoot }} label="Properties" />
                            <Tab classes={{ root: classes.tabRoot }} label="Content" />
                        </Tabs>
                    </AppBar>
                    {
                        value === 0 && 
                        <ComponentPanel />
                    }
                    {
                        value === 1 && 
                        <ComponentProperties disabled={designerStore.isSharedComponentSelected}/>
                    }
                    {
                        value === 2 &&
                        <ProjectContent />
                    }
                </div>
            </Drawer>
        );
    }

    handleTabChange = (event, value) => {
        this.setState({ value });
    };
}

RightDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    rootStore: PropTypes.object,
    designerStore: PropTypes.object,
}

export default withStyles(styles)(RightDrawer);

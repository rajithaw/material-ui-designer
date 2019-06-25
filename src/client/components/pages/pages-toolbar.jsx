import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';

import PagesDialog from './pages-dialog';

const styles = {
    toolbarButton: {
        color: 'white',
        textTransform: 'none'
    },
    toolbarIcon: {
        color: 'white',
        height: 'auto'
    }
};

@inject('pageStore', 'projectStore', 'designerStore')
@observer
class PagesToolbar extends React.Component {
    render() {
        const { classes, pageStore, projectStore, designerStore } = this.props;
        const page = pageStore.pages.find(p => p.id === pageStore.selectedPage.id);
        const pageName = page && page.name ? (designerStore.isDesignerDirty ? page.name + '*' : page.name) : 'Select page';

        return (
            <div >
                <Tooltip title='Pages'>
                    <span>
                        <Button disabled={!projectStore.selectedProject.id} onClick={this.handlePagesClick}>
                            <Typography className={classes.toolbarButton}>{ pageName }</Typography>
                        </Button>
                    </span>
                </Tooltip>
                <Tooltip title='Save'>
                    <span>
                        <IconButton onClick={this.handleSave} disabled={!pageStore.selectedPage.id}>
                            <Icon className={classNames(classes.toolbarIcon, 'mdi', 'mdi-content-save')}></Icon>
                        </IconButton>
                    </span>
                </Tooltip>
                <PagesDialog />
            </div>
        );
    }

    handlePagesClick = () => {
        const { pageStore } = this.props;

        pageStore.setPagesDialogOpen(true);
        pageStore.setCurrentPage(pageStore.selectedPage);
    }

    handleSave = () => {
        const { designerStore, projectStore, pageStore } = this.props;
        const page = {
            id: pageStore.selectedPage.id,
            definition: designerStore.componentDefinition
        };

        pageStore.updatePage(projectStore.selectedProject.id, page);
    }
}

PagesToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    pageStore: PropTypes.object,
    projectStore: PropTypes.object,
    designerStore: PropTypes.object
}

export default withStyles(styles)(PagesToolbar);

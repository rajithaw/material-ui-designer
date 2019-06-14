import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import ContentCut from 'muicons/dist/ContentCut';
import ContentCopy from 'muicons/dist/ContentCopy';
import ClipboardArrowDown from 'muicons/dist/ClipboardArrowDown';
import ClipboardArrowLeft from 'muicons/dist/ClipboardArrowLeft';
import Delete from 'muicons/dist/Delete';
import Redo from 'muicons/dist/Redo';
import Fullscreen from 'muicons/dist/Fullscreen';

import { ComponentPosition } from '../../enums';

const styles = {
    toolbarIcon: {
        fill: 'white'
    },
    flipY: {
        transform: 'scaleX(-1)'
    }
};

@inject('rootStore', 'designerStore', 'projectStore', 'pageStore')
@observer
class DesignerToolbar extends React.Component {
    render() {
        const { classes, pageStore } = this.props;
        const disabled = !pageStore.selectedPage.id;

        return (
            <div>
                <Tooltip title='Cut'>
                    <span>
                        <IconButton onClick={this.handleCut} disabled={disabled}>
                            <Icon className={classes.toolbarIcon}><ContentCut/></Icon>
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title='Copy'>
                    <span>
                        <IconButton onClick={this.handleCopy} disabled={disabled}>
                            <Icon className={classes.toolbarIcon}><ContentCopy/></Icon>
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title='Paste'>
                    <span>
                        <IconButton onClick={this.handlePaste(ComponentPosition.Child)} disabled={disabled}>
                            <Icon className={classes.toolbarIcon}><ClipboardArrowDown/></Icon>
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title='Paste Before'>
                    <span>
                        <IconButton onClick={this.handlePaste(ComponentPosition.Before)} disabled={disabled}>
                            <Icon className={classes.toolbarIcon}><ClipboardArrowLeft/></Icon>
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title='Paste After'>
                    <span>
                        <IconButton onClick={this.handlePaste(ComponentPosition.After)} disabled={disabled}>
                            <Icon className={classNames(classes.toolbarIcon, classes.flipY)}><ClipboardArrowLeft/></Icon>
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title='Delete'>
                    <span>
                        <IconButton onClick={this.handleDelete} disabled={disabled}>
                            <Icon className={classes.toolbarIcon}><Delete/></Icon>
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title='Undo'>
                    <span>
                        <IconButton onClick={this.handleUndo} disabled={disabled}>
                            <Icon className={classNames(classes.toolbarIcon, classes.flipY)}><Redo/></Icon>
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title='Preview'>
                    <span>
                        <IconButton onClick={this.handlePreview} disabled={disabled}>
                            <Icon className={classes.toolbarIcon}><Fullscreen/></Icon>
                        </IconButton>
                    </span>
                </Tooltip>
            </div>
        );
    }

    handleCut = () => {
        const { designerStore } = this.props;
        
        designerStore.copyComponentDetails = {
            id: designerStore.selectedComponentId,
            isCut: true
        }
    }

    handleCopy = () => {
        const { designerStore } = this.props;
        
        designerStore.copyComponentDetails = {
            id: designerStore.selectedComponentId,
            isCut: false
        }
    }

    handlePaste = (position) => () => {
        const { designerStore } = this.props;

        designerStore.pasteComponentDefinition(designerStore.selectedComponentId, designerStore.copyComponentDetails, position);
    }

    handleDelete = () => {
        const { designerStore } = this.props;

        designerStore.removeComponentDefinition(designerStore.selectedComponentId);
        designerStore.setSelectedComponentId('');
    }

    handleUndo = () => {
        const { designerStore } = this.props;

        designerStore.restoreComponentDefinition();
        designerStore.setSelectedComponentId('');
    }

    handlePreview = () => {
        const { rootStore, designerStore, projectStore, pageStore } = this.props;

        if (designerStore.isDesignerDirty) {
            // Automatically save changes when going into preview mode
            const page = {
                id: pageStore.selectedPage.id,
                definition: designerStore.componentDefinition
            };

            pageStore.updatePage(projectStore.selectedProject.id, page, true);
        }
        
        designerStore.clonePreviewDefinition();
        rootStore.togglePreviewMode();
        rootStore.setInfoBarMessage('Press ESC to exit preview mode.');
        rootStore.setInfoBarOpen(true);
    }
}

DesignerToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    rootStore: PropTypes.object,
    designerStore: PropTypes.object,
    projectStore: PropTypes.object,
    pageStore: PropTypes.object
}

export default withStyles(styles)(DesignerToolbar);

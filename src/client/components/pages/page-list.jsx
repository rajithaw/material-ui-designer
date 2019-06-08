import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import SharedIcon from '@material-ui/icons/Share'

const styles = {
};

@inject('pageStore', 'projectStore')
@observer
class PageList extends React.Component {
    constructor(props) {
        super(props);
        
        props.pageStore.getPages(props.projectStore.selectedProject.id);
    }

    render() {
        const { pageStore } = this.props;

        return (
            <List component="nav">
                {
                    pageStore.pages.map(p => 
                        <ListItem
                            key={p.id}
                            button
                            selected={pageStore.currentPage.id === p.id}
                            onClick={this.handleListItemClick(p)}
                        >
                            <ListItemText primary={p.name} />
                            {
                                p.isShared &&
                                <ListItemSecondaryAction>
                                    <SharedIcon />
                                </ListItemSecondaryAction>
                            }
                        </ListItem>
                    )
                }
            </List>
        );
    }

    handleListItemClick = (page) => () => {
        this.props.pageStore.setCurrentPage(page);
    };
}

PageList.propTypes = {
    classes: PropTypes.object.isRequired,
    pageStore: PropTypes.object,
    projectStore: PropTypes.object
}

export default withStyles(styles)(PageList);

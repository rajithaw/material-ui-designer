import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

@inject('projectStore')
@observer
class ProjectList extends React.Component {
    constructor(props) {
        super(props);
        
        props.projectStore.getProjects();
    }
    
    render() {
        const { projectStore } = this.props;

        return (
            <List component="nav">
                {
                    projectStore.projects.map(p => 
                        <ListItem
                            key={p.id}
                            button
                            selected={projectStore.currentProject.id === p.id}
                            onClick={this.handleListItemClick(p)}
                        >
                            <ListItemText primary={p.name} />
                        </ListItem>
                    )
                }
            </List>
        );
    }

    handleListItemClick = (project) => () => {
        this.props.projectStore.setCurrentProject(project);
    };
}

ProjectList.propTypes = {
    projectStore: PropTypes.object
}

export default ProjectList;

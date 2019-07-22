import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

@inject('projectStore', 'authStore')
@observer
class ProjectList extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            userProjectsOnly: false
        };
        props.projectStore.getProjects();
    }
    
    render() {
        const { projectStore, authStore } = this.props;
        const projects = this.state.userProjectsOnly ? projectStore.userProjects : projectStore.projects;

        return (
            <React.Fragment>
                {
                    authStore.isAuthenticated &&
                    <FormControlLabel
                        control={
                            <Switch 
                                checked={this.state.userProjectsOnly} 
                                onChange={this.handleUserProjectsOnlyChange}
                            />
                        }
                        label="Show only my projects"
                    />
                }
                <List component="nav">
                    {
                        projects.map(p => 
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
            </React.Fragment>
        );
    }

    handleListItemClick = (project) => () => {
        this.props.projectStore.setCurrentProject(project);
    };

    handleUserProjectsOnlyChange = (event) => {
        this.setState({
            userProjectsOnly: event.target.checked
        });
    }
}

ProjectList.propTypes = {
    authStore: PropTypes.object,
    projectStore: PropTypes.object
}

export default ProjectList;

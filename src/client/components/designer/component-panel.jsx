import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import ComponentSerach from './component-search';
import MaterialComponentList from './material-component-list';
import SharedComponentList from './shared-component-list';

@inject('designerStore', 'pageStore')
@observer
class ComponentPanel extends React.Component {
    render() {
        const { pageStore, designerStore } = this.props;

        return (
            <div>
                <ComponentSerach/>
                <ExpansionPanel defaultExpanded={true}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Material</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <MaterialComponentList disabled={!pageStore.selectedPage.id}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Shared</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelActions>
                        <FormControlLabel
                            control={
                                <Switch checked={designerStore.addSharedComponentCopy} onChange={this.handleModeChange} />
                            }
                            label="Add copy"
                        />
                    </ExpansionPanelActions>
                    <ExpansionPanelDetails>
                        <SharedComponentList disabled={!pageStore.selectedPage.id}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }

    handleModeChange = (event) => {
        const { designerStore } = this.props;

        designerStore.setAddSharedComponentCopy(event.target.checked);
    }
}

ComponentPanel.propTypes = {
    designerStore: PropTypes.object,
    pageStore: PropTypes.object,
}

export default ComponentPanel;

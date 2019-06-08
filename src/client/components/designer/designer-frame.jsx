import React from 'react';
import PropTypes from 'prop-types';
import { create } from 'jss';
import { withStyles, jssPreset } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/styles';
import NoSsr from '@material-ui/core/NoSsr';
import rtl from 'jss-rtl';
import Frame from 'react-frame-component';

const styles = {
    root: {
        flexGrow: 1,
        border: "none"
    }
};

class DesignerFrame extends React.Component {
    state = {
        ready: false
    };

    handleRef = ref => {
        this.contentDocument = ref ? ref.node.contentDocument : null;
        this.contentWindow = ref ? ref.node.contentWindow : null;
    };

    onContentDidMount = () => {
        this.setState({
            ready: true,
            jss: create({
                plugins: [...jssPreset().plugins, rtl()],
                insertionPoint: this.contentDocument.getElementById('jss-insertion-point')
            }),
            sheetsManager: new Map(),
            container: this.contentDocument.body
        });
    };

    onContentDidUpdate = () => {
        this.contentDocument.body.dir = this.props.theme.direction;
    };

    render() {
        const { children, classes } = this.props;
        const initialContent = `<!DOCTYPE html>
            <html style="height:100%;">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
                    <style>
                        #frame-children-root { 
                            flex-grow: 1
                        } 
                        body { 
                            margin: 0px 
                        }
                    </style>
                    <noscript id="jss-insertion-point"></noscript>
                </head>
                <body>
                    <div></div>
                </body>
            </html>`;

        // NoSsr fixes a strange concurrency issue with iframe and quick React mount/unmount
        return (
            <NoSsr>
                <Frame
                    initialContent={initialContent}
                    ref={this.handleRef}
                    className={classes.root}
                    contentDidMount={this.onContentDidMount}
                    contentDidUpdate={this.onContentDidUpdate}
                >
                    {this.state.ready ? (
                        <StylesProvider
                            jss={this.state.jss}
                            sheetsManager={this.state.sheetsManager}
                        >
                            {
                                children &&
                                React.cloneElement(children, {
                                    container: this.state.container
                                })
                            }
                        </StylesProvider>
                    ) : null}
                </Frame>
            </NoSsr>
        );
    }
}

DesignerFrame.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(DesignerFrame);

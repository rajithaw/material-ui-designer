import React from "react";
import PropTypes from "prop-types";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    typography: {
        useNextVariants: true
    },
    overrides: {
        MuiAppBar: {
            root: {
                color: "black !important",
                backgroundColor: 'transparent !important',
                boxShadow: "none"
            }
        },
        MuiAvatar: {
            root: {
                color: "black !important",
                backgroundColor: 'transparent !important'
            }
        },
        MuiBadge: {
            badge: {
                color: 'black !important',
                backgroundColor: 'transparent !important'
            }
        },
        MuiButtonBase: {
            root: {
                cursor: 'default',
                color: 'black !important',
                backgroundColor: 'transparent !important',
                boxShadow: 'none !important'
            }
        },
        MuiCardActionArea: {
            focusHighlight: {
                backgroundColor: 'transparent !important'
            }
        },
        MuiCircularProgress: {
            root: {
                color: 'black !important',
                backgroundColor: 'transparent !important',
                animation: 'none !important'
            }
        },
        MuiChip: {
            root: {
                cursor: 'default',
                color: 'black !important',
                backgroundColor: 'transparent !important'
            }
        },
        MuiFab: {
            root: {
                boxShadow: 'none !important'
            }
        },
        MuiGrid: {
            container: {
                color: 'black !important',
                backgroundColor: 'transparent !important'
            },
            item: {
                color: 'black !important',
                backgroundColor: 'transparent !important'
            }
        },
        MuiGridListTileBar: {
            root: {
                backgroundColor: 'transparent !important'
            },
            titleWrap: {
                color: 'black !important'
            }
        },
        MuiInput: {
            underline: {
                '&:before': {
                    borderBottom: 'none !important'
                },
                '&:after': {
                    borderBottom: 'none !important'
                }
            }
        },
        MuiInputBase: {
            root: {
                cursor: 'default',
                color: 'black !important',
                backgroundColor: 'transparent !important'
            },
            input: {
                visibility: 'hidden'
            }
        },
        MuiLinearProgress: {
            root: {
                color: 'black !important',
                backgroundColor: 'transparent !important'
            },
            bar: {
                backgroundColor: 'black !important'
            }
        },
        MuiLink: {
            root: {
                color: 'black !important',
                backgroundColor: 'transparent !important',
                textDecoration: 'underline !important'
            }
        },
        MuiMobileStepper: {
            root: {
                '& div>div': {
                    backgroundColor: 'gray !important'
                }
            }
        },
        MuiModal: {
            root: {
                backgroundColor: 'transparent !important',
            }
        },
        MuiNativeSelect: {
            root: {
                pointerEvents: 'none'
            },
            select: {
                '&:focus': {
                    backgroundColor: 'transparent'
                }
            }
        },
        MuiPopover: {
            paper: {
                boxShadow: 'none'
            }
        },
        MuiSelect: {
            select: {
                backgroundColor: 'transparent !important',
                pointerEvents: 'none'
            }
        },
        MuiSnackbarContent: {
            root: {
                color: 'black',
                backgroundColor: 'transparent',
                boxShadow: "none"
            }
        },
        MuiStepper: {
            root: {
                '& circle': {
                    color: 'lightgray !important',
                    border: '1px dotted gray !important',
                },
                '& svg>path': {
                    color: 'gray !important',
                    border: '1px dotted gray !important',
                }
            }
        },
        MuiTablePagination: {
            toolbar: {
                pointerEvents: 'none'
            }
        },
        MuiToolbar: {
            root: {
                color: 'black !important',
                backgroundColor: 'transparent !important'
            }
        }
    },
    props: {
        MuiButtonBase: {
            disableRipple: true
        }
    },
    themeName: "Designer Theme"
});

function DesignerTheme(props) {
    return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>;
}

DesignerTheme.propTypes = {
    children: PropTypes.object.isRequired
};

export default DesignerTheme;

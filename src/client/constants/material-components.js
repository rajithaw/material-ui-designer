import React from 'react';
import AppBarIcon from '@material-ui/icons/WebAsset';
import AvatarIcon from '@material-ui/icons/AccountCircle';
//import BackdropIcon from '@material-ui/icons/PermMedia';
import ButtonIcon from '@material-ui/icons/Crop75';
import BadgeIcon from '@material-ui/icons/Filter1';
import BottomNavigationIcon from '@material-ui/icons/VideoLabel';
import BottomNavigationActionIcon from '@material-ui/icons/VideoLabel';
import CardIcon from '@material-ui/icons/CropSquare';
import CardActionAreaIcon from '@material-ui/icons/CropSquare';
import CardActionsIcon from '@material-ui/icons/CropSquare';
import CardContentIcon from '@material-ui/icons/CropSquare';
import CardHeaderIcon from '@material-ui/icons/CropSquare';
import CardMediaIcon from '@material-ui/icons/CropSquare';
import CheckboxIcon from '@material-ui/icons/CheckBox';
import ChipIcon from '@material-ui/icons/Label';
import CircularProgressIcon from '@material-ui/icons/Loop';
//import ClickAwayListenerIcon from '@material-ui/icons/Mouse';
import CollapseIcon from '@material-ui/icons/ExpandLess';
import DialogIcon from '@material-ui/icons/FeaturedVideo';
import DialogActionsIcon from '@material-ui/icons/FeaturedVideo';
import DialogContentIcon from '@material-ui/icons/FeaturedVideo';
import DialogContentTextIcon from '@material-ui/icons/FeaturedVideo';
import DialogTitleIcon from '@material-ui/icons/FeaturedVideo';
import DividerIcon from '@material-ui/icons/Remove';
import DrawerIcon from '@material-ui/icons/ChromeReaderMode';
import ExpansionPanelIcon from '@material-ui/icons/ExpandMore';
import FabIcon from '@material-ui/icons/Brightness1';
import FadeIcon from '@material-ui/icons/Gradient';
import FilledInputIcon from '@material-ui/icons/Money';
import FormControlIcon from '@material-ui/icons/Money';
import FormControlLabelIcon from '@material-ui/icons/Translate';
import FormGroupIcon from '@material-ui/icons/Toc';
import FormHelperTextIcon from '@material-ui/icons/WbAuto';
import FormLabelIcon from '@material-ui/icons/Translate';
import GridIcon from '@material-ui/icons/GridOn';
import GridListIcon from '@material-ui/icons/GridOn';
import GridListTileIcon from '@material-ui/icons/Dashboard';
import GridListTileBarIcon from '@material-ui/icons/CalendarViewDay';
//import GrowIcon from '@material-ui/icons/Timeline';
import HiddenIcon from '@material-ui/icons/BorderClear';
import HtmlElementIcon from '@material-ui/icons/Code';
import InfoIcon from '@material-ui/icons/Info';
import InputIcon from '@material-ui/icons/Input';
//import InputAdornmentIcon from '@material-ui/icons/PictureInPicture';
import InputBaseIcon from '@material-ui/icons/Input';
import InputLabelIcon from '@material-ui/icons/Label';
import LinearProgressIcon from '@material-ui/icons/ArrowRightAlt';
import ListIcon from '@material-ui/icons/List';
import ListItemIcon from '@material-ui/icons/List';
import ListItemAvatarIcon from '@material-ui/icons/List';
import ListItemIconIcon from '@material-ui/icons/SpeakerNotes';
import ListItemSecondaryActionIcon from '@material-ui/icons/CallToAction';
import ListItemTextIcon from '@material-ui/icons/Toc';
import ListSubheaderIcon from '@material-ui/icons/CreditCard';
import LinkIcon from '@material-ui/icons/FormatUnderlined';
//import MarkdownIcon from '@material-ui/icons/Transform';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItemIcon from '@material-ui/icons/Menu';
import MenuListIcon from '@material-ui/icons/Dns';
import MobileStepperIcon from '@material-ui/icons/LinearScale';
import ModalIcon from '@material-ui/icons/AccountBalanceWallet';
//import MuiThemeProviderIcon from '@material-ui/icons/Dashboard';
import NativeSelectIcon from '@material-ui/icons/ArrowDropDown';
import OutlinedInputIcon from '@material-ui/icons/FlipToBack';
import PaperIcon from '@material-ui/icons/Description';
import PopoverIcon from '@material-ui/icons/AspectRatio';
import PopperIcon from '@material-ui/icons/Bookmarks';
//import PortalIcon from '@material-ui/icons/CalendarViewDay';
import RadioIcon from '@material-ui/icons/RadioButtonChecked';
import RadioGroupIcon from '@material-ui/icons/More';
import SelectIcon from '@material-ui/icons/ArrowDropDown';
import SlideIcon from '@material-ui/icons/GetApp';
import SnackbarIcon from '@material-ui/icons/Warning';
import SnackbarContentIcon from '@material-ui/icons/FeaturedVideo';
import StepIcon from '@material-ui/icons/LinearScale';
import StepButtonIcon from '@material-ui/icons/LinearScale';
import StepConnectorIcon from '@material-ui/icons/LinearScale';
import StepContentIcon from '@material-ui/icons/LinearScale';
import StepIconIcon from '@material-ui/icons/LinearScale';
import StepLabelIcon from '@material-ui/icons/LinearScale';
import StepperIcon from '@material-ui/icons/LinearScale';
import SvgIconIcon from '@material-ui/icons/SentimentSatisfied';
import SwipeableDrawerIcon from '@material-ui/icons/FormatIndentDecrease';
import SwitchIcon from '@material-ui/icons/ToggleOff';
import TabIcon from '@material-ui/icons/Tab';
import TableIcon from '@material-ui/icons/TableChart';
import TableBodyIcon from '@material-ui/icons/ViewList';
import TableCellIcon from '@material-ui/icons/ViewAgenda';
import TableFooterIcon from '@material-ui/icons/VerticalAlignBottom';
import TableHeadIcon from '@material-ui/icons/VerticalAlignTop';
import TablePaginationIcon from '@material-ui/icons/Forward30';
import TableRowIcon from '@material-ui/icons/ViewStream';
import TableSortLabelIcon from '@material-ui/icons/SortByAlpha';
import TabsIcon from '@material-ui/icons/ViewCarousel';
import TextFieldIcon from '@material-ui/icons/TextFields';
import TooltipIcon from '@material-ui/icons/ChatBubble';
//import TouchRippleIcon from '@material-ui/icons/TouchApp';
import TypographyIcon from '@material-ui/icons/TextFormat';
import ZoomIcon from '@material-ui/icons/FindInPage';

export const materialComponents = {
    AppBar: {
        name: 'AppBar',
        displayName: 'App Bar',
        icon: <AppBarIcon />,
        properties: ['name', 'color', 'position', 'style'],
        designerDefinition: {
            component: 'AppBar',
            props: {
                children: []
            }
        }
    },
    Avatar: {
        name: 'Avatar',
        displayName: 'Avatar',
        icon: <AvatarIcon />,
        properties: ['name', 'alt', 'component', 'sizes', 'src', 'srcSet', 'style'],
        designerDefinition: {
            component: 'Avatar',
            props: {
                children: []
            }
        }
    },
    //Backdrop: {
    //    name: 'Backdrop',
    //    displayName: 'Backdrop',
    //    icon: <BackdropIcon />,
    //    properties: ['name', 'invisible', 'open', 'transitionDuration', 'style'],
    //    designerDefinition: {
    //        component: 'Backdrop',
    //        props: {
    //            children: []
    //        }
    //    }
    //},
    Badge: {
        name: 'Badge',
        displayName: 'Badge',
        icon: <BadgeIcon />,
        properties: ['name', 'badgeContent', 'color', 'component', 'invisible', 'max', 'showZero', 'variant', 'style'],
        designerDefinition: {
            component: 'Badge',
            props: {
                children: []
            }
        }
    },
    BottomNavigation: {
        name: 'BottomNavigation',
        displayName: 'Bottom Navigation',
        icon: <BottomNavigationIcon />,
        properties: ['name', 'component', 'showLabels', 'value', 'style'],
        designerDefinition: {
            component: 'BottomNavigation',
            props: {
                children: []
            }
        }
    },
    BottomNavigationAction: {
        name: 'BottomNavigationAction',
        displayName: 'Bottom Navigation Action',
        icon: <BottomNavigationActionIcon />,
        properties: ['name', 'label', 'showLabel', 'value', 'style'],
        designerDefinition: {
            component: 'BottomNavigationAction',
            props: {    // Children not supported by bottom navigation action
            }
        }
    },
    Button: {
        name: 'Button',
        displayName: 'Button',
        icon: <ButtonIcon />,
        properties: ['id', 'name', 'text', 'color', 'component', 'disabled', 'disableFocusRipple', 'disableRipple', 'fullWidth', 'href', 'size', 'variant',
            'style', 'onClick'],
        propertyMetaData: {
            disabled: {
                type: 'boolean'
            }
        },
        designerDefinition: {
            component: 'Button',
            props: {
                children: []
            }
        }
    },
    ButtonBase: {
        name: 'ButtonBase',
        displayName: 'ButtonBase',
        icon: <ButtonIcon />,
        properties: ['name', 'centerRipple', 'component', 'disabled', 'disableRipple', 'disableTouchRipple', 'focusRipple', 'focusVisibleClassName', 'TouchRippleProps',
            'type', 'style'],
        designerDefinition: {
            component: 'ButtonBase',
            props: {
                children: []
            }
        }
    },
    Card: {
        name: 'Card',
        displayName: 'Card',
        icon: <CardIcon />,
        properties: ['name', 'raised', 'style'],
        designerDefinition: {
            component: 'Card',
            props: {
                children: []
            }
        }
    },
    CardActionArea: {
        name: 'CardActionArea',
        displayName: 'CardActionArea',
        icon: <CardActionAreaIcon />,
        properties: ['name', 'style'],
        designerDefinition: {
            component: 'CardActionArea',
            props: {
                children: []
            }
        }
    },
    CardActions: {
        name: 'CardActions',
        displayName: 'CardActions',
        icon: <CardActionsIcon />,
        properties: ['name', 'disableSpacing', 'style'],
        designerDefinition: {
            component: 'CardActions',
            props: {
                children: []
            }
        }
    },
    CardContent: {
        name: 'CardContent',
        displayName: 'CardContent',
        icon: <CardContentIcon />,
        properties: ['name', 'component', 'style'],
        designerDefinition: {
            component: 'CardContent',
            props: {
                children: []
            }
        }
    },
    CardHeader: {
        name: 'CardHeader',
        displayName: 'CardHeader',
        icon: <CardHeaderIcon />,
        properties: ['name', 'component', 'disableTypography', 'title', 'subheader', 'style'],
        designerDefinition: {
            component: 'CardHeader',
            props: {
                children: []
            }
        }
    },
    CardMedia: {
        name: 'CardMedia',
        displayName: 'CardMedia',
        icon: <CardMediaIcon />,
        properties: ['name', 'component', 'image', 'src', 'style'],
        designerDefinition: {
            component: 'CardMedia',
            props: {
                children: []
            }
        }
    },
    Checkbox: {
        name: 'Checkbox',
        displayName: 'Checkbox',
        icon: <CheckboxIcon />,
        properties: ['name', 'checked', 'color', 'disabled', 'disableRipple', 'indeterminate', 'type', 'value', 'style'],
        designerDefinition: {
            component: 'Checkbox',
            props: {
                children: []
            }
        }
    },
    Chip: {
        name: 'Chip',
        displayName: 'Chip',
        icon: <ChipIcon />,
        properties: ['name', 'clickable', 'color', 'component', 'label', 'variant', 'style'],
        designerDefinition: {
            component: 'Chip',
            props: {    // Children not supported by chip
            }
        }
    },
    CircularProgress: {
        name: 'CircularProgress',
        displayName: 'Circular Progress',
        icon: <CircularProgressIcon />,
        properties: ['name', 'color', 'disableShrink', 'size', 'thickness', 'value', 'variant', 'style'],
        designerDefinition: {
            component: 'CircularProgress',
            props: {
                children: []
            }
        }
    },
    // {
    //     name: 'ClickAwayListener',
    //     displayName: 'ClickAwayListener',
    //     icon: <ClickAwayListenerIcon />,
    //     properties: ['name', 'mouseEvent', 'touchEvent'],
    //     designerDefinition: {
    //         component: 'ClickAwayListener',
    //         props: {
    //             children: []
    //         }
    //     }
    // },
    Collapse: {
        name: 'Collapse',
        displayName: 'Collapse',
        icon: <CollapseIcon />,
        properties: ['id', 'name', 'collapsedHeight', 'in', 'timeout'],
        designerDefinition: {
            component: 'Collapse',
            props: {
                children: []
            }
        }
    },
    Dialog: {
        name: 'Dialog',
        displayName: 'Dialog',
        icon: <DialogIcon />,
        properties: ['id', 'name', 'disableBackdropClick', 'disableEscapeKeyDown', 'fullScreen', 'fullWidth', 'maxWidth', 'open', 'scroll', 'transitionDuration', 'style', 'onClose'],
        designerDefinition: {
            component: 'Dialog',
            props: {
                children: []
            }
        }
    },
    DialogActions: {
        name: 'DialogActions',
        displayName: 'DialogActions',
        icon: <DialogActionsIcon />,
        properties: ['name', 'disableSpacing', 'style'],
        designerDefinition: {
            component: 'DialogActions',
            props: {
                children: []
            }
        }
    },
    DialogContent: {
        name: 'DialogContent',
        displayName: 'DialogContent',
        icon: <DialogContentIcon />,
        properties: ['name', 'style'],
        designerDefinition: {
            component: 'DialogContent',
            props: {
                children: []
            }
        }
    },
    DialogContentText: {
        name: 'DialogContentText',
        displayName: 'DialogContentText',
        icon: <DialogContentTextIcon />,
        properties: ['name', 'text', 'style'],
        designerDefinition: {
            component: 'DialogContentText',
            props: {
                children: []
            }
        }
    },
    DialogTitle: {
        name: 'DialogTitle',
        displayName: 'DialogTitle',
        icon: <DialogTitleIcon />,
        properties: ['name', 'text', 'disableTypography','style'],
        designerDefinition: {
            component: 'DialogTitle',
            props: {
                children: []
            }
        }
    },
    Divider: {
        name: 'Divider',
        displayName: 'Divider',
        icon: <DividerIcon />,
        properties: ['name', 'absolute', 'component', 'inset', 'light', 'variant', 'style'],
        designerDefinition: {
            component: 'Divider',
            props: {    // Children not supported by divider
            }
        }
    },
    Drawer: {
        name: 'Drawer',
        displayName: 'Drawer',
        icon: <DrawerIcon />,
        properties: ['id', 'name', 'anchor', 'elevation', 'open', 'transitionDuration', 'variant', 'style', 'onClose'],
        designerDefinition: {
            component: 'Drawer',
            props: {
                children: []
            }
        }
    },
    ExpansionPanel: {
        name: 'ExpansionPanel',
        displayName: 'ExpansionPanel',
        icon: <ExpansionPanelIcon />,
        properties: ['name', 'defaultExpanded', 'disabled', 'expanded', 'style'],
        designerDefinition: {
            component: 'ExpansionPanel',
            props: {
                children: []
            }
        }
    },
    ExpansionPanelActions: {
        name: 'ExpansionPanelActions',
        displayName: 'ExpansionPanelActions',
        icon: <ExpansionPanelIcon />,
        properties: ['name', 'style'],
        designerDefinition: {
            component: 'ExpansionPanelActions',
            props: {
                children: []
            }
        }
    },
    ExpansionPanelDetails: {
        name: 'ExpansionPanelDetails',
        displayName: 'ExpansionPanelDetails',
        icon: <ExpansionPanelIcon />,
        properties: ['name', 'style'],
        designerDefinition: {
            component: 'ExpansionPanelDetails',
            props: {
                children: []
            }
        }
    },
    ExpansionPanelSummary: {
        name: 'ExpansionPanelSummary',
        displayName: 'ExpansionPanelSummary',
        icon: <ExpansionPanelIcon />,
        properties: ['name', 'style'],
        designerDefinition: {
            component: 'ExpansionPanelSummary',
            props: {
                children: []
            }
        }
    },
    Fab: {
        name: 'Fab',
        displayName: 'Fab',
        icon: <FabIcon />,
        properties: ['id', 'name', 'color', 'component', 'disabled', 'disableFocusRipple', 'disableRipple', 'href', 'size', 'variant', 'style', 'onClick'],
        designerDefinition: {
            component: 'Fab',
            props: {
                children: []
            }
        }
    },
    Fade: {
        name: 'Fade',
        displayName: 'Fade',
        icon: <FadeIcon />,
        properties: ['id', 'name', 'in', 'timeout'],
        propertyMetaData: {
            children: {
                required: true
            }
        },
        designerDefinition: {
            component: 'Fade',
            props: {
                children: []
            }
        }
    },
    FilledInput: {
        name: 'FilledInput',
        displayName: 'FilledInput',
        icon: <FilledInputIcon />,
        properties: ['id', 'name', 'autoComplete', 'autoFocus', 'defaultValue', 'disabled', 'disableUnderline', 'error', 'fullWidth', 'inputProps',
            'margin', 'multiline', 'placeholder', 'readOnly', 'required', 'rows', 'rowsMax', 'type', 'value', 'style'],
        designerDefinition: {
            component: 'FilledInput',
            props: {
                children: []
            }
        }
    },
    FormControl: {
        name: 'FormControl',
        displayName: 'FormControl',
        icon: <FormControlIcon />,
        properties: ['name', 'component', 'disabled', 'error', 'fullWidth', 'margin', 'required', 'variant', 'style'],
        designerDefinition: {
            component: 'FormControl',
            props: {
                children: []
            }
        }
    },
    FormControlLabel: {
       name: 'FormControlLabel',
       displayName: 'FormControlLabel',
       icon: <FormControlLabelIcon />,
       properties: ['name', 'checked', 'control', 'disabled', 'label', 'labelPlacement', 'value', 'style'],
       designerDefinition: {
           component: 'FormControlLabel',
           props: {    // Children not supported by form control label
           }
       }
    },
    FormGroup: {
        name: 'FormGroup',
        displayName: 'FormGroup',
        icon: <FormGroupIcon />,
        properties: ['name', 'row', 'style'],
        designerDefinition: {
            component: 'FormGroup',
            props: {
                children: []
            }
        }
    },
    FormHelperText: {
        name: 'FormHelperText',
        displayName: 'FormHelperText',
        icon: <FormHelperTextIcon />,
        properties: ['name', 'component', 'disabled', 'error', 'filled', 'focused', 'margin', 'required', 'variant', 'style'],
        designerDefinition: {
            component: 'FormHelperText',
            props: {
                children: []
            }
        }
    },
    FormLabel: {
        name: 'FormLabel',
        displayName: 'FormLabel',
        icon: <FormLabelIcon />,
        properties: ['name', 'component', 'disabled', 'error', 'filled', 'focused', 'required', 'style'],
        designerDefinition: {
            component: 'FormLabel',
            props: {
                children: []
            }
        }
    },
    Grid: {
        name: 'Grid',
        displayName: 'Grid',
        icon: <GridIcon />,
        properties: ['name', 'container', 'item', 'spacing', 'direction', 'justify', 'alignItems', 'xs', 'sm', 'md', 'lg', 'xl', 'alignContent', 'wrap', 'zeroMinWidth', 'style'],
        designerDefinition: {
            component: 'Grid',
            props: {
                children: []
            }
        }
    },
    GridList: {
        name: 'GridList',
        displayName: 'GridList',
        icon: <GridListIcon />,
        properties: ['name', 'cellHeight', 'cols', 'component', 'spacing', 'style'],
        designerDefinition: {
            component: 'GridList',
            props: {
                children: []
            }
        }
    },
    GridListTile: {
        name: 'GridListTile',
        displayName: 'GridListTile',
        icon: <GridListTileIcon />,
        properties: ['name', 'cols', 'component', 'rows', 'style'],
        designerDefinition: {
            component: 'GridListTile',
            props: {
                children: []
            }
        }
    },
    GridListTileBar: {
        name: 'GridListTileBar',
        displayName: 'GridListTileBar',
        icon: <GridListTileBarIcon />,
        properties: ['name', 'actionPosition', 'subtitle', 'title', 'titlePosition', 'style'],
        designerDefinition: {
            component: 'GridListTileBar',
            props: {
                children: []
            }
        }
    },
    //Grow: {
    //    name: 'Grow',
    //    displayName: 'Grow',
    //    icon: <GrowIcon />,
    //    properties: ['id', 'name', 'in', 'timeout', 'style'],
    //    designerDefinition: {
    //        component: 'Grow',
    //        props: {
    //            children: []
    //        }
    //    }
    //},
    Hidden: {
        name: 'Hidden',
        displayName: 'Hidden',
        icon: <HiddenIcon />,
        properties: ['name', 'implementation', 'initialWidth', 'lgDown', 'lgUp', 'mdDown', 'mdUp', 'only', 'smDown', 'smUp', 'xlDown', 'xlUp', 'xsDown', 'xsUp', 'style'],
        designerDefinition: {
            component: 'Hidden',
            props: {
                children: []
            }
        }
    },
    Icon: {
        name: 'Icon',
        displayName: 'Icon',
        icon: <InfoIcon />,
        properties: ['name', 'text', 'color', 'fontSize', 'style'],
        designerDefinition: {
            component: 'Icon',
            props: {
                children: []
            }
        }
    },
    IconButton: {
        name: 'IconButton',
        displayName: 'IconButton',
        icon: <InfoIcon />,
        properties: ['id', 'name', 'color', 'disabled', 'disableFocusRipple', 'disableRipple', 'edge', 'size', 'style', 'onClick'],
        designerDefinition: {
            component: 'IconButton',
            props: {
                children: []
            }
        }
    },
    Input: {
        name: 'Input',
        displayName: 'Input',
        icon: <InputIcon />,
        properties: ['id', 'name', 'autoComplete', 'autoFocus', 'defaultValue', 'disabled', 'disableUnderline', 'error', 'fullWidth', 'inputComponent', 'inputProps',
            'margin', 'multiline', 'placeholder', 'readOnly', 'required', 'rows', 'rowsMax', 'type', 'value', 'style'],
        designerDefinition: {
            component: 'Input',
            props: {
                children: []
            }
        }
    },
    //{
    //    name: 'InputAdornment',
    //    displayName: 'InputAdornment',
    //    icon: <InputAdornmentIcon />,
    //    properties: ['name', 'disablePointerEvents', 'disableTypography', 'position', 'variant', 'style'],
    //    designerDefinition: {
    //        component: 'InputAdornment',
    //        props: {
    //            children: []
    //        }
    //    }
    //},
    InputBase: {
        name: 'InputBase',
        displayName: 'InputBase',
        icon: <InputBaseIcon />,
        properties: ['name', 'autoComplete', 'autoFocus', 'defaultValue', 'disabled', 'error', 'fullWidth', 'margin', 'multiline',
            'placeholder', 'readOnly', 'required', 'rows', 'rowsMax', 'type', 'value', 'style'],
        designerDefinition: {
            component: 'InputBase',
            props: {
                children: []
            }
        }
    },
    InputLabel: {
        name: 'InputLabel',
        displayName: 'InputLabel',
        icon: <InputLabelIcon />,
        properties: ['name', 'text', 'disableAnimation', 'disabled', 'error', 'focused', 'htmlFor', 'margin', 'required', 'shrink', 'variant', 'style'],
        designerDefinition: {
            component: 'InputLabel',
            props: {
                children: []
            }
        }
    },
    LinearProgress: {
        name: 'LinearProgress',
        displayName: 'LinearProgress',
        icon: <LinearProgressIcon />,
        properties: ['name', 'color', 'value', 'valueBuffer', 'variant', 'style'],
        designerDefinition: {
            component: 'LinearProgress',
            props: {
                children: []
            }
        }
    },
    Link: {
        name: 'Link',
        displayName: 'Link',
        icon: <LinkIcon />,
        properties: ['name', 'block', 'color', 'component', 'TypographyClasses', 'underline', 'variant', 'style'],
        designerDefinition: {
            component: 'Link',
            props: {
                children: []
            }
        }
    },
    List: {
        name: 'List',
        displayName: 'List',
        icon: <ListIcon />,
        properties: ['name', 'component', 'dense', 'disablePadding', 'subheader', 'style'],
        designerDefinition: {
            component: 'List',
            props: {
                children: []
            }
        }
    },
    ListItem: {
        name: 'ListItem',
        displayName: 'ListItem',
        icon: <ListItemIcon />,
        properties: ['name', 'alignItems', 'button', 'component', 'ContainerComponent', 'dense', 'disabled', 'disableGutters', 'divider', 'selected', 'style'],
        designerDefinition: {
            component: 'ListItem',
            props: {
                children: []
            }
        }
    },
    ListItemAvatar: {
        name: 'ListItemAvatar',
        displayName: 'ListItemAvatar',
        icon: <ListItemAvatarIcon />,
        properties: ['name', 'style'],
        propertyMetaData: {
            children: {
                required: true,
                single: true
            }
        },
        designerDefinition: {
            component: 'ListItemAvatar',
            props: {
                children: []
            }
        }
    },
    ListItemIcon: {
        name: 'ListItemIcon',
        displayName: 'ListItemIcon',
        icon: <ListItemIconIcon />,
        properties: ['name', 'style'],
        designerDefinition: {
            component: 'ListItemIcon',
            props: {
                children: []
            }
        }
    },
    ListItemSecondaryAction: {
        name: 'ListItemSecondaryAction',
        displayName: 'ListItemSecondaryAction',
        icon: <ListItemSecondaryActionIcon />,
        properties: ['name', 'style'],
        designerDefinition: {
            component: 'ListItemSecondaryAction',
            props: {
                children: []
            }
        }
    },
    ListItemText: {
        name: 'ListItemText',
        displayName: 'ListItemText',
        icon: <ListItemTextIcon />,
        properties: ['name', 'disableTypography', 'inset', 'primary', 'secondary', 'style'],
        designerDefinition: {
            component: 'ListItemText',
            props: {
                children: []
            }
        }
    },
    ListSubheader: {
        name: 'ListSubheader',
        displayName: 'ListSubheader',
        icon: <ListSubheaderIcon />,
        properties: ['name', 'color', 'component', 'disableGutters', 'disableSticky', 'inset', 'style'],
        designerDefinition: {
            component: 'ListSubheader',
            props: {
                children: []
            }
        }
    },
    Menu: {
        name: 'Menu',
        displayName: 'Menu',
        icon: <MenuIcon />,
        properties: ['id', 'name', 'anchorEl', 'autoFocus', 'disableAutoFocusItem', 'MenuListProps', 'open', 'transitionDuration', 'variant', 'style', 'onClose'],
        designerDefinition: {
            component: 'Menu',
            props: {
                children: []
            }
        }
    },
    MenuItem: {
        name: 'MenuItem',
        displayName: 'MenuItem',
        icon: <MenuItemIcon />,
        properties: ['name', 'text', 'disableGutters', 'value', 'style'],
        designerDefinition: {
            component: 'MenuItem',
            props: {
                children: []
            }
        }
    },
    MenuList: {
        name: 'MenuList',
        displayName: 'MenuList',
        icon: <MenuListIcon />,
        properties: ['name', 'disableListWrap', 'style'],
        designerDefinition: {
            component: 'MenuList',
            props: {
                children: []
            }
        }
    },
    MobileStepper: {
       name: 'MobileStepper',
       displayName: 'MobileStepper',
       icon: <MobileStepperIcon />,
        properties: ['name', 'activeStep', 'position', 'steps', 'variant', 'style'],
       designerDefinition: {
           component: 'MobileStepper',
           props: {
               children: []
           }
       }
    },
    Modal: {
        name: 'Modal',
        displayName: 'Modal',
        icon: <ModalIcon />,
        properties: ['name', 'BackdropProps', 'closeAfterTransition', 'disableAutoFocus', 'disableBackdropClick', 'disableEnforceFocus', 'disableEscapeKeyDown',
            'disablePortal', 'disableRestoreFocus', 'hideBackdrop', 'keepMounted', 'open', 'style'],
        propertyMetaData: {
            children: {
                required: true,
                single: true
            }
        },
        designerDefinition: {
            component: 'Modal',
            props: {
                children: []
            }
        }
    },
    //{
    //    name: 'MuiThemeProvider',
    //    displayName: 'MuiThemeProvider',
    //    icon: <MuiThemeProviderIcon />,
    //    properties: ['name', 'disableStylesGeneration'],
    //    designerDefinition: {
    //        component: 'MuiThemeProvider',
    //        props: {
    //            children: []
    //        }
    //    }
    //},
    NativeSelect: {
        name: 'NativeSelect',
        displayName: 'NativeSelect',
        icon: <NativeSelectIcon />,
        properties: ['name', 'inputProps', 'value', 'variant'],
        designerDefinition: {
            component: 'NativeSelect',
            props: {
                children: []
            }
        }
    },
    OutlinedInput: {
        name: 'OutlinedInput',
        displayName: 'OutlinedInput',
        icon: <OutlinedInputIcon />,
        properties: ['id', 'name', 'autoComplete', 'autoFocus', 'defaultValue', 'disabled', 'error', 'fullWidth', 'inputProps', 'labelWidth', 'margin',
            'multiline', 'notched', 'placeholder', 'readOnly', 'required', 'rows', 'rowsMax', 'type', 'value', 'style'],
        designerDefinition: {
            component: 'OutlinedInput',
            props: {
                children: []
            }
        }
    },
    Paper: {
        name: 'Paper',
        displayName: 'Paper',
        icon: <PaperIcon />,
        properties: ['name', 'component', 'elevation', 'square', 'style'],
        designerDefinition: {
            component: 'Paper',
            props: {
                children: []
            }
        }
    },
    Popover: {
        name: 'Popover',
        displayName: 'Popover',
        icon: <PopoverIcon />,
        properties: ['name', 'anchorOrigin', 'anchorPosition', 'anchorReference', 'elevation', 'marginThreshold', 'open', 'PaperProps', 'transformOrigin',
            'transitionDuration', 'style'],
        designerDefinition: {
            component: 'Popover',
            props: {
                children: []
            }
        }
    },
    Popper: {
        name: 'Popper',
        displayName: 'Popper',
        icon: <PopperIcon />,
        properties: ['name', 'disablePortal', 'keepMounted', 'open', 'placement', 'popperOptions', 'transition', 'style'],
        designerDefinition: {
            component: 'Popper',
            props: {
                children: []
            }
        }
    },
    //Portal: {
    //    name: 'Portal',
    //    displayName: 'Portal',
    //    icon: <PortalIcon />,
    //    properties: ['name', 'disablePortal', 'style'],
    //    designerDefinition: {
    //        component: 'Portal',
    //        props: {
    //            children: []
    //        }
    //    }
    //},
    Radio: {
        name: 'Radio',
        displayName: 'Radio',
        icon: <RadioIcon />,
        properties: ['id', 'name', 'checked', 'color', 'disabled', 'disableRipple', 'inputProps', 'type', 'value', 'style'],
        designerDefinition: {
            component: 'Radio',
            props: {
                children: []
            }
        }
    },
    RadioGroup: {
        name: 'RadioGroup',
        displayName: 'RadioGroup',
        icon: <RadioGroupIcon />,
        properties: ['name', 'defaultValue', 'value', 'style'],
        designerDefinition: {
            component: 'RadioGroup',
            props: {
                children: []
            }
        }
    },
    Select: {
        name: 'Select',
        displayName: 'Select',
        icon: <SelectIcon />,
        properties: ['name', 'autoWidth', 'displayEmpty', 'input', 'inputProps', 'MenuProps', 'multiple', 'native', 'open', 'renderValue',
            'SelectDisplayProps', 'value', 'variant', 'style'],
        designerDefinition: {
            component: 'Select',
            props: {
                children: []
            }
        }
    },
    Slide: {
        name: 'Slide',
        displayName: 'Slide',
        icon: <SlideIcon />,
        properties: ['id', 'name', 'direction', 'in', 'timeout'],
        propertyMetaData: {
            children: {
                required: true
            }
        },
        designerDefinition: {
            component: 'Slide',
            props: {
                children: []
            }
        }
    },
    Snackbar: {
        name: 'Snackbar',
        displayName: 'Snackbar',
        icon: <SnackbarIcon />,
        properties: ['name', 'anchorOrigin', 'autoHideDuration', 'ClickAwayListenerProps', 'ContentProps', 'disableWindowBlurListener', 'message',
            'open', 'resumeHideDuration', 'transitionDuration', 'TransitionProps', 'style'],
        propertyMetaData: {
            children: {
                single: true
            }
        },
        designerDefinition: {
            component: 'Snackbar',
            props: {
                children: []
            }
        }
    },
    SnackbarContent: {
        name: 'SnackbarContent',
        displayName: 'SnackbarContent',
        icon: <SnackbarContentIcon />,
        properties: ['name', 'message', 'style'],
        designerDefinition: {
            component: 'SnackbarContent',
            props: {
                children: []
            }
        }
    },
    Step: {
        name: 'Step',
        displayName: 'Step',
        icon: <StepIcon />,
        properties: ['name', 'active', 'completed', 'disabled', 'style'],
        designerDefinition: {
            component: 'Step',
            props: {
                children: []
            }
        }
    },
    StepButton: {
        name: 'StepButton',
        displayName: 'StepButton',
        icon: <StepButtonIcon />,
        properties: ['name', 'style'],
        designerDefinition: {
            component: 'StepButton',
            props: {
                children: []
            }
        }
    },
    StepConnector: {
        name: 'StepConnector',
        displayName: 'StepConnector',
        icon: <StepConnectorIcon />,
        properties: ['name', 'style'],
        designerDefinition: {
            component: 'StepConnector',
            props: {
                children: []
            }
        }
    },
    StepContent: {
        name: 'StepContent',
        displayName: 'StepContent',
        icon: <StepContentIcon />,
        properties: ['name', 'transitionDuration', 'style'],
        designerDefinition: {
            component: 'StepContent',
            props: {
                children: []
            }
        }
    },
    StepIcon: {
        name: 'StepIcon',
        displayName: 'StepIcon',
        icon: <StepIconIcon />,
        properties: ['name', 'active', 'completed', 'error', 'style'],
        designerDefinition: {
            component: 'StepIcon',
            props: {
                children: []
            }
        }
    },
    StepLabel: {
        name: 'StepLabel',
        displayName: 'StepLabel',
        icon: <StepLabelIcon />,
        properties: ['name', 'disabled', 'error', 'style'],
        designerDefinition: {
            component: 'StepLabel',
            props: {
                children: []
            }
        }
    },
    Stepper: {
        name: 'Stepper',
        displayName: 'Stepper',
        icon: <StepperIcon />,
        properties: ['name', 'activeStep', 'alternativeLabel', 'nonLinear', 'orientation', 'style'],
        designerDefinition: {
            component: 'Stepper',
            props: {
                children: []
            }
        }
    },
    SvgIcon: {
        name: 'SvgIcon',
        displayName: 'SvgIcon',
        icon: <SvgIconIcon />,
        properties: ['name', 'color', 'fontSize', 'htmlColor', 'shapeRendering', 'titleAccess', 'viewBox', 'style'],
        propertyMetaData: {
            children: {
                required: true
            }
        },
        designerDefinition: {
            component: 'SvgIcon',
            props: {
                children: []
            }
        }
    },
    SwipeableDrawer: {
        name: 'SwipeableDrawer',
        displayName: 'SwipeableDrawer',
        icon: <SwipeableDrawerIcon />,
        properties: ['name', 'disableBackdropTransition', 'disableDiscovery', 'disableSwipeToOpen', 'hysteresis', 'minFlingVelocity', 'open',
            'swipeAreaWidth', 'transitionDuration', 'style'],
        designerDefinition: {
            component: 'SwipeableDrawer',
            props: {
                children: []
            }
        }
    },
    Switch: {
        name: 'Switch',
        displayName: 'Switch',
        icon: <SwitchIcon />,
        properties: ['name', 'checked', 'color', 'disabled', 'disableRipple', 'type', 'value', 'style'],
        designerDefinition: {
            component: 'Switch',
            props: {
                children: []
            }
        }
    },
    Tab: {
        name: 'Tab',
        displayName: 'Tab',
        icon: <TabIcon />,
        properties: ['name', 'disabled', 'label', 'value', 'style'],
        designerDefinition: {
            component: 'Tab',
            props: {    // Children not supported by tab
            }
        }
    },
    Table: {
        name: 'Table',
        displayName: 'Table',
        icon: <TableIcon />,
        properties: ['name', 'padding', 'style'],
        designerDefinition: {
            component: 'Table',
            props: {
                children: []
            }
        }
    },
    TableBody: {
        name: 'TableBody',
        displayName: 'TableBody',
        icon: <TableBodyIcon />,
        properties: ['name', 'style'],
        designerDefinition: {
            component: 'TableBody',
            props: {
                children: []
            }
        }
    },
    TableCell: {
        name: 'TableCell',
        displayName: 'TableCell',
        icon: <TableCellIcon />,
        properties: ['name', 'text', 'align', 'size', 'scope', 'sortDirection', 'variant', 'style'],
        designerDefinition: {
            component: 'TableCell',
            props: {
                children: []
            }
        }
    },
    TableFooter: {
        name: 'TableFooter',
        displayName: 'TableFooter',
        icon: <TableFooterIcon />,
        properties: ['name', 'style'],
        designerDefinition: {
            component: 'TableFooter',
            props: {
                children: []
            }
        }
    },
    TableHead: {
        name: 'TableHead',
        displayName: 'TableHead',
        icon: <TableHeadIcon />,
        properties: ['name', 'style'],
        designerDefinition: {
            component: 'TableHead',
            props: {
                children: []
            }
        }
    },
    TablePagination: {
        name: 'TablePagination',
        displayName: 'TablePagination',
        icon: <TablePaginationIcon />,
        properties: ['name', 'component','count', 'page', 'rowsPerPage', 'rowsPerPageOptions', 'style'],
        designerDefinition: {
            component: 'TablePagination',
            props: {
                children: []
            }
        }
    },
    TableRow: {
        name: 'TableRow',
        displayName: 'TableRow',
        icon: <TableRowIcon />,
        properties: ['name', 'hover', 'selected', 'style'],
        designerDefinition: {
            component: 'TableRow',
            props: {
                children: []
            }
        }
    },
    TableSortLabel: {
        name: 'TableSortLabel',
        displayName: 'TableSortLabel',
        icon: <TableSortLabelIcon />,
        properties: ['name', 'active', 'direction', 'hideSortIcon', 'style'],
        designerDefinition: {
            component: 'TableSortLabel',
            props: {
                children: []
            }
        }
    },
    Tabs: {
        name: 'Tabs',
        displayName: 'Tabs',
        icon: <TabsIcon />,
        properties: ['name', 'centered', 'component', 'indicatorColor', 'scrollButtons', 'TabIndicatorProps', 'textColor', 'value', 'variant', 'style'],
        designerDefinition: {
            component: 'Tabs',
            props: {
                children: []
            }
        }
    },
    TextField: {
        name: 'TextField',
        displayName: 'Text Field',
        icon: <TextFieldIcon />,
        properties: ['id', 'name', 'autoComplete', 'autoFocus', 'defaultValue', 'disabled', 'error', 'fullWidth', 'helperText', 'label', 'margin',
            'multiline', 'placeholder', 'required', 'rows', 'rowsMax', 'select', 'type', 'value', 'variant', 'style'],
        designerDefinition: {
            component: 'TextField',
            props: {
                children: []
            }
        }
    },
    Toolbar: {
        name: 'Toolbar',
        displayName: 'Toolbar',
        icon: <TextFieldIcon />,
        properties: ['name', 'variant', 'disableGutters', 'style'],
        designerDefinition: {
            component: 'Toolbar',
            props: {
                children: []
            }
        }
    },
    Tooltip: {
        name: 'Tooltip',
        displayName: 'Tooltip',
        icon: <TooltipIcon />,
        properties: ['name', 'disableFocusListener', 'disableHoverListener', 'disableTouchListener', 'enterDelay', 'enterTouchDelay', 'interactive',
            'leaveDelay', 'leaveTouchDelay', 'open', 'placement', 'PopperProps', 'title', 'TransitionProps', 'style'],
        propertyMetaData: {
            children: {
                required: true,
                single: true
            }
        },
        designerDefinition: {
            component: 'Tooltip',
            props: {
                children: []
            }
        }
    },
    //{
    //    name: 'TouchRipple',
    //    displayName: 'TouchRipple',
    //    icon: <TouchRippleIcon />,
    //    properties: ['name', 'center', 'style'],
    //    designerDefinition: {
    //        component: 'TouchRipple',
    //        props: {
    //            children: []
    //        }
    //    }
    //},
    Typography: {
        name: 'Typography',
        displayName: 'Typography',
        icon: <TypographyIcon />,
        properties: ['name', 'text', 'variant', 'component', 'align', 'color', 'gutterBottom', 'inline', 'internalDeprecatedVariant', 'noWrap', 'paragraph', 'style'],
        designerDefinition: {
            component: 'Typography',
            props: {
                children: []
            }
        }
    },
    Zoom: {
        name: 'Zoom',
        displayName: 'Zoom',
        icon: <ZoomIcon />,
        properties: ['id', 'name', 'in', 'timeout'],
        propertyMetaData: {
            children: {
                required: true
            }
        },
        designerDefinition: {
            component: 'Zoom',
            props: {
                children: []
            }
        }
    },

    // Html components
    div: {
        name: 'div',
        displayName: 'div',
        icon: <HtmlElementIcon />,
        properties: ['id', 'name', 'text', 'style'],
        designerDefinition: {
            component: 'div',
            props: {
                children: []
            }
        }
    },
    img: {
        name: 'img',
        displayName: 'img',
        icon: <HtmlElementIcon />,
        properties: ['name', 'src', 'alt', 'style'],
        designerDefinition: {
            component: 'img',
            props: {
            }
        }
    },
    label: {
        name: 'label',
        displayName: 'label',
        icon: <HtmlElementIcon />,
        properties: ['name', 'text', 'htmlFor', 'style'],
        designerDefinition: {
            component: 'label',
            props: {
                children: []
            }
        }
    },
    span: {
        name: 'span',
        displayName: 'span',
        icon: <HtmlElementIcon />,
        properties: ['id', 'name', 'text', 'style'],
        designerDefinition: {
            component: 'span',
            props: {
                children: []
            }
        }
    },
    option: {
        name: 'option',
        displayName: 'option',
        icon: <HtmlElementIcon />,
        properties: ['name', 'text', 'value', 'style'],
        designerDefinition: {
            component: 'option',
            props: {
                children: []
            }
        }
    },
    path: {
        name: 'path',
        displayName: 'path',
        icon: <HtmlElementIcon />,
        properties: ['name', 'd', 'style'],
        designerDefinition: {
            component: 'path',
            props: {
                children: []
            }
        }
    },

    // 3rd party components
    //{
    //    name: 'Markdown',
    //    displayName: 'Markdown',
    //    icon: <MarkdownIcon />,
    //    properties: ['name', 'source', 'escapeHtml', 'skipHtml', 'sourcePos', 'rawSourcePos', 'includeNodeIndex', 'style'],
    //    designerDefinition: {
    //        component: 'Markdown',
    //        props: {
    //        }
    //    }
    //},
    DataTable: {
        name: 'DataTable',
        displayName: 'DataTable',
        icon: <TableIcon />,
        properties: ['name', 'title', 'columns', 'data', 'options', 'style'],
        designerDefinition: {
            component: 'DataTable',
            props: {
            }
        }
    }
};

import React from 'react';
// Action icons
import {
    ThreeDRotation, Accessibility, AccessibilityNew, Accessible, AccessibleForward, AccountBalance, AccountBalanceWallet, AccountBox, AccountCircle, AddShoppingCart,
    Alarm, AlarmAdd, AlarmOff, AlarmOn, AllInbox, AllOut, Android, Announcement, ArrowRightAlt, AspectRatio, Assessment, Assignment, AssignmentInd, AssignmentLate,
    AssignmentReturn, AssignmentReturned, AssignmentTurnedIn, Autorenew, Backup, Book, Bookmark, BookmarkBorder, Bookmarks, BugReport, Build, Cached, CalendarToday,
    Delete, Home, Search, ChangeHistory, CheckCircle, Code, Commute, CompareArrows, ContactSupport, Copyright, CreditCard, Dashboard, DateRange, Description, Done
} from '@material-ui/icons';
import {
    Add, AddAlert, CloudUpload, Drafts, Edit, Error, ErrorOutline, Inbox, KeyboardVoice, Mail, Menu, NotificationImportant,
    Save, Send, Warning
} from '@material-ui/icons';

// Communication icons
import{
    AlternateEmail, Business, Call, CallEnd, CallMade, CallMerge, CallMissed, CallMissedOutgoing, CallReceived, CallSplit, CancelPresentation, CellWifi, Chat, ChatBubble, ChatBubbleOutline, 
    ClearAll, Comment, ContactMail, ContactPhone, Contacts, DesktopAccessDisabled, DialerSip, Dialpad, DomainDisabled, Duo, Email, Forum, ImportContacts, ImportExport, InvertColors, ListAlt, LiveHelp,
    LocationOff, LocationOn, MailOutline, Message, MobileScreenShare, NoSim, PausePresentation, PersonAddDisabled, Phone, PhonelinkErase, PhonelinkLock, PhonelinkRing, PhonelinkSetup, PortableWifiOff,
    PresentToAll, PrintDisabled, RingVolume, RssFeed, ScreenShare, SentimentSatisfiedAlt, SpeakerPhone, StayCurrentLandscape, StayCurrentPortrait, StayPrimaryLandscape, StayPrimaryPortrait, StopScreenShare,
    SwapCalls, Textsms, Unsubscribe, Voicemail, VpnKey

} from '@material-ui/icons';

//Maps Icons
import{
    ThreeSixty, AddLocation, Atm, Beenhere, Category, CompassCalibration, DepartureBoard, Directions, DirectionsBike, DirectionsBoat, DirectionsBus, DirectionsCar, DirectionsRailway, DirectionsRun,
    DirectionsSubway, DirectionsTransit, DirectionsWalk, EditAttributes, EditLocation, EvStation, Fastfood, Flight, Hotel, Layers, LayersClear, LocalActivity, LocalAirport, LocalAtm, LocalBar, LocalCafe, LocalCarWash,
    LocalConvenienceStore, LocalDining, LocalDrink, LocalFlorist, LocalGasStation, LocalGroceryStore, LocalHospital, LocalHotel, LocalLaundryService, LocalLibrary, LocalMall, LocalMovies, LocalOffer, LocalParking,
    LocalPharmacy, LocalPhone, LocalPizza, LocalPlay, LocalPostOffice, LocalPrintshop, LocalSee, LocalShipping, LocalTaxi, Map, Money, MyLocation, Navigation, NearMe, NotListedLocation, PersonPin, PersonPinCircle,
    PinDrop, Place, RateReview, Restaurant, RestaurantMenu, Satellite, StoreMallDirectory, Streetview, Subway, Terrain, Traffic, Train, Tram, TransferWithinAStation, TransitEnterexit, TripOrigin, ZoomOutMap
 } from '@material-ui/icons';

// Navigation icons
import{
   Apps, ArrowBack, ArrowBackIos, ArrowDownward, ArrowDropDown, ArrowDropDownCircle, ArrowDropUp, ArrowForward, ArrowForwardIos, ArrowLeft, ArrowRight, ArrowUpward, Cancel, Check, ChevronLeft, ChevronRight, 
   Close, ExpandLess, ExpandMore, FirstPage, Fullscreen, FullscreenExit, LastPage, MoreHoriz, MoreVert, Refresh, SubdirectoryArrowLeft, SubdirectoryArrowRight, UnfoldLess, UnfoldMore
} from '@material-ui/icons';

// Social icons
import{
    Cake, Domain, Group, GroupAdd, LocationCity, Mood, MoodBad, Notifications, NotificationsActive, NotificationsNone, NotificationsOff, NotificationsPaused, Pages, PartyMode, People, PeopleOutline, Person, 
    PersonAdd, PersonOutline, PlusOne, Poll, Public, School, SentimentDissatisfied, SentimentSatisfied, SentimentVeryDissatisfied, SentimentVerySatisfied, Share, ThumbDownAlt, ThumbUpAlt, Whatshot
 } from '@material-ui/icons';

import { ContentCut, ContentCopy, ContentPaste, ContentSave, Pencil, Redo } from 'muicons/dist';

export const materialIcons = {
    // Material icons - Action
    ThreeDRotation: {
        name: 'ThreeDRotation',
        displayName: '3D Rotation',
        category: 'Action',
        icon: <ThreeDRotation />,
        properties: [],
        designerDefinition: {
            component: 'ThreeDRotation',
            props: {
            }
        }
    },
    Accessibility: {
        name: 'Accessibility',
        displayName: 'Accessibility',
        category: 'Action',
        icon: <Accessibility />,
        properties: [],
        designerDefinition: {
            component: 'Accessibility',
            props: {
            }
        }
    },
    AccessibilityNew: {
        name: 'AccessibilityNew',
        displayName: 'Accessibility New',
        category: 'Action',
        icon: <AccessibilityNew />,
        properties: [],
        designerDefinition: {
            component: 'AccessibilityNew',
            props: {
            }
        }
    },
    Accessible: {
        name: 'Accessible',
        displayName: 'Accessible',
        category: 'Action',
        icon: <Accessible />,
        properties: [],
        designerDefinition: {
            component: 'Accessible',
            props: {
            }
        }
    },
    AccessibleForward: {
        name: 'AccessibleForward',
        displayName: 'Accessible Forward',
        category: 'Action',
        icon: <AccessibleForward />,
        properties: [],
        designerDefinition: {
            component: 'AccessibleForward',
            props: {
            }
        }
    },
    AccountBalance: {
        name: 'AccountBalance',
        displayName: 'Account Balance',
        category: 'Action',
        icon: <AccountBalance />,
        properties: [],
        designerDefinition: {
            component: 'AccountBalance',
            props: {
            }
        }
    },
    AccountBalanceWallet: {
        name: 'AccountBalanceWallet',
        displayName: 'Account Balance Wallet',
        category: 'Action',
        icon: <AccountBalanceWallet />,
        properties: [],
        designerDefinition: {
            component: 'AccountBalanceWallet',
            props: {
            }
        }
    },
    AccountBox: {
        name: 'AccountBox',
        displayName: 'Account Box',
        category: 'Action',
        icon: <AccountBox />,
        properties: [],
        designerDefinition: {
            component: 'AccountBox',
            props: {
            }
        }
    },
    AccountCircle: {
        name: 'AccountCircle',
        displayName: 'Account Circle',
        category: 'Action',
        icon: <AccountCircle />,
        properties: [],
        designerDefinition: {
            component: 'AccountCircle',
            props: {
            }
        }
    },
    AddShoppingCart: {
        name: 'AddShoppingCart',
        displayName: 'Add Shopping Cart',
        category: 'Action',
        icon: <AddShoppingCart />,
        properties: [],
        designerDefinition: {
            component: 'AddShoppingCart',
            props: {
            }
        }
    },
    Alarm: {
        name: 'Alarm',
        displayName: 'Alarm',
        category: 'Action',
        icon: <Alarm />,
        properties: [],
        designerDefinition: {
            component: 'Alarm',
            props: {
            }
        }
    },
    AlarmAdd: {
        name: 'AlarmAdd',
        displayName: 'Alarm Add',
        category: 'Action',
        icon: <AlarmAdd />,
        properties: [],
        designerDefinition: {
            component: 'AlarmAdd',
            props: {
            }
        }
    },
    AllInbox: {
        name: 'AllInbox',
        displayName: 'AllInbox',
        category: 'Action',
        icon: <AllInbox />,
        properties: [],
        designerDefinition: {
            component: 'AllInbox',
            props: {
            }
        }
    },
    Announcement: {
        name: 'Announcement',
        displayName: 'Announcement',
        category: 'Action',
        icon: <Announcement />,
        properties: [],
        designerDefinition: {
            component: 'Announcement',
            props: {
            }
        }
    },
    ArrowRight: {
        name: 'ArrowRight',
        displayName: 'ArrowRight',
        category: 'Action',
        icon: <ArrowRight />,
        properties: [],
        designerDefinition: {
            component: 'ArrowRight',
            props: {
            }
        }
    },
    Assessment: {
        name: 'Assessment',
        displayName: 'Assessment',
        category: 'Action',
        icon: <Assessment />,
        properties: [],
        designerDefinition: {
            component: 'Assessment',
            props: {
            }
        }
    },
    Assignment: {
        name: 'Assignment',
        displayName: 'Assignment',
        category: 'Action',
        icon: <Assignment />,
        properties: [],
        designerDefinition: {
            component: 'Assignment',
            props: {
            }
        }
    },
    Autorenew: {
        name: 'Autorenew',
        displayName: 'Autorenew',
        category: 'Action',
        icon: <Autorenew />,
        properties: [],
        designerDefinition: {
            component: 'Autorenew',
            props: {
            }
        }
    },
    Backup: {
        name: 'Backup',
        displayName: 'Backup',
        category: 'Action',
        icon: <Backup />,
        properties: [],
        designerDefinition: {
            component: 'Backup',
            props: {
            }
        }
    },
    Book: {
        name: 'Book',
        displayName: 'Book',
        category: 'Action',
        icon: <Book />,
        properties: [],
        designerDefinition: {
            component: 'Book',
            props: {
            }
        }
    },
    Bookmark: {
        name: 'Bookmark',
        displayName: 'Bookmark',
        category: 'Action',
        icon: <Bookmark />,
        properties: [],
        designerDefinition: {
            component: 'Bookmark',
            props: {
            }
        }
    },
    Bookmarks: {
        name: 'Bookmarks',
        displayName: 'Bookmarks',
        category: 'Action',
        icon: <Bookmarks />,
        properties: [],
        designerDefinition: {
            component: 'Bookmarks',
            props: {
            }
        }
    },
    BugReport: {
        name: 'BugReport',
        displayName: 'BugReport',
        category: 'Action',
        icon: <BugReport />,
        properties: [],
        designerDefinition: {
            component: 'BugReport',
            props: {
            }
        }
    },
    Build: {
        name: 'Build',
        displayName: 'Build',
        category: 'Action',
        icon: <Build />,
        properties: [],
        designerDefinition: {
            component: 'Build',
            props: {
            }
        }
    },
    Cached: {
        name: 'Cached',
        displayName: 'Cached',
        category: 'Action',
        icon: <Cached />,
        properties: [],
        designerDefinition: {
            component: 'Cached',
            props: {
            }
        }
    },
    CalendarToday: {
        name: 'CalendarToday',
        displayName: 'CalendarToday',
        category: 'Action',
        icon: <CalendarToday />,
        properties: [],
        designerDefinition: {
            component: 'CalendarToday',
            props: {
            }
        }
    },
    ChangeHistory: {
        name: 'ChangeHistory',
        displayName: 'ChangeHistory',
        category: 'Action',
        icon: <ChangeHistory />,
        properties: [],
        designerDefinition: {
            component: 'ChangeHistory',
            props: {
            }
        }
    },
    CheckCircle: {
        name: 'CheckCircle',
        displayName: 'CheckCircle',
        category: 'Action',
        icon: <CheckCircle />,
        properties: [],
        designerDefinition: {
            component: 'CheckCircle',
            props: {
            }
        }
    },
    Code: {
        name: 'Code',
        displayName: 'Code',
        category: 'Action',
        icon: <Code />,
        properties: [],
        designerDefinition: {
            component: 'Code',
            props: {
            }
        }
    },
    Commute: {
        name: 'Commute',
        displayName: 'Commute',
        category: 'Action',
        icon: <Commute />,
        properties: [],
        designerDefinition: {
            component: 'Commute',
            props: {
            }
        }
    },
    CompareArrows: {
        name: 'CompareArrows',
        displayName: 'CompareArrows',
        category: 'Action',
        icon: <CompareArrows />,
        properties: [],
        designerDefinition: {
            component: 'CompareArrows',
            props: {
            }
        }
    },
    ContactSupport: {
        name: 'ContactSupport',
        displayName: 'ContactSupport',
        category: 'Action',
        icon: <ContactSupport />,
        properties: [],
        designerDefinition: {
            component: 'ContactSupport',
            props: {
            }
        }
    },
    Copyright: {
        name: 'Copyright',
        displayName: 'Copyright',
        category: 'Action',
        icon: <Copyright />,
        properties: [],
        designerDefinition: {
            component: 'Copyright',
            props: {
            }
        }
    },
    Dashboard: {
        name: 'Dashboard',
        displayName: 'Dashboard',
        category: 'Action',
        icon: <Dashboard />,
        properties: [],
        designerDefinition: {
            component: 'Dashboard',
            props: {
            }
        }
    },
    DateRange: {
        name: 'DateRange',
        displayName: 'DateRange',
        category: 'Action',
        icon: <DateRange />,
        properties: [],
        designerDefinition: {
            component: 'DateRange',
            props: {
            }
        }
    },
    Description: {
        name: 'Description',
        displayName: 'Description',
        category: 'Action',
        icon: <Description />,
        properties: [],
        designerDefinition: {
            component: 'Description',
            props: {
            }
        }
    },
    Done: {
        name: 'Done',
        displayName: 'Done',
        category: 'Action',
        icon: <Done />,
        properties: [],
        designerDefinition: {
            component: 'Done',
            props: {
            }
        }
    },
    CreditCard: {
        name: 'CreditCard',
        displayName: 'CreditCard',
        category: 'Action',
        icon: <CreditCard />,
        properties: [],
        designerDefinition: {
            component: 'CreditCard',
            props: {
            }
        }
    },
    AlarmOff: {
        name: 'AlarmOff',
        displayName: 'Alarm Off',
        category: 'Action',
        icon: <AlarmOff />,
        properties: [],
        designerDefinition: {
            component: 'AlarmOff',
            props: {
            }
        }
    },
    AlarmOn: {
        name: 'AlarmOn',
        displayName: 'Alarm On',
        category: 'Action',
        icon: <AlarmOn />,
        properties: [],
        designerDefinition: {
            component: 'AlarmOn',
            props: {
            }
        }
    },
    AllOut: {
        name: 'AllOut',
        displayName: 'All Out',
        category: 'Action',
        icon: <AllOut />,
        properties: [],
        designerDefinition: {
            component: 'AllOut',
            props: {
            }
        }
    },
    Android: {
        name: 'Android',
        displayName: 'Android',
        category: 'Action',
        icon: <Android />,
        properties: [],
        designerDefinition: {
            component: 'Android',
            props: {
            }
        }
    },
    ArrowRightAlt: {
        name: 'ArrowRightAlt',
        displayName: 'Arrow Right Alt',
        category: 'Action',
        icon: <ArrowRightAlt />,
        properties: [],
        designerDefinition: {
            component: 'ArrowRightAlt',
            props: {
            }
        }
    },
    AspectRatio: {
        name: 'AspectRatio',
        displayName: 'Aspect Ratio',
        category: 'Action',
        icon: <AspectRatio />,
        properties: [],
        designerDefinition: {
            component: 'AspectRatio',
            props: {
            }
        }
    },
    AssignmentInd: {
        name: 'AssignmentInd',
        displayName: 'Assignment Ind',
        category: 'Action',
        icon: <AssignmentInd />,
        properties: [],
        designerDefinition: {
            component: 'AssignmentInd',
            props: {
            }
        }
    },
    AssignmentLate: {
        name: 'AssignmentLate',
        displayName: 'Assignment Late',
        category: 'Action',
        icon: <AssignmentLate />,
        properties: [],
        designerDefinition: {
            component: 'AssignmentLate',
            props: {
            }
        }
    },
    AssignmentReturn: {
        name: 'AssignmentReturn',
        displayName: 'Assignment Return',
        category: 'Action',
        icon: <AssignmentReturn />,
        properties: [],
        designerDefinition: {
            component: 'AssignmentReturn',
            props: {
            }
        }
    },
    AssignmentReturned: {
        name: 'AssignmentReturned',
        displayName: 'Assignment Returned',
        category: 'Action',
        icon: <AssignmentReturned />,
        properties: [],
        designerDefinition: {
            component: 'AssignmentReturned',
            props: {
            }
        }
    },
    AssignmentTurnedIn: {
        name: 'AssignmentTurnedIn',
        displayName: 'Assignment Turned In',
        category: 'Action',
        icon: <AssignmentTurnedIn />,
        properties: [],
        designerDefinition: {
            component: 'AssignmentTurnedIn',
            props: {
            }
        }
    },
    BookmarkBorder: {
        name: 'BookmarkBorder',
        displayName: 'Bookmark Border',
        category: 'Action',
        icon: <BookmarkBorder />,
        properties: [],
        designerDefinition: {
            component: 'BookmarkBorder',
            props: {
            }
        }
    },
    Delete: {
        name: 'Delete',
        displayName: 'Delete',
        category: 'Action',
        icon: <Delete />,
        properties: [],
        designerDefinition: {
            component: 'Delete',
            props: {
            }
        }
    },
    Home: {
        name: 'Home',
        displayName: 'Home',
        category: 'Home Automation',
        icon: <Home />,
        properties: [],
        designerDefinition: {
            component: 'Home',
            props: {
            }
        }
    },
    Search: {
        name: 'Search',
        displayName: 'Search',
        category: 'Action',
        icon: <Search />,
        properties: [],
        designerDefinition: {
            component: 'Search',
            props: {
            }
        }
    },
    Save: {
        name: 'Save',
        displayName: 'Save',
        category: 'Content',
        icon: <Save />,
        properties: [],
        designerDefinition: {
            component: 'Save',
            props: {
            }
        }
    },
    Send: {
        name: 'Send',
        displayName: 'Send',
        category: 'Content',
        icon: <Send />,
        properties: [],
        designerDefinition: {
            component: 'Send',
            props: {
            }
        }
    },
    Warning: {
        name: 'Warning',
        displayName: 'Warning',
        category: 'Alert',
        icon: <Warning />,
        properties: [],
        designerDefinition: {
            component: 'Warning',
            props: {
            }
        }
    },

    // Material icons - Other
    Add: {
        name: 'Add',
        displayName: 'Add',
        category: 'Content',
        icon: <Add />,
        properties: [],
        designerDefinition: {
            component: 'Add',
            props: {
            }
        }
    },
    AddAlert: {
        name: 'AddAlert',
        displayName: 'Add Alert',
        category: 'Alert',
        icon: <AddAlert />,
        properties: [],
        designerDefinition: {
            component: 'AddAlert',
            props: {
            }
        }
    },
    CloudUpload: {
        name: 'CloudUpload',
        displayName: 'Cloud Upload',
        category: 'File',
        icon: <CloudUpload />,
        properties: [],
        designerDefinition: {
            component: 'CloudUpload',
            props: {
            }
        }
    },
    Drafts: {
        name: 'Drafts',
        displayName: 'Drafts',
        category: 'Content',
        icon: <Drafts />,
        properties: [],
        designerDefinition: {
            component: 'Drafts',
            props: {
            }
        }
    },
    Edit: {
        name: 'Edit',
        displayName: 'Edit',
        category: 'Image',
        icon: <Edit />,
        properties: [],
        designerDefinition: {
            component: 'Edit',
            props: {
            }
        }
    },
    Error: {
        name: 'Error',
        displayName: 'Error',
        category: 'Alert',
        icon: <Error />,
        properties: [],
        designerDefinition: {
            component: 'Error',
            props: {
            }
        }
    },
    ErrorOutline: {
        name: 'ErrorOutline',
        displayName: 'Error Outline',
        category: 'Alert',
        icon: <ErrorOutline />,
        properties: [],
        designerDefinition: {
            component: 'ErrorOutline',
            props: {
            }
        }
    },
    Inbox: {
        name: 'Inbox',
        displayName: 'Inbox',
        category: 'Content',
        icon: <Inbox />,
        properties: [],
        designerDefinition: {
            component: 'Inbox',
            props: {
            }
        }
    },
    KeyboardVoice: {
        name: 'KeyboardVoice',
        displayName: 'Keyboard Voice',
        category: 'Hardware',
        icon: <KeyboardVoice />,
        properties: [],
        designerDefinition: {
            component: 'KeyboardVoice',
            props: {
            }
        }
    },
    Mail: {
        name: 'Mail',
        displayName: 'Mail',
        category: 'Content',
        icon: <Mail />,
        properties: [],
        designerDefinition: {
            component: 'Mail',
            props: {
            }
        }
    },
    MenuIcon: {
        name: 'MenuIcon',
        displayName: 'Menu',
        category: 'Navigatioin',
        icon: <Menu />,
        properties: [],
        designerDefinition: {
            component: 'MenuIcon',
            props: {
            }
        }
    },
    NotificationImportant: {
        name: 'NotificationImportant',
        displayName: 'Notification Important',
        category: 'Alert',
        icon: <NotificationImportant />,
        properties: [],
        designerDefinition: {
            component: 'NotificationImportant',
            props: {
            }
        }
    },

    // MU Icons
    ContentCut: {
        name: 'ContentCut',
        displayName: 'Content Cut',
        category: 'Editing & Formatting',
        icon: <ContentCut />,
        properties: [],
        designerDefinition: {
            component: 'ContentCut',
            props: {
            }
        }
    },
    ContentCopy: {
        name: 'ContentCopy',
        displayName: 'Content Copy',
        category: 'Editing & Formatting',
        icon: <ContentCopy />,
        properties: [],
        designerDefinition: {
            component: 'ContentCopy',
            props: {
            }
        }
    },
    ContentPaste: {
        name: 'ContentPaste',
        displayName: 'Content Paste',
        category: 'Editing & Formatting',
        icon: <ContentPaste />,
        properties: [],
        designerDefinition: {
            component: 'ContentPaste',
            props: {
            }
        }
    },
    ContentSave: {
        name: 'ContentSave',
        displayName: 'Content Save',
        category: 'Editing & Formatting',
        icon: <ContentSave />,
        properties: [],
        designerDefinition: {
            component: 'ContentSave',
            props: {
            }
        }
    },
    Pencil: {
        name: 'Pencil',
        displayName: 'Pencil',
        category: 'Editing & Formatting',
        icon: <Pencil />,
        properties: [],
        designerDefinition: {
            component: 'Pencil',
            props: {
            }
        }
    },
    Redo: {
        name: 'Redo',
        displayName: 'Redo',
        category: 'Editing & Formatting',
        icon: <Redo />,
        properties: [],
        designerDefinition: {
            component: 'Redo',
            props: {
            }
        }
    },

    // Communication icons   
    AlternateEmail: {
        name: 'AlternateEmail',
        displayName: 'Alternate Email',
        category: 'Communication',
        icon: <AlternateEmail />,
        properties: [],
        designerDefinition: {
            component: 'AlternateEmail',
            props: {
            }
        }
    },
    Business: {
        name: 'Business',
        displayName: 'Business',
        category: 'Communication',
        icon: <Business />,
        properties: [],
        designerDefinition: {
            component: 'Business',
            props: {
            }
        }
    },
    Call: {
        name: 'Call',
        displayName: 'Call',
        category: 'Communication',
        icon: <Call />,
        properties: [],
        designerDefinition: {
            component: 'Call',
            props: {
            }
        }
    },
    CallEnd: {
        name: 'CallEnd',
        displayName: 'Call End',
        category: 'Communication',
        icon: <CallEnd />,
        properties: [],
        designerDefinition: {
            component: 'CallEnd',
            props: {
            }
        }
    },
    CallMade: {
        name: 'CallMade',
        displayName: 'Call Made',
        category: 'Communication',
        icon: <CallMade />,
        properties: [],
        designerDefinition: {
            component: 'CallMade',
            props: {
            }
        }
    },
    CallMerge: {
        name: 'CallMerge',
        displayName: 'Call Merge',
        category: 'Communication',
        icon: <CallMerge />,
        properties: [],
        designerDefinition: {
            component: 'CallMerge',
            props: {
            }
        }
    },
    CallMissed: {
        name: 'CallMissed',
        displayName: 'Call Missed',
        category: 'Communication',
        icon: <CallMissed />,
        properties: [],
        designerDefinition: {
            component: 'CallMissed',
            props: {
            }
        }
    },
    CallMissedOutgoing: {
        name: 'CallMissedOutgoing',
        displayName: 'Call Missed Outgoing',
        category: 'Communication',
        icon: <CallMissedOutgoing />,
        properties: [],
        designerDefinition: {
            component: 'CallMissedOutgoing',
            props: {
            }
        }
    },
    CallReceived: {
        name: 'CallReceived',
        displayName: 'Call Received',
        category: 'Communication',
        icon: <CallReceived />,
        properties: [],
        designerDefinition: {
            component: 'CallReceived',
            props: {
            }
        }
    },
    CallSplit: {
        name: 'CallSplit',
        displayName: 'Call Split',
        category: 'Communication',
        icon: <CallSplit />,
        properties: [],
        designerDefinition: {
            component: 'CallSplit',
            props: {
            }
        }
    },
    CancelPresentation: {
        name: 'CancelPresentation',
        displayName: 'Cancel Presentation',
        category: 'Communication',
        icon: <CancelPresentation />,
        properties: [],
        designerDefinition: {
            component: 'CancelPresentation',
            props: {
            }
        }
    },
    CellWifi: {
        name: 'CellWifi',
        displayName: 'Cell Wifi',
        category: 'Communication',
        icon: <CellWifi />,
        properties: [],
        designerDefinition: {
            component: 'CellWifi',
            props: {
            }
        }
    },
    Chat: {
        name: 'Chat',
        displayName: 'Chat',
        category: 'Communication',
        icon: <Chat />,
        properties: [],
        designerDefinition: {
            component: 'Chat',
            props: {
            }
        }
    },
    ChatBubble: {
        name: 'ChatBubble',
        displayName: 'Chat Bubble',
        category: 'Communication',
        icon: <ChatBubble />,
        properties: [],
        designerDefinition: {
            component: 'ChatBubble',
            props: {
            }
        }
    },
    ChatBubbleOutline: {
        name: 'ChatBubbleOutline',
        displayName: 'Chat Bubble Outline',
        category: 'Communication',
        icon: <ChatBubbleOutline />,
        properties: [],
        designerDefinition: {
            component: 'ChatBubbleOutline',
            props: {
            }
        }
    },
    ClearAll: {
        name: 'ClearAll',
        displayName: 'Clear All',
        category: 'Communication',
        icon: <ClearAll />,
        properties: [],
        designerDefinition: {
            component: 'ClearAll',
            props: {
            }
        }
    },
    Comment: {
        name: 'Comment',
        displayName: 'Comment',
        category: 'Communication',
        icon: <Comment />,
        properties: [],
        designerDefinition: {
            component: 'Comment',
            props: {
            }
        }
    },
    ContactMail: {
        name: 'ContactMail',
        displayName: 'Contact Mail',
        category: 'Communication',
        icon: <ContactMail />,
        properties: [],
        designerDefinition: {
            component: 'ContactMail',
            props: {
            }
        }
    },
    ContactPhone: {
        name: 'ContactPhone',
        displayName: 'Contact Phone',
        category: 'Communication',
        icon: <ContactPhone />,
        properties: [],
        designerDefinition: {
            component: 'ContactPhone',
            props: {
            }
        }
    },
    Contacts: {
        name: 'Contacts',
        displayName: 'Contacts',
        category: 'Communication',
        icon: <Contacts />,
        properties: [],
        designerDefinition: {
            component: 'Contacts',
            props: {
            }
        }
    },
    DesktopAccessDisabled: {
        name: 'DesktopAccessDisabled',
        displayName: 'Desktop Access Disabled',
        category: 'Communication',
        icon: <DesktopAccessDisabled />,
        properties: [],
        designerDefinition: {
            component: 'DesktopAccessDisabled',
            props: {
            }
        }
    },
    DialerSip: {
        name: 'DialerSip',
        displayName: 'Dialer Sip',
        category: 'Communication',
        icon: <DialerSip />,
        properties: [],
        designerDefinition: {
            component: 'DialerSip',
            props: {
            }
        }
    },
    Dialpad: {
        name: 'Dialpad',
        displayName: 'Dialpad',
        category: 'Communication',
        icon: <Dialpad />,
        properties: [],
        designerDefinition: {
            component: 'Dialpad',
            props: {
            }
        }
    },
    DomainDisabled: {
        name: 'DomainDisabled',
        displayName: 'Domain Disabled',
        category: 'Communication',
        icon: <DomainDisabled />,
        properties: [],
        designerDefinition: {
            component: 'DomainDisabled',
            props: {
            }
        }
    },
    Duo: {
        name: 'Duo',
        displayName: 'Duo',
        category: 'Communication',
        icon: <Duo />,
        properties: [],
        designerDefinition: {
            component: 'Duo',
            props: {
            }
        }
    },
    Email: {
        name: 'Email',
        displayName: 'Email',
        category: 'Communication',
        icon: <Email />,
        properties: [],
        designerDefinition: {
            component: 'Email',
            props: {
            }
        }
    },
    Forum: {
        name: 'Forum',
        displayName: 'Forum',
        category: 'Communication',
        icon: <Forum />,
        properties: [],
        designerDefinition: {
            component: 'Forum',
            props: {
            }
        }
    },
    ImportContacts: {
        name: 'ImportContacts',
        displayName: 'Import Contacts',
        category: 'Communication',
        icon: <ImportContacts />,
        properties: [],
        designerDefinition: {
            component: 'ImportContacts',
            props: {
            }
        }
    },
    ImportExport: {
        name: 'ImportExport',
        displayName: 'Import Export',
        category: 'Communication',
        icon: <ImportExport />,
        properties: [],
        designerDefinition: {
            component: 'ImportExport',
            props: {
            }
        }
    },
    InvertColors: {
        name: 'InvertColors',
        displayName: 'Invert Colors',
        category: 'Communication',
        icon: <InvertColors />,
        properties: [],
        designerDefinition: {
            component: 'InvertColors',
            props: {
            }
        }
    },
    ListAlt: {
        name: 'ListAlt',
        displayName: 'List Alt',
        category: 'Communication',
        icon: <ListAlt />,
        properties: [],
        designerDefinition: {
            component: 'ListAlt',
            props: {
            }
        }
    },
    LiveHelp: {
        name: 'LiveHelp',
        displayName: 'Live Help',
        category: 'Communication',
        icon: <LiveHelp />,
        properties: [],
        designerDefinition: {
            component: 'LiveHelp',
            props: {
            }
        }
    },
    LocationOff: {
        name: 'LocationOff',
        displayName: 'Location Off',
        category: 'Communication',
        icon: <LocationOff />,
        properties: [],
        designerDefinition: {
            component: 'LocationOff',
            props: {
            }
        }
    },
    LocationOn: {
        name: 'LocationOn',
        displayName: 'Location On',
        category: 'Communication',
        icon: <LocationOn />,
        properties: [],
        designerDefinition: {
            component: 'LocationOn',
            props: {
            }
        }
    },
    MailOutline: {
        name: 'MailOutline',
        displayName: 'Mail Outline',
        category: 'Communication',
        icon: <MailOutline />,
        properties: [],
        designerDefinition: {
            component: 'MailOutline',
            props: {
            }
        }
    },
    Message: {
        name: 'Message',
        displayName: 'Message',
        category: 'Communication',
        icon: <Message />,
        properties: [],
        designerDefinition: {
            component: 'Message',
            props: {
            }
        }
    },
    MobileScreenShare: {
        name: 'MobileScreenShare',
        displayName: 'Mobile Screen Share',
        category: 'Communication',
        icon: <MobileScreenShare />,
        properties: [],
        designerDefinition: {
            component: 'MobileScreenShare',
            props: {
            }
        }
    },
    NoSim: {
        name: 'NoSim',
        displayName: 'No Sim',
        category: 'Communication',
        icon: <NoSim />,
        properties: [],
        designerDefinition: {
            component: 'NoSim',
            props: {
            }
        }
    },
    PausePresentation: {
        name: 'PausePresentation',
        displayName: 'Pause Presentation',
        category: 'Communication',
        icon: <PausePresentation />,
        properties: [],
        designerDefinition: {
            component: 'PausePresentation',
            props: {
            }
        }
    },
    PersonAddDisabled: {
        name: 'PersonAddDisabled',
        displayName: 'Person Add Disabled',
        category: 'Communication',
        icon: <PersonAddDisabled />,
        properties: [],
        designerDefinition: {
            component: 'PersonAddDisabled',
            props: {
            }
        }
    },
    Phone: {
        name: 'Phone',
        displayName: 'Phone',
        category: 'Communication',
        icon: <Phone />,
        properties: [],
        designerDefinition: {
            component: 'Phone',
            props: {
            }
        }
    },
    PhonelinkErase: {
        name: 'PhonelinkErase',
        displayName: 'Phonelink Erase',
        category: 'Communication',
        icon: <PhonelinkErase />,
        properties: [],
        designerDefinition: {
            component: 'PhonelinkErase',
            props: {
            }
        }
    },
    PhonelinkLock: {
        name: 'PhonelinkLock',
        displayName: 'Phonelink Lock',
        category: 'Communication',
        icon: <PhonelinkLock />,
        properties: [],
        designerDefinition: {
            component: 'PhonelinkLock',
            props: {
            }
        }
    },
    PhonelinkRing: {
        name: 'PhonelinkRing',
        displayName: 'Phonelink Ring',
        category: 'Communication',
        icon: <PhonelinkRing />,
        properties: [],
        designerDefinition: {
            component: 'PhonelinkRing',
            props: {
            }
        }
    },
    PhonelinkSetup: {
        name: 'PhonelinkSetup',
        displayName: 'Phonelink Setup',
        category: 'Communication',
        icon: <PhonelinkSetup />,
        properties: [],
        designerDefinition: {
            component: 'PhonelinkSetup',
            props: {
            }
        }
    },
    PortableWifiOff: {
        name: 'PortableWifiOff',
        displayName: 'Portable Wifi Off',
        category: 'Communication',
        icon: <PortableWifiOff />,
        properties: [],
        designerDefinition: {
            component: 'PortableWifiOff',
            props: {
            }
        }
    },
    PresentToAll: {
        name: 'PresentToAll',
        displayName: 'Present To All',
        category: 'Communication',
        icon: <PresentToAll />,
        properties: [],
        designerDefinition: {
            component: 'PresentToAll',
            props: {
            }
        }
    },
    PrintDisabled: {
        name: 'PrintDisabled',
        displayName: 'Print Disabled',
        category: 'Communication',
        icon: <PrintDisabled />,
        properties: [],
        designerDefinition: {
            component: 'PrintDisabled',
            props: {
            }
        }
    },
    RingVolume: {
        name: 'RingVolume',
        displayName: 'Ring Volume',
        category: 'Communication',
        icon: <RingVolume />,
        properties: [],
        designerDefinition: {
            component: 'RingVolume',
            props: {
            }
        }
    },
    RssFeed: {
        name: 'RssFeed',
        displayName: 'Rss Feed',
        category: 'Communication',
        icon: <RssFeed />,
        properties: [],
        designerDefinition: {
            component: 'RssFeed',
            props: {
            }
        }
    },
    ScreenShare: {
        name: 'ScreenShare',
        displayName: 'Screen Share',
        category: 'Communication',
        icon: <ScreenShare />,
        properties: [],
        designerDefinition: {
            component: 'ScreenShare',
            props: {
            }
        }
    },
    SentimentSatisfiedAlt: {
        name: 'SentimentSatisfiedAlt',
        displayName: 'Sentiment Satisfied Alt',
        category: 'Communication',
        icon: <SentimentSatisfiedAlt />,
        properties: [],
        designerDefinition: {
            component: 'SentimentSatisfiedAlt',
            props: {
            }
        }
    },
    SpeakerPhone: {
        name: 'SpeakerPhone',
        displayName: 'Speaker Phone',
        category: 'Communication',
        icon: <SpeakerPhone />,
        properties: [],
        designerDefinition: {
            component: 'SpeakerPhone',
            props: {
            }
        }
    },
    StayCurrentLandscape: {
        name: 'StayCurrentLandscape',
        displayName: 'Stay Current Landscape',
        category: 'Communication',
        icon: <StayCurrentLandscape />,
        properties: [],
        designerDefinition: {
            component: 'StayCurrentLandscape',
            props: {
            }
        }
    },
    StayCurrentPortrait: {
        name: 'StayCurrentPortrait',
        displayName: 'Stay Current Portrait',
        category: 'Communication',
        icon: <StayCurrentPortrait />,
        properties: [],
        designerDefinition: {
            component: 'StayCurrentPortrait',
            props: {
            }
        }
    },
    StayPrimaryLandscape: {
        name: 'StayPrimaryLandscape',
        displayName: 'Stay Primary Landscape',
        category: 'Communication',
        icon: <StayPrimaryLandscape />,
        properties: [],
        designerDefinition: {
            component: 'StayPrimaryLandscape',
            props: {
            }
        }
    },
    StayPrimaryPortrait: {
        name: 'StayPrimaryPortrait',
        displayName: 'Stay Primary Portrait',
        category: 'Communication',
        icon: <StayPrimaryPortrait />,
        properties: [],
        designerDefinition: {
            component: 'StayPrimaryPortrait',
            props: {
            }
        }
    },
    StopScreenShare: {
        name: 'StopScreenShare',
        displayName: 'Stop Screen Share',
        category: 'Communication',
        icon: <StopScreenShare />,
        properties: [],
        designerDefinition: {
            component: 'StopScreenShare',
            props: {
            }
        }
    },
    SwapCalls: {
        name: 'SwapCalls',
        displayName: 'Swap Calls',
        category: 'Communication',
        icon: <SwapCalls />,
        properties: [],
        designerDefinition: {
            component: 'SwapCalls',
            props: {
            }
        }
    },
    Textsms: {
        name: 'Textsms',
        displayName: 'Textsms',
        category: 'Communication',
        icon: <Textsms />,
        properties: [],
        designerDefinition: {
            component: 'Textsms',
            props: {
            }
        }
    },
    Unsubscribe: {
        name: 'Unsubscribe',
        displayName: 'Unsubscribe',
        category: 'Communication',
        icon: <Unsubscribe />,
        properties: [],
        designerDefinition: {
            component: 'Unsubscribe',
            props: {
            }
        }
    },
    Voicemail: {
        name: 'Voicemail',
        displayName: 'Voicemail',
        category: 'Communication',
        icon: <Voicemail />,
        properties: [],
        designerDefinition: {
            component: 'Voicemail',
            props: {
            }
        }
    },
    VpnKey: {
        name: 'VpnKey',
        displayName: 'Vpn Key',
        category: 'Communication',
        icon: <VpnKey />,
        properties: [],
        designerDefinition: {
            component: 'VpnKey',
            props: {
            }
        }
    },

    //Maps Icons
    // ThreeSixty, AddLocation, Atm, Beenhere, Category, CompassCalibration, DepartureBoard, Directions, DirectionsBike, DirectionsBoat, DirectionsBus, DirectionsCar, DirectionsRailway, DirectionsRun,

    ThreeSixty: {
        name: 'ThreeSixty',
        displayName: '360',
        category: 'Maps',
        icon: <ThreeSixty />,
        properties: [],
        designerDefinition: {
            component: 'ThreeSixty',
            props: {
            }
        }
    },
    AddLocation: {
        name: 'AddLocation',
        displayName: 'Add Location',
        category: 'Maps',
        icon: <AddLocation />,
        properties: [],
        designerDefinition: {
            component: 'AddLocation',
            props: {
            }
        }
    },
    Atm: {
        name: 'Atm',
        displayName: 'Atm',
        category: 'Maps',
        icon: <Atm />,
        properties: [],
        designerDefinition: {
            component: 'Atm',
            props: {
            }
        }
    },
    Beenhere: {
        name: 'Beenhere',
        displayName: 'Beenhere',
        category: 'Maps',
        icon: <Beenhere />,
        properties: [],
        designerDefinition: {
            component: 'Beenhere',
            props: {
            }
        }
    },
    Category: {
        name: 'Category',
        displayName: 'Category',
        category: 'Maps',
        icon: <Category />,
        properties: [],
        designerDefinition: {
            component: 'Category',
            props: {
            }
        }
    },
    CompassCalibration: {
        name: 'CompassCalibration',
        displayName: 'Compass Calibration',
        category: 'Maps',
        icon: <CompassCalibration />,
        properties: [],
        designerDefinition: {
            component: 'CompassCalibration',
            props: {
            }
        }
    },
    DepartureBoard: {
        name: 'DepartureBoard',
        displayName: 'Departure Board',
        category: 'Maps',
        icon: <DepartureBoard />,
        properties: [],
        designerDefinition: {
            component: 'DepartureBoard',
            props: {
            }
        }
    },
    Directions: {
        name: 'Directions',
        displayName: 'Directions',
        category: 'Maps',
        icon: <Directions />,
        properties: [],
        designerDefinition: {
            component: 'Directions',
            props: {
            }
        }
    },
    DirectionsBike: {
        name: 'DirectionsBike',
        displayName: 'Directions Bike',
        category: 'Maps',
        icon: <DirectionsBike />,
        properties: [],
        designerDefinition: {
            component: 'DirectionsBike',
            props: {
            }
        }
    },
    DirectionsBoat: {
        name: 'DirectionsBoat',
        displayName: 'Directions Boat',
        category: 'Maps',
        icon: <DirectionsBoat />,
        properties: [],
        designerDefinition: {
            component: 'DirectionsBoat',
            props: {
            }
        }
    },
    DirectionsBus: {
        name: 'DirectionsBus',
        displayName: 'Directions Bus',
        category: 'Maps',
        icon: <DirectionsBus />,
        properties: [],
        designerDefinition: {
            component: 'DirectionsBus',
            props: {
            }
        }
    },
    DirectionsCar: {
        name: 'DirectionsCar',
        displayName: 'Directions Car',
        category: 'Maps',
        icon: <DirectionsCar />,
        properties: [],
        designerDefinition: {
            component: 'DirectionsCar',
            props: {
            }
        }
    },
    DirectionsRailway: {
        name: 'DirectionsRailway',
        displayName: 'Directions Railway',
        category: 'Maps',
        icon: <DirectionsRailway />,
        properties: [],
        designerDefinition: {
            component: 'DirectionsRailway',
            props: {
            }
        }
    },
    DirectionsRun: {
        name: 'DirectionsRun',
        displayName: 'Directions Run',
        category: 'Maps',
        icon: <DirectionsRun />,
        properties: [],
        designerDefinition: {
            component: 'DirectionsRun',
            props: {
            }
        }
    },
    DirectionsSubway: {
        name: 'DirectionsSubway',
        displayName: 'Directions Subway',
        category: 'Maps',
        icon: <DirectionsSubway />,
        properties: [],
        designerDefinition: {
            component: 'DirectionsSubway',
            props: {
            }
        }
    },
    DirectionsTransit: {
        name: 'DirectionsTransit',
        displayName: 'Directions Transit',
        category: 'Maps',
        icon: <DirectionsTransit />,
        properties: [],
        designerDefinition: {
            component: 'DirectionsTransit',
            props: {
            }
        }
    },
    DirectionsWalk: {
        name: 'DirectionsWalk',
        displayName: 'Directions Walk',
        category: 'Maps',
        icon: <DirectionsWalk />,
        properties: [],
        designerDefinition: {
            component: 'DirectionsWalk',
            props: {
            }
        }
    },
    EditAttributes: {
        name: 'EditAttributes',
        displayName: 'Edit Attributes',
        category: 'Maps',
        icon: <EditAttributes />,
        properties: [],
        designerDefinition: {
            component: 'EditAttributes',
            props: {
            }
        }
    },
    EditLocation: {
        name: 'EditLocation',
        displayName: 'Edit Location',
        category: 'Maps',
        icon: <EditLocation />,
        properties: [],
        designerDefinition: {
            component: 'EditLocation',
            props: {
            }
        }
    },
    EvStation: {
        name: 'EvStation',
        displayName: 'Ev Station',
        category: 'Maps',
        icon: <EvStation />,
        properties: [],
        designerDefinition: {
            component: 'EvStation',
            props: {
            }
        }
    },
    Fastfood: {
        name: 'Fastfood',
        displayName: 'Fastfood',
        category: 'Maps',
        icon: <Fastfood />,
        properties: [],
        designerDefinition: {
            component: 'Fastfood',
            props: {
            }
        }
    },
    Flight: {
        name: 'Flight',
        displayName: 'Flight',
        category: 'Maps',
        icon: <Flight />,
        properties: [],
        designerDefinition: {
            component: 'Flight',
            props: {
            }
        }
    },
    Hotel: {
        name: 'Hotel',
        displayName: 'Hotel',
        category: 'Maps',
        icon: <Hotel />,
        properties: [],
        designerDefinition: {
            component: 'Hotel',
            props: {
            }
        }
    },
    Layers: {
        name: 'Layers',
        displayName: 'Layers',
        category: 'Maps',
        icon: <Layers />,
        properties: [],
        designerDefinition: {
            component: 'Layers',
            props: {
            }
        }
    },
    LayersClear: {
        name: 'LayersClear',
        displayName: 'Layers Clear',
        category: 'Maps',
        icon: <LayersClear />,
        properties: [],
        designerDefinition: {
            component: 'LayersClear',
            props: {
            }
        }
    },
    LocalActivity: {
        name: 'LocalActivity',
        displayName: 'Local Activity',
        category: 'Maps',
        icon: <LocalActivity />,
        properties: [],
        designerDefinition: {
            component: 'LocalActivity',
            props: {
            }
        }
    },
    LocalAirport: {
        name: 'LocalAirport',
        displayName: 'Local Airport',
        category: 'Maps',
        icon: <LocalAirport />,
        properties: [],
        designerDefinition: {
            component: 'LocalAirport',
            props: {
            }
        }
    },
    LocalAtm: {
        name: 'LocalAtm',
        displayName: 'Local Atm',
        category: 'Maps',
        icon: <LocalAtm />,
        properties: [],
        designerDefinition: {
            component: 'LocalAtm',
            props: {
            }
        }
    },
    LocalBar: {
        name: 'LocalBar',
        displayName: 'Local Bar',
        category: 'Maps',
        icon: <LocalBar />,
        properties: [],
        designerDefinition: {
            component: 'LocalBar',
            props: {
            }
        }
    },
    LocalCafe: {
        name: 'LocalCafe',
        displayName: 'Local Cafe',
        category: 'Maps',
        icon: <LocalCafe />,
        properties: [],
        designerDefinition: {
            component: 'LocalCafe',
            props: {
            }
        }
    },
    LocalCarWash: {
        name: 'LocalCarWash',
        displayName: 'Local Car Wash',
        category: 'Maps',
        icon: <LocalCarWash />,
        properties: [],
        designerDefinition: {
            component: 'LocalCarWash',
            props: {
            }
        }
    },
    LocalConvenienceStore: {
        name: 'LocalConvenienceStore',
        displayName: 'Local Convenience Store',
        category: 'Maps',
        icon: <LocalConvenienceStore />,
        properties: [],
        designerDefinition: {
            component: 'LocalConvenienceStore',
            props: {
            }
        }
    },
    LocalDining: {
        name: 'LocalDining',
        displayName: 'Local Dining',
        category: 'Maps',
        icon: <LocalDining />,
        properties: [],
        designerDefinition: {
            component: 'LocalDining',
            props: {
            }
        }
    },
    LocalDrink: {
        name: 'LocalDrink',
        displayName: 'Local Drink',
        category: 'Maps',
        icon: <LocalDrink />,
        properties: [],
        designerDefinition: {
            component: 'LocalDrink',
            props: {
            }
        }
    },
    LocalFlorist: {
        name: 'LocalFlorist',
        displayName: 'Local Florist',
        category: 'Maps',
        icon: <LocalFlorist />,
        properties: [],
        designerDefinition: {
            component: 'LocalFlorist',
            props: {
            }
        }
    },
    LocalGasStation: {
        name: 'LocalGasStation',
        displayName: 'Local Gas Station',
        category: 'Maps',
        icon: <LocalGasStation />,
        properties: [],
        designerDefinition: {
            component: 'LocalGasStation',
            props: {
            }
        }
    },
    LocalGroceryStore: {
        name: 'LocalGroceryStore',
        displayName: 'Local Grocery Store',
        category: 'Maps',
        icon: <LocalGroceryStore />,
        properties: [],
        designerDefinition: {
            component: 'LocalGroceryStore',
            props: {
            }
        }
    },
    LocalHospital: {
        name: 'LocalHospital',
        displayName: 'Local Hospital',
        category: 'Maps',
        icon: <LocalHospital />,
        properties: [],
        designerDefinition: {
            component: 'LocalHospital',
            props: {
            }
        }
    },
    LocalHotel: {
        name: 'LocalHotel',
        displayName: 'Local Hotel',
        category: 'Maps',
        icon: <LocalHotel />,
        properties: [],
        designerDefinition: {
            component: 'LocalHotel',
            props: {
            }
        }
    },
    LocalLaundryService: {
        name: 'LocalLaundryService',
        displayName: 'Local Laundry Service',
        category: 'Maps',
        icon: <LocalLaundryService />,
        properties: [],
        designerDefinition: {
            component: 'LocalLaundryService',
            props: {
            }
        }
    },
    LocalLibrary: {
        name: 'LocalLibrary',
        displayName: 'Local Library',
        category: 'Maps',
        icon: <LocalLibrary />,
        properties: [],
        designerDefinition: {
            component: 'LocalLibrary',
            props: {
            }
        }
    },
    LocalMall: {
        name: 'LocalMall',
        displayName: 'Local Mall',
        category: 'Maps',
        icon: <LocalMall />,
        properties: [],
        designerDefinition: {
            component: 'LocalMall',
            props: {
            }
        }
    },
    LocalMovies: {
        name: 'LocalMovies',
        displayName: 'Local Movies',
        category: 'Maps',
        icon: <LocalMovies />,
        properties: [],
        designerDefinition: {
            component: 'LocalMovies',
            props: {
            }
        }
    },
    LocalOffer: {
        name: 'LocalOffer',
        displayName: 'Local Offer',
        category: 'Maps',
        icon: <LocalOffer />,
        properties: [],
        designerDefinition: {
            component: 'LocalOffer',
            props: {
            }
        }
    },
    LocalParking: {
        name: 'LocalParking',
        displayName: 'Local Parking',
        category: 'Maps',
        icon: <LocalParking />,
        properties: [],
        designerDefinition: {
            component: 'LocalParking',
            props: {
            }
        }
    },
    LocalPharmacy: {
        name: 'LocalPharmacy',
        displayName: 'Local Pharmacy',
        category: 'Maps',
        icon: <LocalPharmacy />,
        properties: [],
        designerDefinition: {
            component: 'LocalPharmacy',
            props: {
            }
        }
    },
    LocalPhone: {
        name: 'LocalPhone',
        displayName: 'Local Phone',
        category: 'Maps',
        icon: <LocalPhone />,
        properties: [],
        designerDefinition: {
            component: 'LocalPhone',
            props: {
            }
        }
    },
    LocalPizza: {
        name: 'LocalPizza',
        displayName: 'Local Pizza',
        category: 'Maps',
        icon: <LocalPizza />,
        properties: [],
        designerDefinition: {
            component: 'LocalPizza',
            props: {
            }
        }
    },
    LocalPlay: {
        name: 'LocalPlay',
        displayName: 'Local Play',
        category: 'Maps',
        icon: <LocalPlay />,
        properties: [],
        designerDefinition: {
            component: 'LocalPlay',
            props: {
            }
        }
    },
    LocalPostOffice: {
        name: 'LocalPostOffice',
        displayName: 'Local Post Office',
        category: 'Maps',
        icon: <LocalPostOffice />,
        properties: [],
        designerDefinition: {
            component: 'LocalPostOffice',
            props: {
            }
        }
    },
    LocalPrintshop: {
        name: 'LocalPrintshop',
        displayName: 'Local Printshop',
        category: 'Maps',
        icon: <LocalPrintshop />,
        properties: [],
        designerDefinition: {
            component: 'LocalPrintshop',
            props: {
            }
        }
    },
    LocalSee: {
        name: 'LocalSee',
        displayName: 'Local See',
        category: 'Maps',
        icon: <LocalSee />,
        properties: [],
        designerDefinition: {
            component: 'LocalSee',
            props: {
            }
        }
    },
    LocalShipping: {
        name: 'LocalShipping',
        displayName: 'Local Shipping',
        category: 'Maps',
        icon: <LocalShipping />,
        properties: [],
        designerDefinition: {
            component: 'LocalShipping',
            props: {
            }
        }
    },
    LocalTaxi: {
        name: 'LocalTaxi',
        displayName: 'Local Taxi',
        category: 'Maps',
        icon: <LocalTaxi />,
        properties: [],
        designerDefinition: {
            component: 'LocalTaxi',
            props: {
            }
        }
    },
    Map: {
        name: 'Map',
        displayName: 'Map',
        category: 'Maps',
        icon: <Map />,
        properties: [],
        designerDefinition: {
            component: 'Map',
            props: {
            }
        }
    },
    Money: {
        name: 'Money',
        displayName: 'Money',
        category: 'Maps',
        icon: <Money />,
        properties: [],
        designerDefinition: {
            component: 'Money',
            props: {
            }
        }
    },
    MyLocation: {
        name: 'MyLocation',
        displayName: 'My Location',
        category: 'Maps',
        icon: <MyLocation />,
        properties: [],
        designerDefinition: {
            component: 'MyLocation',
            props: {
            }
        }
    },
    Navigation: {
        name: 'Navigation',
        displayName: 'Navigation',
        category: 'Maps',
        icon: <Navigation />,
        properties: [],
        designerDefinition: {
            component: 'Navigation',
            props: {
            }
        }
    },
    NearMe: {
        name: 'NearMe',
        displayName: 'Near Me',
        category: 'Maps',
        icon: <NearMe />,
        properties: [],
        designerDefinition: {
            component: 'NearMe',
            props: {
            }
        }
    },
    NotListedLocation: {
        name: 'NotListedLocation',
        displayName: 'Not Listed Location',
        category: 'Maps',
        icon: <NotListedLocation />,
        properties: [],
        designerDefinition: {
            component: 'NotListedLocation',
            props: {
            }
        }
    },
    PersonPin: {
        name: 'PersonPin',
        displayName: 'Person Pin',
        category: 'Maps',
        icon: <PersonPin />,
        properties: [],
        designerDefinition: {
            component: 'PersonPin',
            props: {
            }
        }
    },
    PersonPinCircle: {
        name: 'PersonPinCircle',
        displayName: 'Person Pin Circle',
        category: 'Maps',
        icon: <PersonPinCircle />,
        properties: [],
        designerDefinition: {
            component: 'PersonPinCircle',
            props: {
            }
        }
    },
    PinDrop: {
        name: 'PinDrop',
        displayName: 'Pin Drop',
        category: 'Maps',
        icon: <PinDrop />,
        properties: [],
        designerDefinition: {
            component: 'PinDrop',
            props: {
            }
        }
    },
    Place: {
        name: 'Place',
        displayName: 'Place',
        category: 'Maps',
        icon: <Place />,
        properties: [],
        designerDefinition: {
            component: 'Place',
            props: {
            }
        }
    },
    RateReview: {
        name: 'RateReview',
        displayName: 'Rate Review',
        category: 'Maps',
        icon: <RateReview />,
        properties: [],
        designerDefinition: {
            component: 'RateReview',
            props: {
            }
        }
    },
    Restaurant: {
        name: 'Restaurant',
        displayName: 'Restaurant',
        category: 'Maps',
        icon: <Restaurant />,
        properties: [],
        designerDefinition: {
            component: 'Restaurant',
            props: {
            }
        }
    },
    RestaurantMenu: {
        name: 'RestaurantMenu',
        displayName: 'Restaurant Menu',
        category: 'Maps',
        icon: <RestaurantMenu />,
        properties: [],
        designerDefinition: {
            component: 'RestaurantMenu',
            props: {
            }
        }
    },
    Satellite: {
        name: 'Satellite',
        displayName: 'Satellite',
        category: 'Maps',
        icon: <Satellite />,
        properties: [],
        designerDefinition: {
            component: 'Satellite',
            props: {
            }
        }
    },
    StoreMallDirectory: {
        name: 'StoreMallDirectory',
        displayName: 'Store Mall Directory',
        category: 'Maps',
        icon: <StoreMallDirectory />,
        properties: [],
        designerDefinition: {
            component: 'StoreMallDirectory',
            props: {
            }
        }
    },
    Streetview: {
        name: 'Streetview',
        displayName: 'Streetview',
        category: 'Maps',
        icon: <Streetview />,
        properties: [],
        designerDefinition: {
            component: 'Streetview',
            props: {
            }
        }
    },
    Subway: {
        name: 'Subway',
        displayName: 'Subway',
        category: 'Maps',
        icon: <Subway />,
        properties: [],
        designerDefinition: {
            component: 'Subway',
            props: {
            }
        }
    },
    Terrain: {
        name: 'Terrain',
        displayName: 'Terrain',
        category: 'Maps',
        icon: <Terrain />,
        properties: [],
        designerDefinition: {
            component: 'Terrain',
            props: {
            }
        }
    },
    Traffic: {
        name: 'Traffic',
        displayName: 'Traffic',
        category: 'Maps',
        icon: <Traffic />,
        properties: [],
        designerDefinition: {
            component: 'Traffic',
            props: {
            }
        }
    },
    Train: {
        name: 'Train',
        displayName: 'Train',
        category: 'Maps',
        icon: <Train />,
        properties: [],
        designerDefinition: {
            component: 'Train',
            props: {
            }
        }
    },
    Tram: {
        name: 'Tram',
        displayName: 'Tram',
        category: 'Maps',
        icon: <Tram />,
        properties: [],
        designerDefinition: {
            component: 'Tram',
            props: {
            }
        }
    },
    TransferWithinAStation: {
        name: 'TransferWithinAStation',
        displayName: 'Transfer Within A Station',
        category: 'Maps',
        icon: <TransferWithinAStation />,
        properties: [],
        designerDefinition: {
            component: 'TransferWithinAStation',
            props: {
            }
        }
    },
    TransitEnterexit: {
        name: 'TransitEnterexit',
        displayName: 'Transit Enterexit',
        category: 'Maps',
        icon: <TransitEnterexit />,
        properties: [],
        designerDefinition: {
            component: 'TransitEnterexit',
            props: {
            }
        }
    },
    TripOrigin: {
        name: 'TripOrigin',
        displayName: 'Trip Origin',
        category: 'Maps',
        icon: <TripOrigin />,
        properties: [],
        designerDefinition: {
            component: 'TripOrigin',
            props: {
            }
        }
    },
    ZoomOutMap: {
        name: 'ZoomOutMap',
        displayName: 'Zoom Out Map',
        category: 'Maps',
        icon: <ZoomOutMap />,
        properties: [],
        designerDefinition: {
            component: 'ZoomOutMap',
            props: {
            }
        }
    },

    //Navigation Icons
    Apps: {
        name: 'Apps',
        displayName: 'Apps',
        category: 'Navigation',
        icon: <Apps />,
        properties: [],
        designerDefinition: {
            component: 'Apps',
            props: {
            }
        }
    },
    ArrowBack: {
        name: 'ArrowBack',
        displayName: 'Arrow Back',
        category: 'Navigation',
        icon: <ArrowBack />,
        properties: [],
        designerDefinition: {
            component: 'ArrowBack',
            props: {
            }
        }
    },
    ArrowBackIos: {
        name: 'ArrowBackIos',
        displayName: 'Arrow Back Ios',
        category: 'Navigation',
        icon: <ArrowBackIos />,
        properties: [],
        designerDefinition: {
            component: 'ArrowBackIos',
            props: {
            }
        }
    },
    ArrowDownward: {
        name: 'ArrowDownward',
        displayName: 'Arrow Downward',
        category: 'Navigation',
        icon: <ArrowDownward />,
        properties: [],
        designerDefinition: {
            component: 'ArrowDownward',
            props: {
            }
        }
    },
    ArrowDropDown: {
        name: 'ArrowDropDown',
        displayName: 'Arrow Drop Down',
        category: 'Navigation',
        icon: <ArrowDropDown />,
        properties: [],
        designerDefinition: {
            component: 'ArrowDropDown',
            props: {
            }
        }
    },
    ArrowDropDownCircle: {
        name: 'ArrowDropDownCircle',
        displayName: 'Arrow Drop Down Circle',
        category: 'Navigation',
        icon: <ArrowDropDownCircle />,
        properties: [],
        designerDefinition: {
            component: 'ArrowDropDownCircle',
            props: {
            }
        }
    },
    ArrowDropUp: {
        name: 'ArrowDropUp',
        displayName: 'Arrow Drop Up',
        category: 'Navigation',
        icon: <ArrowDropUp />,
        properties: [],
        designerDefinition: {
            component: 'ArrowDropUp',
            props: {
            }
        }
    },
    ArrowForward: {
        name: 'ArrowForward',
        displayName: 'Arrow Forward',
        category: 'Navigation',
        icon: <ArrowForward />,
        properties: [],
        designerDefinition: {
            component: 'ArrowDropUp',
            props: {
            }
        }
    },    
    ArrowForwardIos: {
        name: 'ArrowForwardIos',
        displayName: 'Arrow Forward Ios',
        category: 'Navigation',
        icon: <ArrowForwardIos />,
        properties: [],
        designerDefinition: {
            component: 'ArrowForwardIos',
            props: {
            }
        }
    },
    ArrowLeft: {
        name: 'ArrowLeft',
        displayName: 'Arrow Left',
        category: 'Navigation',
        icon: <ArrowLeft />,
        properties: [],
        designerDefinition: {
            component: 'ArrowLeft',
            props: {
            }
        }
    },
    ArrowUpward: {
        name: 'ArrowUpward',
        displayName: 'Arrow Upward',
        category: 'Navigation',
        icon: <ArrowUpward />,
        properties: [],
        designerDefinition: {
            component: 'ArrowUpward',
            props: {
            }
        }
    },
    Cancel: {
        name: 'Cancel',
        displayName: 'Cancel',
        category: 'Navigation',
        icon: <Cancel />,
        properties: [],
        designerDefinition: {
            component: 'Cancel',
            props: {
            }
        }
    },
    Check: {
        name: 'Check',
        displayName: 'Check',
        category: 'Navigation',
        icon: <Check />,
        properties: [],
        designerDefinition: {
            component: 'Check',
            props: {
            }
        }
    },
    ChevronLeft: {
        name: 'ChevronLeft',
        displayName: 'Chevron Left',
        category: 'Navigation',
        icon: <ChevronLeft />,
        properties: [],
        designerDefinition: {
            component: 'ChevronLeft',
            props: {
            }
        }
    },
    ChevronRight: {
        name: 'ChevronRight',
        displayName: 'Chevron Right',
        category: 'Navigation',
        icon: <ChevronRight />,
        properties: [],
        designerDefinition: {
            component: 'ChevronRight',
            props: {
            }
        }
    },
    Close: {
        name: 'Close',
        displayName: 'Close',
        category: 'Navigation',
        icon: <Close />,
        properties: [],
        designerDefinition: {
            component: 'Close',
            props: {
            }
        }
    },
    ExpandLess: {
        name: 'ExpandLess',
        displayName: 'Expand Less',
        category: 'Navigation',
        icon: <ExpandLess />,
        properties: [],
        designerDefinition: {
            component: 'ExpandLess',
            props: {
            }
        }
    },
    ExpandMore: {
        name: 'ExpandMore',
        displayName: 'Expand More',
        category: 'Navigation',
        icon: <ExpandMore />,
        properties: [],
        designerDefinition: {
            component: 'ExpandMore',
            props: {
            }
        }
    },
    FirstPage: {
        name: 'FirstPage',
        displayName: 'First Page',
        category: 'Navigation',
        icon: <FirstPage />,
        properties: [],
        designerDefinition: {
            component: 'FirstPage',
            props: {
            }
        }
    },
    Fullscreen: {
        name: 'Fullscreen',
        displayName: 'Fullscreen',
        category: 'Navigation',
        icon: <Fullscreen />,
        properties: [],
        designerDefinition: {
            component: 'Fullscreen',
            props: {
            }
        }
    },
    FullscreenExit: {
        name: 'FullscreenExit',
        displayName: 'Fullscreen Exit',
        category: 'Navigation',
        icon: <FullscreenExit />,
        properties: [],
        designerDefinition: {
            component: 'FullscreenExit',
            props: {
            }
        }
    },
    LastPage: {
        name: 'LastPage',
        displayName: 'Last Page',
        category: 'Navigation',
        icon: <LastPage />,
        properties: [],
        designerDefinition: {
            component: 'LastPage',
            props: {
            }
        }
    },
    MoreHoriz: {
        name: 'MoreHoriz',
        displayName: 'More Horiz',
        category: 'Navigation',
        icon: <MoreHoriz />,
        properties: [],
        designerDefinition: {
            component: 'MoreHoriz',
            props: {
            }
        }
    },
    MoreVert: {
        name: 'MoreVert',
        displayName: 'More Vert',
        category: 'Navigation',
        icon: <MoreVert />,
        properties: [],
        designerDefinition: {
            component: 'MoreVert',
            props: {
            }
        }
    },
    Refresh: {
        name: 'Refresh',
        displayName: 'Refresh',
        category: 'Navigation',
        icon: <Refresh />,
        properties: [],
        designerDefinition: {
            component: 'Refresh',
            props: {
            }
        }
    },
    SubdirectoryArrowLeft: {
        name: 'SubdirectoryArrowLeft',
        displayName: 'Subdirectory Arrow Left',
        category: 'Navigation',
        icon: <SubdirectoryArrowLeft />,
        properties: [],
        designerDefinition: {
            component: 'SubdirectoryArrowLeft',
            props: {
            }
        }
    },
    SubdirectoryArrowRight: {
        name: 'SubdirectoryArrowRight',
        displayName: 'Subdirectory Arrow Right',
        category: 'Navigation',
        icon: <SubdirectoryArrowRight />,
        properties: [],
        designerDefinition: {
            component: 'SubdirectoryArrowRight',
            props: {
            }
        }
    },
    UnfoldLess: {
        name: 'UnfoldLess',
        displayName: 'Unfold Less',
        category: 'Navigation',
        icon: <UnfoldLess />,
        properties: [],
        designerDefinition: {
            component: 'UnfoldLess',
            props: {
            }
        }
    },
    UnfoldMore: {
        name: 'UnfoldMore',
        displayName: 'Unfold More',
        category: 'Navigation',
        icon: <UnfoldMore />,
        properties: [],
        designerDefinition: {
            component: 'UnfoldMore',
            props: {
            }
        }
    },

    //Social Icons    
    Cake: {
        name: 'Cake',
        displayName: 'Cake',
        category: 'Social',
        icon: <Cake />,
        properties: [],
        designerDefinition: {
            component: 'Cake',
            props: {
            }
        }
    },
    Domain: {
        name: 'Domain',
        displayName: 'Domain',
        category: 'Social',
        icon: <Domain />,
        properties: [],
        designerDefinition: {
            component: 'Domain',
            props: {
            }
        }
    },
    Group: {
        name: 'Group',
        displayName: 'Group',
        category: 'Social',
        icon: <Group />,
        properties: [],
        designerDefinition: {
            component: 'Group',
            props: {
            }
        }
    },
    GroupAdd: {
        name: 'GroupAdd',
        displayName: 'Group Add',
        category: 'Social',
        icon: <GroupAdd />,
        properties: [],
        designerDefinition: {
            component: 'GroupAdd',
            props: {
            }
        }
    },
    LocationCity: {
        name: 'LocationCity',
        displayName: 'Location City',
        category: 'Social',
        icon: <LocationCity />,
        properties: [],
        designerDefinition: {
            component: 'LocationCity',
            props: {
            }
        }
    },
    Mood: {
        name: 'Mood',
        displayName: 'Mood',
        category: 'Social',
        icon: <Mood />,
        properties: [],
        designerDefinition: {
            component: 'Mood',
            props: {
            }
        }
    },
    MoodBad: {
        name: 'MoodBad',
        displayName: 'Mood Bad',
        category: 'Social',
        icon: <MoodBad />,
        properties: [],
        designerDefinition: {
            component: 'MoodBad',
            props: {
            }
        }
    },
    Notifications: {
        name: 'Notifications',
        displayName: 'Notifications',
        category: 'Social',
        icon: <Notifications />,
        properties: [],
        designerDefinition: {
            component: 'Notifications',
            props: {
            }
        }
    },
    NotificationsActive: {
        name: 'NotificationsActive',
        displayName: 'Notifications Active',
        category: 'Social',
        icon: <NotificationsActive />,
        properties: [],
        designerDefinition: {
            component: 'NotificationsActive',
            props: {
            }
        }
    },
    NotificationsNone: {
        name: 'NotificationsNone',
        displayName: 'Notifications None',
        category: 'Social',
        icon: <NotificationsNone />,
        properties: [],
        designerDefinition: {
            component: 'NotificationsNone',
            props: {
            }
        }
    },
    NotificationsOff: {
        name: 'NotificationsOff',
        displayName: 'Notifications Off',
        category: 'Social',
        icon: <NotificationsOff />,
        properties: [],
        designerDefinition: {
            component: 'NotificationsOff',
            props: {
            }
        }
    },
    NotificationsPaused: {
        name: 'NotificationsPaused',
        displayName: 'Notifications Paused',
        category: 'Social',
        icon: <NotificationsPaused />,
        properties: [],
        designerDefinition: {
            component: 'NotificationsPaused',
            props: {
            }
        }
    },
    Pages: {
        name: 'Pages',
        displayName: 'Pages',
        category: 'Social',
        icon: <Pages />,
        properties: [],
        designerDefinition: {
            component: 'Pages',
            props: {
            }
        }
    },
    PartyMode: {
        name: 'PartyMode',
        displayName: 'Party Mode',
        category: 'Social',
        icon: <PartyMode />,
        properties: [],
        designerDefinition: {
            component: 'PartyMode',
            props: {
            }
        }
    },
    People: {
        name: 'People',
        displayName: 'People',
        category: 'Social',
        icon: <People />,
        properties: [],
        designerDefinition: {
            component: 'People',
            props: {
            }
        }
    },
    PeopleOutline: {
        name: 'PeopleOutline',
        displayName: 'People Outline',
        category: 'Social',
        icon: <PeopleOutline />,
        properties: [],
        designerDefinition: {
            component: 'PeopleOutline',
            props: {
            }
        }
    },
    Person: {
        name: 'Person',
        displayName: 'Person',
        category: 'Social',
        icon: <Person />,
        properties: [],
        designerDefinition: {
            component: 'Person',
            props: {
            }
        }
    },
    PersonAdd: {
        name: 'PersonAdd',
        displayName: 'Person Add',
        category: 'Social',
        icon: <PersonAdd />,
        properties: [],
        designerDefinition: {
            component: 'PersonAdd',
            props: {
            }
        }
    },
    PersonOutline: {
        name: 'PersonOutline',
        displayName: 'Person Outline',
        category: 'Social',
        icon: <PersonOutline />,
        properties: [],
        designerDefinition: {
            component: 'PersonOutline',
            props: {
            }
        }
    },
    PlusOne: {
        name: 'PlusOne',
        displayName: 'Plus One',
        category: 'Social',
        icon: <PlusOne />,
        properties: [],
        designerDefinition: {
            component: 'PlusOne',
            props: {
            }
        }
    },
    Poll: {
        name: 'Poll',
        displayName: 'Poll',
        category: 'Social',
        icon: <Poll />,
        properties: [],
        designerDefinition: {
            component: 'Poll',
            props: {
            }
        }
    },
    Public: {
        name: 'Public',
        displayName: 'Public',
        category: 'Social',
        icon: <Public />,
        properties: [],
        designerDefinition: {
            component: 'Public',
            props: {
            }
        }
    },
    School: {
        name: 'School',
        displayName: 'School',
        category: 'Social',
        icon: <School />,
        properties: [],
        designerDefinition: {
            component: 'School',
            props: {
            }
        }
    },
    SentimentDissatisfied: {
        name: 'SentimentDissatisfied',
        displayName: 'Sentiment Dissatisfied',
        category: 'Social',
        icon: <SentimentDissatisfied />,
        properties: [],
        designerDefinition: {
            component: 'SentimentDissatisfied',
            props: {
            }
        }
    },
    SentimentSatisfied: {
        name: 'SentimentSatisfied',
        displayName: 'Sentiment Satisfied',
        category: 'Social',
        icon: <SentimentSatisfied />,
        properties: [],
        designerDefinition: {
            component: 'SentimentSatisfied',
            props: {
            }
        }
    },
    SentimentVeryDissatisfied: {
        name: 'SentimentVeryDissatisfied',
        displayName: 'Sentiment Very Dissatisfied',
        category: 'Social',
        icon: <SentimentVeryDissatisfied />,
        properties: [],
        designerDefinition: {
            component: 'SentimentVeryDissatisfied',
            props: {
            }
        }
    },
    SentimentVerySatisfied: {
        name: 'SentimentVerySatisfied',
        displayName: 'Sentiment Very Satisfied',
        category: 'Social',
        icon: <SentimentVerySatisfied />,
        properties: [],
        designerDefinition: {
            component: 'SentimentVerySatisfied',
            props: {
            }
        }
    },
    Share: {
        name: 'Share',
        displayName: 'Share',
        category: 'Social',
        icon: <Share />,
        properties: [],
        designerDefinition: {
            component: 'Share',
            props: {
            }
        }
    },
    ThumbDownAlt: {
        name: 'ThumbDownAlt',
        displayName: 'Thumb Down Alt',
        category: 'Social',
        icon: <ThumbDownAlt />,
        properties: [],
        designerDefinition: {
            component: 'ThumbDownAlt',
            props: {
            }
        }
    },
    ThumbUpAlt: {
        name: 'ThumbUpAlt',
        displayName: 'Thumb Up Alt',
        category: 'Social',
        icon: <ThumbUpAlt />,
        properties: [],
        designerDefinition: {
            component: 'ThumbUpAlt',
            props: {
            }
        }
    },
    Whatshot: {
        name: 'Whatshot',
        displayName: 'Whatshot',
        category: 'Social',
        icon: <Whatshot />,
        properties: [],
        designerDefinition: {
            component: 'Whatshot',
            props: {
            }
        }
    }
}
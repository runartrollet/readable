import { StyleRules } from 'material-ui/styles'
import { myTheme } from './'
import green from 'material-ui/colors/green'
import grey from 'material-ui/colors/grey'
import red from 'material-ui/colors/red'

const drawerWidth = 280
const sidebariconWidth = '3em'
// const sidebariconHeight = '3em'
const headerIconsWidth = '1.5em'
const headerIconsHeight = '1.5em'
export default (theme: typeof myTheme): StyleRules => ({
  root: {
    width: '100%',
    zIndex: 1,
    // overflow: 'hidden',
    flexGrow: 1
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  formRoot: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  authorAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: green[500],
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    },
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  button: {
    margin: theme.spacing.unit,
  },
  voteButton: {
    '&:disabled': {
      color: grey[500]
    },
  },
  downVoteButton: {
    color: red[500]
  },
  upVoteButton: {
    color: green[500]
  },
  textCenter: {
    textAlign: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  link: {
    cursor: 'pointer'
  },
  sidebarCategoryContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  sidebaricon: {
    // padding: '0.2em',
    width: sidebariconWidth,
    maxWidth: sidebariconWidth,
  },
  headericon: {
    padding: '0 0.2em',
    width: headerIconsWidth,
    maxWidth: headerIconsWidth,
    height: headerIconsHeight,
    minHeight: headerIconsHeight,
  },
  badge: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  }
})

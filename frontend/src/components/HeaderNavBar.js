import AppBar from '@material-ui/core/AppBar';
// import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CategoryIcon from '@material-ui/icons/Category';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import LocalCarWashIcon from '@material-ui/icons/LocalCarWash';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { logout } from '../actions/userActions';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import clsx from 'clsx';



const useStyles = makeStyles((theme) => ({
    root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
   list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
   
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory();
  const location = useLocation();
    const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElAdmin, setAnchorElAdmin] = React.useState(null);
  const [anchorElCategory, setAnchorElCategory] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMenuOpenAdmin = Boolean(anchorElAdmin);
  const isMenuOpenCategory = Boolean(anchorElCategory);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  const [keyword, setKeyword] = React.useState('')
  

  const submitSearchHandler = () => {
   setKeyword('')
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  const handleChange = (event) => {
    setKeyword(event.target.value); // Update searchValue state with input value
  };

  const handleProfileMenuOpenCategory = (event) => {
    setAnchorElCategory(event.currentTarget);
  };
  const handleProfileMenuOpenAdmin = (event) => {
    setAnchorElAdmin(event.currentTarget);
  };
  
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };


  const handleMenuCloseCategory = (text) => {
    setAnchorElCategory(null);
   
    handleMobileMenuClose();
     history.push(`/categoryFilter/${text}`)
  };

  const handleMenuCloseAdmin = (text) => {
    setAnchorElAdmin(null);
    handleMobileMenuClose();
     history.push(`${text}`)
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    history.push('/profile');
  };

   const logoutHandler = () => {
       setAnchorEl(null);
    handleMobileMenuClose();
    dispatch(logout())
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const menuIdAdmin = 'primary-search-account-menu-admin';
  const menuIdCategory = 'primary-search-account-menu-category';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={logoutHandler}>Logout</MenuItem>
    </Menu>
  );

  const adminRoutesArray = [
  {
name: 'Users',
routes: '/admin/userlist',
  },
  {
name: 'Cars',
routes: '/admin/productlist',
  },
  {
name: 'Booking',
routes: '/admin/orderList',
  },
  
]






  const renderMenuAdmin = (
    <Menu
      anchorEl={anchorElAdmin}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuIdAdmin}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpenAdmin}
      onClose={handleMenuCloseAdmin}
    >
     {
      adminRoutesArray.map((route) =>  <MenuItem onClick={()=>handleMenuCloseAdmin(route.routes)}>{route.name}</MenuItem>)
     }
      
    </Menu>
  );


  const categoriesArray = [
    {
name: 'Suv',
searchKeyword: 'suv' ,
  },
  {
name: 'Muv',
searchKeyword: 'muv',
  },
  {
name: 'Sedan',
searchKeyword: 'sedan',
  },
  {
name: 'Hatchbag',
searchKeyword: 'hatchbag',
  },
  {
name: 'Heavy Duty',
searchKeyword: 'heavyduty',
  },
   {
name: 'Coupe',
searchKeyword: 'coupe',
  },
   {
name: 'EV',
searchKeyword: 'electric (ev)',
  },
]

  const renderMenuCategories = (
    <Menu
      anchorEl={anchorElCategory}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuIdCategory}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpenCategory}
      onClose={handleMenuCloseCategory}
    >
      {
        categoriesArray.map((category) =>   <MenuItem onClick={()=>handleMenuCloseCategory(category?.searchKeyword)}>{category?.name}</MenuItem>)
      }
   
      
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      
      <MenuItem>
        <IconButton aria-label="Show on cart" color="inherit" onClick={()=>history.push('/cart')}>
          {/* <Badge badgeContent={11} color="secondary"> */}
            <ShoppingCartIcon/>
          {/* </Badge> */}
        </IconButton>
        <p>Cart</p>
      </MenuItem>
            <MenuItem onClick={handleProfileMenuOpenCategory}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu-category"
          aria-haspopup="true"
          color="inherit"
        >
          <CategoryIcon/>
        </IconButton>
        <p>Categories</p>
      </MenuItem>
      
 {
  userInfo ? (
         <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>{userInfo?.name}</p>
      </MenuItem>
  ):(
 location.pathname === '/login' ? (
<MenuItem onClick={() => history.push('/register') }>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu-category"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle/>
        </IconButton>
        <p>Register</p>
      </MenuItem>
 ):(
  <MenuItem onClick={() => history.push('/login') }>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu-category"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle/>
        </IconButton>
        <p>Login</p>
      </MenuItem>
 )

  )
 }
   {userInfo && userInfo?.isAdmin &&   <MenuItem onClick={handleProfileMenuOpenAdmin}>
        <IconButton
          aria-label="Admin"
          aria-controls="primary-search-account-menu-admin"
          aria-haspopup="true"
          color="inherit"
        >
          <SupervisorAccountIcon />
        </IconButton>
        <p>Admin</p>
      </MenuItem>
}
    </Menu>
  );



  // ---------- Drawer --------------- 

  const colorArray = ['white', 'black', 'red', 'blue', 'silver'];
const priceRangeArray = [
  { name: '1 lakh', minPrice: 100000 },
  { name: '5 lakhs', minPrice: 500000},
  { name: '10 lakhs', minPrice: 1000000},
  { name: '20 lakhs', minPrice: 2000000},
  { name: '50 lakhs', minPrice: 5000000},
];

const handleMenuCloseCategoryDrawer = (text) => {
  setAnchorElCategory(null);
  handleMobileMenuClose();
  if (text === 'color') {
    history.push('/colorFilter');
  } else if (text === 'price') {
    history.push('/priceFilter');
  } else {
    history.push(text);
  }
};
 
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
  <div
    className={clsx(classes.list, {
      [classes.fullList]: anchor === 'top' || anchor === 'bottom',
    })}
    role="presentation"
    onClick={toggleDrawer(anchor, false)}
    onKeyDown={toggleDrawer(anchor, false)}
  >
    <List>
      <ListItem >
        <ListItemIcon>
          <ColorLensIcon />
        </ListItemIcon>
        <ListItemText primary="Colors" />
      </ListItem>
      <Divider/>
      {colorArray.map((color) => (
        <ListItem
          button
          key={color}
          onClick={() => handleMenuCloseCategoryDrawer(`/colorFilter/${color}`)}
        >
          <ListItemText primary={color.charAt(0).toUpperCase() + color.slice(1)}  />
        </ListItem>
      ))}
      <Divider />
      <ListItem  >
        <ListItemIcon>
          <MonetizationOnIcon />
        </ListItemIcon>
        <ListItemText primary="Price Filter" />
      </ListItem>
       <Divider/>
      {priceRangeArray.map((priceRange) => (
        <ListItem
          button
          key={priceRange.name}
          onClick={() =>
            handleMenuCloseCategoryDrawer(
               `/priceFilter/${priceRange.minPrice}`
              // `/minPrice/${priceRange.minPrice}/maxPrice/${priceRange.maxPrice}`
            )
          }
        >
          <ListItemText primary={`Min. price: ${priceRange.name}`} />
        </ListItem>
      ))}
    </List>
  </div>
);


  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>

 <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>

          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => history.push('/')}
          >
           <LocalCarWashIcon size='large' />
            {/* <Typography className={classes.title} variant="h6" style={{marginLeft: 2}} noWrap>
            VD
          </Typography> */}
            <Typography variant='h6' noWrap component='div' style={{ marginLeft: 1 }}>
              VD
            </Typography>
          </IconButton>
         
           
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search Cars…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
                onChange={handleChange} // Call handleChange on input change
              value={keyword} // Bind value to searchValue state
              onKeyPress={(e) => {
                if (e.key === 'Enter') submitSearchHandler();
              }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          
            <IconButton aria-label="Show cart Items" color="inherit" onClick={()=>history.push('/cart')}>
              {/* <Badge badgeContent={17} color="secondary"> */}
                <ShoppingCartIcon/>
              {/* </Badge> */}
            </IconButton>
             {/* ------------- Category --------------- */}
              <IconButton
              edge="end"
              aria-label="Admin"
              aria-controls={menuIdCategory}
              aria-haspopup="true"
              onClick={handleProfileMenuOpenCategory}
              color="inherit"
              style={{marginLeft: 20}}
            >
            <CategoryIcon/>
        
            </IconButton>

            {/* ------------- Regular User --------------- */}
          {
            userInfo ? (  <>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              style={{marginLeft: 20}}
            >
              <AccountCircle />
      <Typography textAlign='center' style={{marginLeft: 6}} >{userInfo?.name}</Typography>
            </IconButton>
           
            </>):
            (
             
              location.pathname === '/login' ? ( 
              <Button style={{marginLeft: 20, marginRight: 10, color: 'white'}} onClick={()=>history.push('/register')} >
                Register
              </Button>):( <Button style={{marginLeft: 20, marginRight: 10, color: 'white'}} onClick={()=>history.push('/login')} >
                Login
              </Button>)
             
            )
          }
            {/* ------------- Admin --------------- */}
          {
            userInfo && userInfo?.isAdmin &&     <>
            <IconButton
              edge="end"
              aria-label="Admin"
              aria-controls={menuIdAdmin}
              aria-haspopup="true"
              onClick={handleProfileMenuOpenAdmin}
              color="inherit"
              style={{marginLeft: 20, marginRight: 10}}
            >
            <SupervisorAccountIcon/>
        <Typography textAlign='center' style={{marginLeft: 6}} >Admin</Typography>
            </IconButton>
            </>
            
          }
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
       <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
            {list('left')}
          </Drawer>
      {renderMobileMenu}
      {renderMenu}
      {renderMenuAdmin}
      {renderMenuCategories}
      
    </div>
  );
}

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../assets/demo-logo.png'
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

function ElevationScroll(props) {
   const { children, window } = props;
   const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
   });
   return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
   });
}

const useStyles = makeStyles(theme => ({
   logo: {
      padding: 0,
      margin: 0,
      width: '6em',
      marginLeft: '5em'
   },
   tabsContainer: {
      marginLeft: 'auto'
   },
   tabItem: {
      fontWeight: '700',
      textDecoration: theme.palette.primary.main
   },
   menuContainer: {
      backgroundColor: theme.palette.primary.main,
      marginLeft: '1.5em',
      borderRadius: 0
   },
   menuItem: {
      fontStyle: 'Roboto',
      fontWeight: '400'
   }
}))

const Header = () => {
   const classes = useStyles()
   const [value, setValue] = useState(0)
   const [open, setOpen] = useState(false)
   const [anchorEl, setAnchorEl] = useState(null)

   const handleChange = (e, newValue) => {
      setValue(newValue)
   }

   const handleMouseOver = (e) => {
      setAnchorEl(e.currentTarget)
      setOpen(true)
   }

   const handleClose = () => {
      setAnchorEl(null)
      setOpen(false)
   }

   useEffect(() => {
      const path = window.location.pathname
      console.log(path)
      if (path === '/') {
         setValue(0)
      } else if (path === '/about') {
         setValue(2)
      }
   }, [])

   return (
      <ElevationScroll>
         <AppBar style={{ margin: 0, padding: 0 }} position="fixed">
            <Toolbar>
               <img src={logo} alt='logo' className={classes.logo} />
               <Tabs
                  component={Link}
                  to='/'
                  indicatorColor="primary"
                  className={classes.tabsContainer}
                  value={value}
                  onChange={handleChange}
                  aria-label="wrapped label tabs example">
                  <Tab
                     component={Link}
                     to='/'
                     className={classes.tabItem}
                     label="Main Page"
                     key="Main Page" />
                  <Tab
                     component={Link}
                     to='/'
                     className={classes.tabItem}
                     label="Catalog"
                     aria-controls="simple-menu"
                     aria-haspopup="true"
                     onMouseOver={(e) => handleMouseOver(e)}
                     key="Catalog" />
                  <Tab
                     component={Link}
                     to='/about'
                     className={classes.tabItem}
                     label="About"
                     key="About" />
               </Tabs>
               <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  MenuListProps={{ onMouseLeave: handleClose }}
                  open={open}
                  onMouseLeave={handleClose}
                  classes={{ paper: classes.menuContainer }}
               >
                  <MenuItem
                     className={classes.menuItem}
                     onClick={handleClose}>
                     Profile
                     </MenuItem>
                  <MenuItem
                     className={classes.menuItem}
                     onClick={handleClose}>
                     My account
                     </MenuItem>
                  <MenuItem
                     className={classes.menuItem}
                     onClick={handleClose}>
                     Logout
                     </MenuItem>
               </Menu>
            </Toolbar>
         </AppBar>
      </ElevationScroll>
      // <header>
      //    <Link to='/' className='logo'>Product Shop</Link>
      //    <nav className='nav_links'>
      //       <ul>
      //          <li><Link to='/'>Main Page</Link></li>
      //          <li><Link to='/about'>About</Link></li>
      //          <li className="header-catalog">
      //             <Link to='/'>Products Catalog</Link>
      //             <ul>
      //                <li><Link to='/'>shoes</Link></li>
      //                <li><Link to='/'>Shirts</Link></li>
      //                <li><Link to='/'>Pants</Link></li>
      //             </ul>
      //          </li>
      //       </ul>
      //    </nav>
      // </header>
   )
}

export default Header
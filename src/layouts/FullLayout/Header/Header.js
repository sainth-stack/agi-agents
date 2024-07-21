import React from "react";
//import { Link } from 'react-router-dom';

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Divider,
  ListItemIcon,
  Grid,
  Tab,
  Tabs,
} from "@mui/material";

import userimg from "../../../assets/images/users/user.jpg";
import { useLocation, useNavigate } from "react-router-dom";

const Header = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation()
  const navigate = useNavigate()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
    navigate('/auth/login')
  };

  const [currentTab, setCurrentTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    if (newValue === 0) {
      navigate('/start-design');
    } else {
      navigate('/graph-view');
    }
  };

  console.log(location)

  return (
    <AppBar sx={{...props.sx,borderBottom:'1px solid rgb(0 0 0 / 5%)'}} elevation={0} className={props.customClass}>
      <Toolbar>
       {(location.pathname =='/start-design' || location.pathname =="/graph-view" ) &&<Tabs
          value={currentTab}
          onChange={handleTabChange}
          sx={{
            marginTop: '10px',
            marginBottom: '10px',
            '& .MuiTabs-flexContainer': {
              display: 'flex',
              flexDirection: 'row',
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: '400',
              lineHeight: '24px',
              // fontFamily: 'Poppins',
              color: '#242424',
              margin: '4px',
              padding: '4px 10px',
              ':hover': {
                background: '#E6EDF5'
              }
            },
            '& .Mui-selected': {
              fontWeight: 700,
            },
            svg: {
              width: 16,
              height: 16,
            },
          }}
        >
          <Tab label="Text View" />
          <Tab label="Graphical View" />
        </Tabs>}

        <Box flexGrow={1} />


        <Grid
          onClick={()=>navigate('/start-design')}
          style={{ fontSize: '18px', marginRight: '10px', cursor: 'pointer', color: 'black' }}
        >
          Start Design
        </Grid>

        <Grid
          onClick={()=>navigate('/pricing')}
          style={{ fontSize: '18px', cursor: 'pointer', color: 'black', marginRight: '10px' }}
        >
          Pricing
        </Grid>
        {/* ------------------------------------------- */}
        {/* End Notifications Dropdown */}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
        {/* Profile Dropdown */}
        {/* ------------------------------------------- */}
        <Box
          sx={{
            width: "1px",
            backgroundColor: "rgba(0,0,0,0.1)",
            height: "25px",
            ml: 1,
          }}
        ></Box>
        <Button
          aria-label="menu"
          color="inherit"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleClick4}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              src={userimg}
              alt={userimg}
              sx={{
                width: "30px",
                height: "30px",
              }}
            />
          </Box>
        </Button>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl4}
          keepMounted
          open={Boolean(anchorEl4)}
          onClose={handleClose4}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "250px",
              right: 0,
              top: "70px !important",
            },
          }}
        >
          <MenuItem onClick={handleClose4} ml={2} sx={{ fontWeight: 500 }}>
            Sainath Reddy
          </MenuItem>
          <MenuItem onClick={handleClose4} ml={2} sx={{ fontWeight: 500 }}>
            sainathreddy@gmail.com
          </MenuItem>
          <MenuItem onClick={handleClose4} ml={2} sx={{ fontWeight: 500 }}>
            10 Credits
          </MenuItem>
          <Divider />
          {/* <MenuItem onClick={handleClose4}>
            <ListItemIcon>
              <PersonAddOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem> */}
          <MenuItem onClick={handleClose4}>
            <Avatar
              sx={{
                width: "24px",
                height: "24px",
              }}
            />
            <Box
              sx={{
                ml: 1.5,
              }}
              onClick={()=>navigate("/billing")}
            >
              Account & Billing
            </Box>
          </MenuItem>
          <MenuItem onClick={handleClose4}>
            <ListItemIcon>
              <SettingsOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleClose4}>
            <ListItemIcon>
              <LogoutOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

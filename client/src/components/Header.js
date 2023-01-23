import React, { useState } from 'react';
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate, useLocation, matchPath } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { authActions } from '../store';
axios.defaults.withCredentials = true

const Header = () => {
  const [value, setValue] = useState();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);

  const sendLogoutReq = async () => {
    const res = await axios.post('http://localhost:8000/api/logout', null, {
      withCredentials: true,
    });
    if (res.status == 200) {
      return res;
    }
    return new Error('Unable TO Logout. Please try again');
  };
  const handleLogout = () => {
    sendLogoutReq().then(() => dispatch(authActions.logout()));
  };

  function useRouteMatch(patterns) {
    const { pathname } = useLocation();

    for (let i = 0; i < patterns.length; i += 1) {
      const pattern = patterns[i];
      const possibleMatch = matchPath(pattern, pathname);
      if (possibleMatch !== null) {
        return possibleMatch;
      }
    }

    return null;
  }
  const routeMatch = useRouteMatch(['/login', '/signup', '/']);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h3">MernAuth</Typography>
          <Box sx={{ marginLeft: 'auto' }}>
            <Tabs
              indicatorColor="secondary"
              onChange={(e, val) => setValue(val)}
              value={currentTab}
              textColor="inherit"
            >
              {!isLoggedIn && (
                <>
                  <Tab
                    label="Login"
                    value="/login"
                    to="/login"
                    component={Link}
                  />
                  <Tab
                    label="Signup"
                    value="/signup"
                    to="/signup"
                    component={Link}
                  />
                </>
              )}
              {isLoggedIn && (
                <Tab
                  onClick= {handleLogout}
                  label="Logout"
                  value="/"
                  to="/"
                  component={Link}
                />
              )}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;

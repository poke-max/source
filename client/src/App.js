import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import MobileLayout from './containers/MobileLayout';
import DesktopLayout from './containers/DesktopLayout';
import { NavigationDesktop } from './components/Navigation';
import { DarkModeToggleDesktop } from './components/DarkModeToggle';
import PrivateRoute from './components/routing/PrivateRoute';
import BuildsDesktop from './components/builds/desktop/Builds';
import BuildsMobile from './components/builds/mobile/Builds';
import { theme, darkTheme } from './theme';
import { useSelector } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/actionCreators';

export default function App({ store }) {
  const darkMode = useSelector(state => state.darkMode.mode);
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
    }
  }, []);

  return (
    <Router>
      <ThemeProvider theme={darkMode ? darkTheme : theme}>
        <Hidden smDown>
          <NavigationDesktop />
          <DarkModeToggleDesktop />
          <Switch>
            <Route exact path="/" component={DesktopLayout} />
            <PrivateRoute exact path="/builds" component={BuildsDesktop} />
          </Switch>
        </Hidden>
        <Hidden mdUp>
          <Switch>
            <Route exact path="/" component={MobileLayout} />
            <PrivateRoute exact path="/builds" component={BuildsMobile} />
          </Switch>
        </Hidden>
      </ThemeProvider>
    </Router>
  );
}

import React, { useState, useEffect } from 'react';
import Bucket from './Bucket';
import Repo from './Repo';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Modal from '@material-ui/core/Modal';
import {
  Container,
  Button,
  Backdrop,
  CircularProgress,
  AppBar,
  Toolbar,
  Typography,
  Zoom,
  Fab,
  Breadcrumbs,
  Grid,
} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  fab: { position: 'fixed', bottom: theme.spacing(2), right: theme.spacing(2) },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  title: {
    flexGrow: 1,
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.fab}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const Home = ({ loading }) => {
  const [showBugComponent, setShowBugComponent] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const classes = useStyles();

  const handleClose = () => {};

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            Tarolok
          </Typography>
          <Button color="default" variant="outlined" onClick={() => setModalOpen(true)}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Backdrop className={classes.backdrop} open={loading} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth="xl" style={{ marginTop: 20 }}>
        <Router>
          <Route>
            {({ location }) => {
              const pathnames = location.pathname.split('/').filter((x) => x);
              return (
                <Breadcrumbs
                  separator={<NavigateNextIcon fontSize="small" />}
                  aria-label="Breadcrumb"
                >
                  <Link style={{ color: '#1c7c8c' }} style={{ color: '#1c7c8c' }} to="/">
                    commits
                  </Link>
                  {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                    return last ? (
                      <Typography color="primary" key={to}>
                        {value}
                      </Typography>
                    ) : (
                      <RouterLink style={{ color: '#1c7c8c' }} to={to} key={to}>
                        {value}
                      </RouterLink>
                    );
                  })}
                </Breadcrumbs>
              );
            }}
          </Route>
          <Route exact path="/">
            <Bucket />
          </Route>
          <Route path="/:repoName">
            <Repo />
          </Route>
        </Router>
      </Container>
      <Modal open={modalOpen} onClose={handleClose}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <div
            style={{
              width: 350,
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              height: 130,
            }}
          >
            <div>
              <Grid container spacing={3} justify="flex-end" alignItems="center">
                <Grid item>
                  <Typography variant="h5" align="center">
                    Do you really want to logout?
                  </Typography>
                </Grid>
                <Grid item>
                  <form method="get">
                    <Button
                      color="primary"
                      variant="outlined"
                      size="medium"
                      name="logout"
                      value="click"
                      type="submit"
                    >
                      Yes
                    </Button>
                  </form>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    size="medium"
                    onClick={() => setModalOpen(false)}
                    size="medium"
                    color="secondary"
                  >
                    No
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </Modal>
      <ScrollTop>
        <Fab color="secondary" size="medium" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>

      {showBugComponent && showBugComponent.field.notexist}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

export default connect(mapStateToProps)(Home);

import React, { useState, useEffect } from 'react';
import Bucket from './Bucket';
import Repo from './Repo';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCommitsFromRepo } from '../actions';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
  Grid,
  Container,
  TextField,
  Button,
  Backdrop,
  CircularProgress,
  Paper,
  AppBar,
  Toolbar,
  Typography,
  Zoom,
  Fab,
  Breadcrumbs,
} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  form: {
    padding: theme.spacing(4),
  },
  fab: { position: 'fixed', bottom: theme.spacing(2), right: theme.spacing(2) },
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
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

const Home = ({ loading, addCommitsFromRepo }) => {
  const [showBugComponent, setShowBugComponent] = useState(false);
  const classes = useStyles();

  const { register, handleSubmit } = useForm();

  const handleClose = () => {};

  const onSubmit = (res) => {
    const username = res.username;
    const repository = res.repository;
    addCommitsFromRepo(currentUser, `${username}@${repository}`);
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">Scroll to see button</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Backdrop className={classes.backdrop} open={loading} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth="xl" style={{ marginTop: 20 }}>
        <Paper className={classes.form} elevation={2} id="back-to-top-anchor">
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={3} justify="flex-start" alignItems="center">
              <Grid item>
                <TextField
                  inputRef={register}
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  name="username"
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item>
                <TextField
                  inputRef={register}
                  id="outlined-basic"
                  label="Repository"
                  variant="outlined"
                  name="repository"
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item>
                <Button size="large" color="primary" variant="contained" type="submit">
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Router>
          <Route>
            {({ location }) => {
              const pathnames = location.pathname.split('/').filter((x) => x);
              return (
                <Breadcrumbs
                  separator={<NavigateNextIcon fontSize="small" />}
                  aria-label="Breadcrumb"
                >
                  <Link color="primary" to="/">
                    Commits
                  </Link>
                  {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                    return last ? (
                      <Typography color="textPrimary" key={to}>
                        {value}
                      </Typography>
                    ) : (
                      <RouterLink color="primary" to={to} key={to}>
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

      <ScrollTop>
        <Fab
          style={{ justifySelf: 'flex-end' }}
          color="secondary"
          size="medium"
          aria-label="scroll back to top"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>

      {showBugComponent && showBugComponent.field.notexist}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCommitsFromRepo: (currentUser, repoName) => {
      dispatch(addCommitsFromRepo({ currentUser, repoName }));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

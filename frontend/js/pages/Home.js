import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBucket, setPage, setPageLimit, addCommitsFromRepo } from '../actions';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
FirstPageIcon;
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
  useTheme,
  IconButton,
} from '@material-ui/core/';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableFooter,
} from '@material-ui/core';
import { lineHeight } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(10),
  },
  table: {
    minWidth: 650,
    minHeight: 400,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  message: {
    maxWidth: '70ch',
    overflow: 'scroll',
    height: '2.8em',
    maxHeight: '2.8em',
  },
  form: {
    padding: theme.spacing(4),
  },
  fab: { position: 'fixed', bottom: theme.spacing(2), right: theme.spacing(2) },
  tablePagination: { flexShrink: 0, marginLeft: theme.spacing(2.5) },
}));

function TablePaginationActions(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.tablePagination}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

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

const Home = ({
  currentUser,
  commits,
  getBucket,
  addCommitsFromRepo,
  commitsCount,
  rowsPerPage,
  page,
  setPage,
  setPageLimit,
  loading,
}) => {
  const [showBugComponent, setShowBugComponent] = useState(false);
  const classes = useStyles();

  const { register, handleSubmit } = useForm();

  const handleClose = () => {};

  const onSubmit = (res) => {
    const username = res.username;
    const repository = res.repository;
    addCommitsFromRepo(currentUser, `${username}@${repository}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getBucket(currentUser, newPage, rowsPerPage);
  };
  const handleChangeRowsPerPage = (event) => {
    const rowsPerPage = parseInt(event.target.value, 10);
    setPageLimit(rowsPerPage);
    setPage(0);
    getBucket(currentUser, 0, rowsPerPage);
  };

  useEffect(() => {
    getBucket(currentUser, 0, rowsPerPage);
  }, []);

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">Scroll to see button</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Backdrop className={classes.backdrop} open={loading} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth="xl" style={{ marginTop: 20 }}>
        <Paper className={classes.form} elevation={2}>
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
        <TableContainer className={classes.paper} component={Paper} variant="outlined">
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Full name</TableCell>
                <TableCell align="left"> Message</TableCell>
                <TableCell align="left">Hash</TableCell>
                <TableCell align="center">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {commits.map((commit) => (
                <TableRow key={commit.sha} hover={true}>
                  <TableCell component="th" scope="row">
                    <Link to={`repos/${commit.repo}`}>{commit.repo.replace('@', '/')}</Link>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body2" className={classes.message}>
                      {commit.message}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">{commit.sha}</TableCell>
                  <TableCell align="center">{commit.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={4}
                  labelRowsPerPage="Repos per page"
                  rowsPerPageOptions={[5, 10, 25, 50, 100]}
                  count={commitsCount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
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
    getBucket: (currentUser, page, rowsPerPage) => {
      dispatch(getBucket({ currentUser, page, rowsPerPage }));
    },
    addCommitsFromRepo: (currentUser, repoName) => {
      dispatch(addCommitsFromRepo({ currentUser, repoName }));
    },
    setPage: (page) => {
      dispatch(setPage({ page }));
    },
    setPageLimit: (limit) => {
      dispatch(setPageLimit({ limit }));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    commits: state.commits,
    commitsCount: state.commitsCount,
    page: state.page,
    rowsPerPage: state.rowsPerPage,
    loading: state.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

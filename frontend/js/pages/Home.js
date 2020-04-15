import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getBucket, setPage, setPageLimit, addCommitsFromRepo } from '../actions';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Container,
  TextField,
  Button,
  Backdrop,
  CircularProgress,
  Paper,
} from '@material-ui/core/';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  table: {
    minWidth: 650,
    minHeight: 400,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

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
      <Backdrop className={classes.backdrop} open={loading} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth="xl" style={{ marginTop: 20 }}>
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
              />
            </Grid>
            <Grid item>
              <TextField
                inputRef={register}
                id="outlined-basic"
                label="Repository"
                variant="outlined"
                name="repository"
              />
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit">
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
        <Paper className={classes.paper}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Repository name</TableCell>
                  <TableCell align="left"> Message</TableCell>
                  <TableCell align="left">Hash</TableCell>
                  <TableCell align="center">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {commits.map((commit) => (
                  <TableRow key={commit.sha}>
                    <TableCell component="th" scope="row">
                      <Link to={`repos/${commit.repo}`}>{commit.repo.replace('@', '/')}</Link>
                    </TableCell>
                    <TableCell align="left">{commit.message}</TableCell>
                    <TableCell align="left">{commit.sha}</TableCell>
                    <TableCell align="center">{commit.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            labelRowsPerPage="Repos per page"
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={commitsCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>

      {showBugComponent && showBugComponent.field.notexist}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBucket: (currentUser, page, rowsPerPage) => {
      console.log('eae');
      dispatch(getBucket({ currentUser, page, rowsPerPage }));
    },
    addCommitsFromRepo: (currentUser, repoName) => {
      console.log('getfromrepo');
      dispatch(addCommitsFromRepo({ currentUser, repoName }));
    },
    setPage: (page) => {
      console.log('setpage');
      dispatch(setPage({ page }));
    },
    setPageLimit: (limit) => {
      console.log('setlimit');
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

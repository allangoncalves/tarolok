import React, { useState, useEffect } from 'react';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import api from '../services/api';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container, TextField, Button } from '@material-ui/core/';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 650,
  },
}));

const Home = () => {
  const [currentUser, setCurrentUser] = useState(window.$user);
  const [showBugComponent, setShowBugComponent] = useState(false);
  const [page, setPage] = useState(0);
  const [nextPage, setNextPage] = useState();
  const [previousPage, setPreviousPage] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [commitsTotal, setTotal] = useState(0);
  const [commits, setCommits] = useState([]);
  const classes = useStyles();

  const { register, handleSubmit } = useForm();

  const addRepo = (username, repository) => {
    return api.post(`watchers/${currentUser}/repositories/`, {
      full_name: `${username}@${repository}`,
    });
  };

  const getCommits = (currentUser, page, rowsPerPage) => {
    api
      .get(`watchers/${currentUser}/commits/?page=${page + 1}&limit=${rowsPerPage}`)
      .then((res) => {
        setCommits(res.data.results);
        setTotal(res.data.count);
        setNextPage(res.data.next);
        setPreviousPage(res.data.previous);
      });
  };

  const onSubmit = (res) => {
    const username = res.username;
    const repository = res.repository;
    addRepo(username, repository).then(() => {
      getCommits(currentUser, page, rowsPerPage);
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getCommits(currentUser, newPage, rowsPerPage);
  };
  const handleChangeRowsPerPage = (event) => {
    const rowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(rowsPerPage);
    setPage(0);
    getCommits(currentUser, page, rowsPerPage);
  };

  useEffect(() => {
    getCommits(currentUser, page, rowsPerPage);
  }, []);

  return (
    <>
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
          count={commitsTotal}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Container>

      {showBugComponent && showBugComponent.field.notexist}
    </>
  );
};

export default Home;

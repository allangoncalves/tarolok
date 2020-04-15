import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getBucket, setPage, setPageLimit, addCommitsFromRepo } from '../actions';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import CommitsTable from '../components/CommitsTable';
import { Typography, Paper, Grid, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  form: {
    padding: theme.spacing(4),
  },
}));

const Bucket = ({
  currentUser,
  commits,
  getBucket,
  commitsCount,
  rowsPerPage,
  page,
  setPage,
  setPageLimit,
  addCommitsFromRepo,
}) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
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
  const onSubmit = (res) => {
    const username = res.username;
    const repository = res.repository;
    addCommitsFromRepo(currentUser, `${username}@${repository}`);
  };
  useEffect(() => {
    getBucket(currentUser, 0, rowsPerPage);
  }, []);
  return (
    <>
      <div>
        <Typography variant="h5" align="center">
          {'Add as many Github repositories as you want to'}
        </Typography>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={3} justify="center" alignItems="center">
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
      </div>
      <CommitsTable
        commits={commits}
        page={page}
        rowsPerPage={rowsPerPage}
        commitsCount={commitsCount}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBucket: (currentUser, page, rowsPerPage) => {
      dispatch(getBucket({ currentUser, page, rowsPerPage }));
    },
    addCommitsFromRepo: (currentUser, repoName, page, rowsPerPage) => {
      dispatch(addCommitsFromRepo({ currentUser, repoName, page, rowsPerPage }));
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
export default connect(mapStateToProps, mapDispatchToProps)(Bucket);

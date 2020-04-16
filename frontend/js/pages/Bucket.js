import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getBucket,
  setPage,
  setPageLimit,
  addCommitsFromRepo,
  removeErrorMessage,
  showErrorMessage,
  showSuccessfulMessage,
  removeSuccessfulMessage,
} from '../actions';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import CommitsTable from '../components/CommitsTable';
import CloseIcon from '@material-ui/icons/Close';
import {
  Typography,
  Grid,
  TextField,
  Button,
  Snackbar,
  SnackbarContent,
  IconButton,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
  },
  form: {
    padding: theme.spacing(4),
  },
  errorSnackbar: {
    background: '#eb8474',
  },
  successfulSnackbar: {
    background: '#00233a',
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
  removeErrorMessage,
  showErrorMessage,
  error,
  removeSuccessfulMessage,
  message,
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
    if (username != '' && repository != '') {
      addCommitsFromRepo(currentUser, `${username}@${repository}`);
    } else {
      showErrorMessage('Please enter a username and a repository');
    }
  };
  const handleClose = () => {
    removeSuccessfulMessage();
    removeErrorMessage();
  };
  useEffect(() => {
    getBucket(currentUser, 0, rowsPerPage);
  }, []);
  return (
    <>
      <div className={classes.mainDiv}>
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
        {commits.length > 0 && (
          <CommitsTable
            commits={commits}
            page={page}
            rowsPerPage={rowsPerPage}
            commitsCount={commitsCount}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
        <Snackbar
          ContentProps={{
            classes: {
              root: classes.errorSnackbar,
            },
          }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          variant="error"
          key={`bottom, center`}
          open={error != ''}
          onClose={handleClose}
          message={error}
          autoHideDuration={4000}
          component={SnackbarContent}
          action={
            <IconButton color="primary" component="span" onClick={() => handleClose()}>
              <CloseIcon />
            </IconButton>
          }
        />
        <Snackbar
          ContentProps={{
            classes: {
              root: classes.successfulSnackbar,
            },
          }}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          key={`top, center`}
          open={message != ''}
          onClose={handleClose}
          message={message}
          autoHideDuration={4000}
          component={SnackbarContent}
          action={
            <IconButton color="secondary" component="span" onClick={() => handleClose()}>
              <CloseIcon />
            </IconButton>
          }
        />
      </div>
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
    removeErrorMessage: () => {
      dispatch(removeErrorMessage());
    },
    showErrorMessage: (message) => {
      dispatch(showErrorMessage({ message }));
    },
    showSuccessfulMessage: (message) => {
      dispatch(showSuccessfulMessage({ message }));
    },
    removeSuccessfulMessage: () => {
      dispatch(removeSuccessfulMessage());
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
    error: state.error,
    message: state.message,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Bucket);

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import api from '../services/api';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container, TextField, Button } from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const watcher = 'allangoncalves';

const Home = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showBugComponent, setShowBugComponent] = useState(false);
  const [trueOrFalse, setTrueOrFalse] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [commits, setCommits] = useState([]);
  const classes = useStyles();

  const { register, handleSubmit } = useForm();

  const addRepo = (username, repository) => {
    return api.post(`watchers/${watcher}/repositories/`, {
      full_name: `${username}@${repository}`,
    });
  };

  const getCommits = (watcher) => {
    api.get(`watchers/${watcher}/commits/`).then((res) => {
      setCommits(res.data.results);
    });
  };

  const onSubmit = (res) => {
    const username = res.username;
    const repository = res.repository;
    addRepo(username, repository).then(() => {
      getCommits(watcher);
    });
  };
  useEffect(() => {
    setCurrentUser(window.$user);
    getCommits(watcher);
  }, []);

  return (
    <>
      <Container maxWidth="lg" style={{ marginTop: 20 }}>
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
        <div style={{ marginTop: 20 }}>
          <ul>
            {commits.map((commit) => (
              <li key={commit.sha}>{commit.message}</li>
            ))}
          </ul>
        </div>
      </Container>

      {showBugComponent && showBugComponent.field.notexist}
    </>
  );
};

export default Home;

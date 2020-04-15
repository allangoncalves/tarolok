import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#1d7a8c',
  },
  card: {
    maxWidth: 400,
    width: 400,
    minHeight: 400,
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'space-between',
    textAlign: 'center',
    backgroundColor: '#ed8175',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const Login = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <div>
          <Paper elevation={1} className={classes.card}>
            <div>
              <Typography variant="h4">Tarolok</Typography>
              <Typography variant="h6" className={classes.pos} color="textSecondary">
                Repository monitor
              </Typography>
            </div>
            <div>
              <Typography variant="body1" className={classes.pos} color="textSecondary">
                Tarolok creates a bucket for you to insert commits and monitor any public Github repository.
              </Typography>
            </div>
            <form method="get">
              <Button
                startIcon={<GitHubIcon />}
                variant="outlined"
                name="login"
                value="click"
                type="submit"
              >
                Login
              </Button>
            </form>
          </Paper>
        </div>
      </div>
    </>
  );
};

export default Login;

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
    minWidth: 400,
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
              <Typography variant="h5" component="h2">
                Tarolok
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Repository monitor
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

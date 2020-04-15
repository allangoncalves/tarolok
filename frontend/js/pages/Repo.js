import React, { useEffect, useState } from 'react';
import { getCommitsFromRepo } from '../actions';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Divider, Fab, Icon } from '@material-ui/core';

const Repo = ({ repository, getCommitsFromRepo }) => {
  let { repoName } = useParams();
  const [currentUser, setCurrentUser] = useState(window.$user);
  useEffect(() => {
    getCommitsFromRepo(currentUser, repoName);
  }, []);
  return (
    <div>
      <p>{repoName.replace('@', '/')}</p>
      <Fab>
        <Icon>angle_left</Icon>
      </Fab>
      <ul>
        {repository.commits.map((commit) => (
          <li key={commit.sha}>{commit.message}</li>
        ))}
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCommitsFromRepo: (currentUser, repoName) => {
      dispatch(getCommitsFromRepo({ currentUser, repoName }));
    },
  };
};
const mapStateToProps = (state) => {
  return { repository: state.repository };
};

export default connect(mapStateToProps, mapDispatchToProps)(Repo);

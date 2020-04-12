import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Divider, Fab, Icon } from '@material-ui/core';

const Repo = () => {
  let { repoName } = useParams();
  const [currentUser, setCurrentUser] = useState(window.$user);
  const [commits, setCommits] = useState([]);
  useEffect(() => {
    api.get(`watchers/${currentUser}/repositories/${repoName}/`).then((res) => {
      console.log(res.data.commits);
      setCommits(res.data.commits);
    });
  }, []);
  return (
    <div>
      <p>{repoName.replace('@', '/')}</p>
      <Fab>
        <Icon>angle_left</Icon>
      </Fab>
      <ul>
        {commits.map((commit) => (
          <li key={commit.sha}>{commit.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Repo;

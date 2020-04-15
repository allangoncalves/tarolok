import React, { useEffect, useState } from 'react';
import CommitsTable from '../components/CommitsTable';
import { getCommitsFromRepo } from '../actions';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Typography } from '@material-ui/core';

const Repo = ({ repository, getCommitsFromRepo, currentUser }) => {
  let { repoName } = useParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getCommitsFromRepo(currentUser, repoName, newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const rowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(rowsPerPage);
    setPage(0);
    getCommitsFromRepo(currentUser, repoName, 0, rowsPerPage);
  };

  useEffect(() => {
    getCommitsFromRepo(currentUser, repoName, page, rowsPerPage);
  }, []);

  return (
    <>
      <Typography variant="h5" align="center" justify="center">
        {`All commits from ${repoName}`}
      </Typography>
      <CommitsTable
        commits={repository.commits}
        page={page}
        rowsPerPage={rowsPerPage}
        commitsCount={repository.commitsCount}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        hideRepoName={true}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCommitsFromRepo: (currentUser, repoName, page, rowsPerPage) => {
      dispatch(getCommitsFromRepo({ currentUser, repoName, page, rowsPerPage }));
    },
  };
};
const mapStateToProps = (state) => {
  return { repository: state.repository, currentUser: state.currentUser };
};

export default connect(mapStateToProps, mapDispatchToProps)(Repo);

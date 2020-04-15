import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getBucket, setPage, setPageLimit } from '../actions';
import CommitsTable from '../components/CommitsTable';
import { Typography } from '@material-ui/core';

const Bucket = ({
  currentUser,
  commits,
  getBucket,
  commitsCount,
  rowsPerPage,
  page,
  setPage,
  setPageLimit,
}) => {
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
      <Typography variant="body1" align="center" justify="center">
        {'All commits registered'}
      </Typography>
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
    addCommitsFromRepo: (currentUser, repoName) => {
      dispatch(addCommitsFromRepo({ currentUser, repoName }));
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

import React from 'react';
import TablePaginationActions from './TablePaginationActions';
import { Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableFooter,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(10),
  },
  table: {
    minWidth: 650,
    minHeight: 400,
  },
  message: {
    maxWidth: '70ch',
    overflow: 'scroll',
    height: '2.8em',
    maxHeight: '2.8em',
  },
  tablePagination: { flexShrink: 0, marginLeft: theme.spacing(2.5) },
}));

const CommitsTable = ({
  commits,
  commitsCount,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const classes = useStyles();
  return (
    <TableContainer className={classes.paper} component={Paper} variant="outlined">
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Full name</TableCell>
            <TableCell align="left"> Message</TableCell>
            <TableCell align="left">Hash</TableCell>
            <TableCell align="center">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {commits.map((commit) => (
            <TableRow key={commit.sha} hover={true}>
              <TableCell component="th" scope="row">
                <Link to={`/${commit.repo}`}>{commit.repo.replace('@', '/')}</Link>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body2" className={classes.message}>
                  {commit.message}
                </Typography>
              </TableCell>
              <TableCell align="left">{commit.sha}</TableCell>
              <TableCell align="center">{commit.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={4}
              labelRowsPerPage="Repos per page"
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              count={commitsCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default CommitsTable;

import React from 'react';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { push } from 'connected-react-router';
import Master from 'pages/common/Master';
import ListIcon from '@material-ui/icons/List';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => (
  {
    root: {
      display: 'flex'
    },
    grid: {
      textAlign: 'center'
    }
  }
));

const mapDispatchToProps = (dispatch) => {
  return {
    push: (url) => { dispatch(push(url)) }
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.common && "errors" in state.common ? state.common.errors : null,
  };
}

function Component(props) {
  const classes = useStyles();

  useEffect(() => {
  }, []);

  const redirectToHome = (event) => {
    props.push('/');
  }

  return (
    <Master>
      <div className={classes.root}>
        <Grid container className={classes.grid} spacing={4} direction="row" justify="center"
          alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h5" component="h5">
              Something went wrong
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.grid} spacing={4} direction="row" justify="center"
              alignItems="center">
              <Grid item xs={12} sm={4}>
                <Button
                  variant="contained" color="secondary"
                  className={classes.button}
                  startIcon={<ListIcon />}
                  fullWidth
                  onClick={redirectToHome}
                >
                  Go to Home Page
                  </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Master>
  );
}

const ErrorPage = connect(mapStateToProps, mapDispatchToProps)(Component);
export default ErrorPage;

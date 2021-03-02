import React from "react";
import { Button, ButtonGroup, Grid, makeStyles, Snackbar, Typography } from '@material-ui/core';
import { push } from 'connected-react-router';
import Loader from 'pages/common/Loader';
import Master from 'pages/common/Master';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import RecipeCard from './components/RecipeCard';
import SearchBar from './components/SearchBar';
import Toast from "pages/common/Toast";

const useStyles = makeStyles(theme => (
  {
    root: {
      display: 'flex'
    },
    gridWrapper: {
    }
  }
));

const mapDispatchToProps = (dispatch) => {
  return {
    push: (url) => { dispatch(push(url)) }
  }
}

const mapStoreStateToProps = (storeState) => {
  return {
    pageLoader: storeState.common.pageLoader,
    recipes: storeState.common.recipes,
    errors: storeState.common.errors,
    totalPages: storeState.common.totalPages,
    pageNo: storeState.common.pageNo,
  };
}

function Component(props) {
  const classes = useStyles();

  useEffect(() => {
    document.title = `Hungry Palowan`;
  }, []);

  return (
    <Master>
      <div className={classes.root}>
        <Grid container className={classes.gridWrapper} spacing={4} direction="row" justify="center"
          alignItems="center">
          <Grid item xs={12}>
            <SearchBar />
          </Grid>
          {
            props.pageLoader &&
            <Loader />
          }
          {
            (!props.pageLoader && props.recipes.length) ?
              <React.Fragment>
                <Grid item xs={12}>
                  <Grid
                    container
                    spacing={4}
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    {
                      props.recipes.map((recipe, index) => {
                        return (<Grid key={index} item xs={12} sm={8}>
                          <RecipeCard recipe={recipe} />
                        </Grid>);
                      })
                    }
                  </Grid>
                </Grid>
              </React.Fragment> : <React.Fragment>&nbsp;</React.Fragment>
          }
          {
            props.totalPages &&
            <React.Fragment>
              <Grid item xs={8}>
                <Grid
                  container
                  spacing={4}
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={4}>
                    <Button variant="contained" color="secondary" fullWidth
                    disabled={(props.pageNo === 0) ? true : false}
                    >Previous</Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography gutterBottom variant="button" component="h2" align="center" style={{ width: "100%" }}>
                      Page {parseInt(props.pageNo,10)+1} of {props.totalPages}
                            </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Button variant="contained" color="secondary" fullWidth
                    disabled={(props.pageNo >= props.totalPages) ? true : false}
                    >Next</Button>
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment>
          }
        </Grid>
      </div>
      {
        props.errors &&
        <Toast errors={props.errors} />
      }
    </Master>
  );
}

const App = connect(mapStoreStateToProps, mapDispatchToProps)(Component);
export default App;

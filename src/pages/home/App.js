import React from "react";
import { Grid, makeStyles } from '@material-ui/core';
import { push } from 'connected-react-router';
import Loader from 'pages/common/Loader';
import Master from 'pages/common/Master';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import RecipeCard from './components/RecipeCard';
import SearchBar from './components/SearchBar';

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
                          <RecipeCard recipe={recipe}/>
                        </Grid>);
                      })
                    }
                  </Grid>
                </Grid>
              </React.Fragment> : <React.Fragment>&nbsp;</React.Fragment>
          }
        </Grid>
      </div>
    </Master>
  );
}

const App = connect(mapStoreStateToProps, mapDispatchToProps)(Component);
export default App;

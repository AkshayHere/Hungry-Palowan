import React from "react";
import { Button, ButtonGroup, Fab, Grid, makeStyles, Snackbar, Typography } from '@material-ui/core';
import { push } from 'connected-react-router';
import Loader from 'pages/common/Loader';
import Master from 'pages/common/Master';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import RecipeCard from './components/RecipeCard';
import SearchBar from './components/SearchBar';
import Toast from "pages/common/Toast";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { searchRecipes, setPageNo } from "redux/actions";

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
    push: (url) => { dispatch(push(url)) },
    setPageNo: (payload) => { dispatch(setPageNo(payload)) },
    searchRecipes: (payload) => { dispatch(searchRecipes(payload)) },
  }
}

const mapStoreStateToProps = (storeState) => {
  return {
    pageLoader: storeState.common.pageLoader,
    recipes: storeState.common.recipes,
    errors: storeState.common.errors,
    totalPages: storeState.common.totalPages,
    pageNo: storeState.common.pageNo,
    searchText: storeState.common.searchText,
    searchOption: storeState.common.searchOption ,
  };
}

function Component(props) {
  const classes = useStyles();

  useEffect(() => {
    document.title = `Hungry Palowan`;
  }, []);

  const handlePageAdd = () =>{
    // console.log("handlePageAdd");
    // console.log("props.pageNo", props.pageNo);
    let newPageNo = parseInt(props.pageNo,10) + 1;
    let searchText = props.searchText;
    // console.log("newPageNo",newPageNo);
    props.setPageNo(newPageNo);

    let payload = {};
    payload['name'] = searchText;
    payload['pageNo'] = newPageNo;
    payload['ingredients'] = [];
    props.searchRecipes(payload);
  };
  
  const handlePageDiff = () =>{
    // console.log("handlePageDiff");
    let newPageNo = parseInt(props.pageNo,10) - 1;
    let searchText = props.searchText;
    // console.log("newPageNo",newPageNo);
    props.setPageNo(newPageNo);

    let payload = {};
    payload['name'] = searchText;
    payload['pageNo'] = newPageNo;
    payload['ingredients'] = [];
    props.searchRecipes(payload);
  };

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
            !props.pageLoader && props.totalPages && (props.searchOption === "searchByName") ?
            <React.Fragment>
              <Grid item sm={8} xs={12}>
                <Grid
                  container
                  spacing={4}
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={9} sm={4}>
                    <Fab color="secondary" size="small" disabled={(props.pageNo === 0) ? true : false} onClick={handlePageDiff}>
                      <ChevronLeftIcon />
                    </Fab>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                        Page {parseInt(props.pageNo, 10) + 1} of {props.totalPages}
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Fab color="secondary" size="small" disabled={(props.pageNo >= (props.totalPages - 1)) ? true : false} onClick={handlePageAdd}>
                      <ChevronRightIcon />
                    </Fab>
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment> : <div>&nbsp;</div>
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

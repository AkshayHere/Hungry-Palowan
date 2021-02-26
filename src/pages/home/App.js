import { Grid, makeStyles } from '@material-ui/core';
import { push } from 'connected-react-router';
import Loader from 'pages/common/Loader';
import Master from 'pages/common/Master';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SearchBar from './components/SearchBar';
// import './App.css';

// import AllPosts from './components/AllPosts';

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

const mapStateToProps = (state) => {
  return {
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
            {/* <AllPosts /> */}
            <SearchBar />
          </Grid>
        </Grid>
      </div>
    </Master>
  );
}

const App = connect(mapStateToProps, mapDispatchToProps)(Component);
export default App;

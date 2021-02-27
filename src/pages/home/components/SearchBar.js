import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import SearchIcon from '@material-ui/icons/Search';

import Loader from "pages/common/Loader";

import { connect } from "react-redux";
import { searchRecipes, searchRecipesByIngredients } from "redux/actions";
import { FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from "@material-ui/core";

const mapStoreStateToProps = (storeState) => {
  return {
    loading: storeState.loading,
    pageNo: storeState.pageNo,
    searchParams: storeState.searchParams,
    recipes: storeState.recipes,
  };
};

const mapDispatchToStore = (dispatch) => {
  return {
    searchRecipes: (payload) => dispatch(searchRecipes(payload)),
    searchRecipesByIngredients: (payload) =>
      dispatch(searchRecipesByIngredients(payload)),
  };
};

const styles = {
  gridWrapper: {
    flexGrow: 1,
    margin: "10px",
  },
  options: {
    "&&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    }
  }
};

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: "",
      age: ""
    };
  }

  handleSelectChange = (event) => {
    let payload = event.target.value;

    this.setState({
      age: payload
    });
  };

  // Handle text change
  handleTextChange = (event) => {
    let payload = event.target.value;

    this.setState({
      searchName: payload,
    });

    // this.props.setSearchParam(payload);
    // this.props.searchImages(payload);
  };

  handleFetchMore = () => {
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid
          container
          spacing={4}
          direction="row"
          justify="center"
          className={classes.gridWrapper}
          alignItems="center"
        >
          <Grid item xs={12} md={8}>
            <TextField
              size="large"
              fullWidth
              inputProps={{
                style: { height: "30px", fontSize: "20px" },
                placeholder: "Search Recipes !!",
              }}
              onChange={this.handleTextChange}
              value={this.props.searchParams}
              InputProps={{
            startAdornment:
              <InputAdornment position="start">
                  <Select
                    id="demo-simple-select-outlined"
                    value={this.state.age}
                    onChange={this.handleSelectChange}
                    label="Age"
                    displayEmpty 
                    className={classes.options}
                  >
                    <MenuItem value="">
                      <em>Search Options</em>
                    </MenuItem>
                    <MenuItem value={"searchByName"}>Search by Name</MenuItem>
                    <MenuItem value={"searchByIngredients"}>Search by Ingredients</MenuItem>
                  </Select>
                </InputAdornment>,
          }}
            />
          </Grid>
        </Grid>
        {this.props.loading && <Loader />}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(
  connect(mapStoreStateToProps, mapDispatchToStore)(SearchBar)
);

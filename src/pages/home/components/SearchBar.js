import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from 'classnames';
import { IconButton, InputAdornment, Grid, MenuItem, TextField, Select, FormControl, FormHelperText, InputLabel, Button, Typography, Chip, Avatar } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

import { connect } from "react-redux";
import { setSearchText, setSearchOption, setIngredients, deleteIngredients, searchRecipes } from "redux/actions";

import { isEmpty, without } from "lodash";
import ChipInput from "material-ui-chip-input";

const mapStoreStateToProps = (storeState) => {
  return {
    searchText: storeState.common.searchText,
    searchOption: storeState.common.searchOption,
    ingredients: storeState.common.ingredients,
    loading: storeState.common.loading,
    pageNo: storeState.common.pageNo,
    searchParams: storeState.common.searchParams,
    recipes: storeState.common.recipes,
  };
};

const mapDispatchToStore = (dispatch) => {
  return {
    setSearchText: (payload) => dispatch(setSearchText(payload)),
    setSearchOption: (payload) => dispatch(setSearchOption(payload)),
    setIngredients: (payload) => dispatch(setIngredients(payload)),
    deleteIngredients: (payload) => dispatch(deleteIngredients(payload)),
    searchRecipes: (payload) => dispatch(searchRecipes(payload))
  };
};

const styles = {
  options: {
    "&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    }
  },
};

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      errorSearchText: false,
      errorSearchOptions: false,
    };
  }

  // For resetting errors
  resetErrors = () => {
    this.setState({
      errorSearchText: false,
      errorSearchOptions: false,
    });
  }

  //----- START CHIPS
  // Add Chips
  handleAddChip = (chip) => {
    this.props.setIngredients(chip);
  }
  
  // Delete Chips
  handleDeleteChip = (chip) => {
    this.props.deleteIngredients(chip);
  }
  //----- END CHIPS

  handleSelectChange = (event) => {
    this.resetErrors();
    let payload = event.target.value;
    this.props.setSearchOption(payload);
  };

  // Handle text change
  handleTextChange = (event) => {
    this.resetErrors();
    this.props.setSearchText(event.target.value);
  };

  // handle serach
  handleSearch = () => {
    this.resetErrors();
    console.log("this.props.searchText", this.props.searchText);
    console.log("this.props.searchOption", this.props.searchOption);
    if (isEmpty(this.props.searchOption)) {
      console.log("1");
      this.setState({
        errorSearchOptions: true
      });
      return;
    }

    // handle search by name
    if (isEmpty(this.props.searchText) && (this.props.searchOption === "searchByName")) {
      console.log("2a");
      this.setState({
        errorSearchText: true
      });
      return;
    }
    
    // handle search by name
    if (isEmpty(this.props.ingredients) && (this.props.searchOption === "searchByIngredients")) {
      console.log("2b");
      this.setState({
        errorSearchText: true
      });
      return;
    }
    console.log("3");

    let ingredients = this.props.ingredients;
    console.log("ingredients", ingredients);
    let name = this.props.searchText;
    console.log("name",name);

    let payload = {};
    payload['name'] = name;
    payload['ingredients'] = ingredients;

    this.props.searchRecipes(payload);
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
          alignItems="center"
        >
          <Grid item xs={12} md={8}>
            <FormControl className={classes.formControl} fullWidth
              error={(this.state.errorSearchOptions ? true : false)}>
              <Select
                id="searchOptions"
                value={this.props.searchOption}
                onChange={this.handleSelectChange}
                variant="outlined"
                displayEmpty
                defaultValue=""
                className={classes.options}
              >
                <MenuItem value={""}>
                  <em>Search Options</em>
                </MenuItem>
                <MenuItem value={"searchByName"}>Search by Name</MenuItem>
                <MenuItem value={"searchByIngredients"}>Search by Ingredients</MenuItem>
              </Select>
              <FormHelperText>{this.state.errorSearchOptions ? "* Required" : ""}</FormHelperText>
            </FormControl>
          </Grid>
          {/* Search Recipes by Name */}
          {
            this.props.searchOption === "searchByName" &&
            <Grid item xs={12} md={8}>
              <TextField
                size="medium"
                fullWidth
                inputProps={{
                  style: { height: "30px", fontSize: "20px" },
                  placeholder: "Search Recipes",
                }}
                error={((this.state.errorSearchText && this.props.searchOption === "searchByName") ? true : false)}
                helperText={((this.state.errorSearchText && this.props.searchOption === "searchByName") ? "* Required" : "")}
                onChange={this.handleTextChange}
                value={this.props.searchText}
              />
            </Grid>
          }
          {/* Search Recipes by Ingredients */}
          {
            this.props.searchOption === "searchByIngredients" &&
            <Grid item xs={12} md={8}>
            <ChipInput
              fullWidth
              placeholder="Enter Ingredients here"
              label="Ingredients"
              value={this.props.ingredients}
              onAdd={(chip) => this.handleAddChip(chip)}
              onDelete={(chip, index) => this.handleDeleteChip(chip, index)}
              error={((this.state.errorSearchText && this.props.searchOption === "searchByIngredients") ? true : false)}
              helperText={((this.state.errorSearchText && this.props.searchOption === "searchByIngredients") ? "* Required" : "")}
              />
            </Grid>
          }
          <Grid item xs={12} md={8}>
            <Button variant="contained" color="secondary" fullWidth onClick={this.handleSearch}>
              <SearchIcon />&nbsp;&nbsp;Search Recipes
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(
  connect(mapStoreStateToProps, mapDispatchToStore)(SearchBar)
);

import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";

import Loader from 'pages/common/Loader';

import { connect } from 'react-redux';
import { searchRecipes, searchRecipesByIngredients } from 'redux/actions'

const mapStoreStateToProps = (storeState) => {
    return {
        loading: storeState.loading,
        pageNo: storeState.pageNo,
        searchParams: storeState.searchParams,
        recipes: storeState.recipes
    }
}

const mapDispatchToStore = (dispatch) => {
    return {
        searchRecipes: (payload) => dispatch(searchRecipes(payload)),
        searchRecipesByIngredients: (payload) => dispatch(searchRecipesByIngredients(payload)),
        // searchImages: (payload) => dispatch(searchImages(payload)),
    }
}

const styles = {
    gridWrapper: {
        flexGrow: 1,
        margin: "10px"
    }
};

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchName: ""
        };
    }

    handleChange = event => {
        let payload = event.target.value

        this.setState({
            searchName: payload
        });

        this.props.setSearchParam(payload);
        this.props.searchImages(payload);
    };

    handleFetchMore = () => {
        const { offset } = this.props;

        let payload = offset + 8;
        this.props.setOffset(payload);
        this.props.searchImages(payload);
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Grid container spacing={4} direction="row" justify="center"
                    className={classes.gridWrapper}
                    alignItems="center">
                    <Grid item xs={12} md={8}>
                        <TextField
                            size="large" fullWidth
                            inputProps={{ style: { height: "30px", fontSize: "30px" }, placeholder: "Search Recipes !!" }}
                            onChange={this.handleChange}
                            value={this.props.searchParams}
                        />
                    </Grid>
                </Grid>
                {
                    this.props.loading && <Loader />
                }
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(connect(mapStoreStateToProps, mapDispatchToStore)(SearchBar));

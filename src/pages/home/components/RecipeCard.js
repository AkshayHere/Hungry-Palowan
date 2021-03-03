import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { connect } from "react-redux";
import { Grid, Paper } from '@material-ui/core';
import { isEmpty } from 'lodash';
import RecipeDetails from './RecipeDetails';

const mapStoreStateToProps = (storeState) => {
    return {
        //   searchText: storeState.common.searchText,
    };
};

const mapDispatchToStore = (dispatch) => {
    return {
        //   setSearchText: (payload) => dispatch(setSearchText(payload)),
    };
};

const useStyles = makeStyles({
    root: {
        // maxWidth: 345,
    },
    media: {
        height: 220,
        width: "100%"
    },
});

function RecipeCard(props) {
    const classes = useStyles();
    // console.log('props.recipe', props.recipe);

    let nutrition = "nutrition" in props.recipe ? props.recipe.nutrition : {};
    let Carbs = {};
    let Fat = {};
    let Protein = {};
    let Calories = {};
    if (!isEmpty(nutrition)) {
        let nutrients = "nutrients" in nutrition && nutrition.nutrients;
        // console.log("nutrients", nutrients);
        if (!isEmpty(nutrients)) {
            Carbs = nutrients.find(nutrient => { return nutrient["name"] === "Carbohydrates" });
            Fat = nutrients.find(nutrient => { return nutrient["name"] === "Fat" });
            Protein = nutrients.find(nutrient => { return nutrient["name"] === "Protein" });
            Calories = nutrients.find(nutrient => { return nutrient["name"] === "Calories" });
        }
    }

    const handleDetails = () => {
        console.log('handleDetails');
    };

    return (
        <React.Fragment>
            <Paper elevation={3}>
                <Grid container className={classes.gridWrapper} spacing={0} direction="row" justify="center"
                    alignItems="center">
                    <Grid item md={4} xs={12}>
                        <CardMedia
                            className={classes.media}
                            image={props.recipe.image}
                            title={props.recipe.title}
                            alt={props.recipe.title}
                        />
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {props.recipe.title}
                            </Typography>
                            <span>Carbs : {('amount' in Carbs && Carbs['amount']) ? Carbs['amount']+" "+Carbs['unit'] : ""}</span><br/>
                            <span>Fat : {('amount' in Fat && Fat['amount']) ? Fat['amount']+" "+Fat['unit'] : ""}</span><br/>
                            <span>Protein : {('amount' in Protein && Protein['amount']) ? Protein['amount']+" "+Protein['unit'] : ""}</span><br/>
                            <span>Calories : {('amount' in Calories && Calories['amount']) ? Calories['amount']+" "+Calories['unit'] : ""}</span><br/>
                        </CardContent>
                        <CardActions style={{paddingLeft : "12px"}}>
                            <RecipeDetails handleDetails={handleDetails} recipe={props.recipe} recipeID={props.recipe.id}/>
                        </CardActions>
                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    );
}

export default connect(mapStoreStateToProps, mapDispatchToStore)(RecipeCard);
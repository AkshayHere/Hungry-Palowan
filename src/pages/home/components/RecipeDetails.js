import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import { connect } from "react-redux";
import { CardMedia, Grid } from '@material-ui/core';
import { getRecipeDetails, resetRecipeDetails } from 'redux/actions';
import Loader from 'pages/common/Loader';
import { isEmpty } from 'lodash';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const mapStoreStateToProps = (storeState) => {
    return {
        pageLoader: storeState.common.pageLoader,
        currentRecipe: storeState.common.currentRecipe,
    };
};

const mapDispatchToStore = (dispatch) => {
    return {
        getRecipeDetails: (payload) => dispatch(getRecipeDetails(payload)),
        resetRecipeDetails: (payload) => dispatch(resetRecipeDetails(payload)),
    };
};

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const useStyles = makeStyles({
    root: {
        // maxWidth: 345,
    },
    media: {
        height: 220,
        width: "100%"
    },
});


function RecipeDetails(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        // get receipe details
        let payload = {};
        payload['id'] = props.recipeID;
        props.getRecipeDetails(payload);
        props.handleDetails();
    };

    const handleClose = () => {
        setOpen(false);
        // reset receipe details
        props.resetRecipeDetails();
    };

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                View Recipe
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth maxWidth={"md"}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {props.recipe.title}
                </DialogTitle>
                <DialogContent dividers>
                    {
                        isEmpty(props.currentRecipe) && <div>Loading...</div>
                    }
                    {
                        !isEmpty(props.currentRecipe) &&
                        <Grid container spacing={2} direction="row" justify="center"
                            alignItems="center">
                            <Grid item md={4} xs={12}>
                                <CardMedia
                                    className={classes.media}
                                    image={props.recipe.image}
                                    title={props.recipe.title}
                                />
                            </Grid>
                            <Grid item md={8} xs={12}>
                                <Grid item xs={12}>
                                    <span>Servings : {('servings' in props.currentRecipe && props.currentRecipe['servings']) ? props.currentRecipe['servings'] : ""}</span><br />
                                    <span>Ready in {('readyInMinutes' in props.currentRecipe && props.currentRecipe['readyInMinutes']) ? props.currentRecipe['readyInMinutes'] : ""} minutes</span>
                                    <br />
                                    <br />
                                    <span>Health score : {('healthScore' in props.currentRecipe && props.currentRecipe['healthScore']) ? props.currentRecipe['healthScore'] : ""}</span><br />
                                    <span>Spoonacular score : {('spoonacularScore' in props.currentRecipe && props.currentRecipe['spoonacularScore']) ? props.currentRecipe['spoonacularScore'] : ""}</span><br />
                                    <span>Price Per Serving : {('pricePerServing' in props.currentRecipe && props.currentRecipe['pricePerServing']) ? "$" + props.currentRecipe['pricePerServing'] : ""}</span><br />
                                    <span>Vegetarian : {('vegetarian' in props.currentRecipe && props.currentRecipe['vegetarian']) ? "True" : "False"}</span><br />
                                    <span>Gluten Free : {('glutenFree' in props.currentRecipe && props.currentRecipe['glutenFree']) ? "True" : "False"}</span><br />
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                {('summary' in props.currentRecipe && props.currentRecipe['summary']) ?
                                    <React.Fragment>
                                        <Typography gutterBottom variant="body1" component="h5">
                                            Summary
                                        </Typography>
                                        <div dangerouslySetInnerHTML={{ __html: props.currentRecipe['summary'] }} />
                                    </React.Fragment>
                                    : ""}
                            </Grid>
                            <Grid item xs={12}>
                                {('winePairing' in props.currentRecipe && !isEmpty(props.currentRecipe['winePairing'])) ?
                                    <React.Fragment>
                                        <Typography gutterBottom variant="body1" component="h5">
                                            Wine Pairing
                                        </Typography>
                                        <span>{('pairingText' in props.currentRecipe['winePairing'] && props.currentRecipe['winePairing']['pairingText']) ? props.currentRecipe['winePairing']['pairingText'] : "Cannot find any Wine Pairing"}</span><br />
                                    </React.Fragment>
                                    : ""}
                            </Grid>
                            <Grid item xs={12}>
                                {('extendedIngredients' in props.currentRecipe && props.currentRecipe['extendedIngredients'].length) ?
                                    <React.Fragment>
                                        <Typography gutterBottom variant="body1" component="h5">
                                            Ingredients
                                        </Typography>
                                        <ul>
                                            {
                                                props.currentRecipe['extendedIngredients'].map((ingredient, key) => {
                                                    return (
                                                        <li key={key}>
                                                            <Typography gutterBottom variant="body2" component="h5">
                                                                {ingredient['originalString']}
                                                            </Typography>
                                                        </li>);
                                                })
                                            }
                                        </ul>
                                    </React.Fragment>
                                    : ""}
                            </Grid>
                        </Grid>
                    }
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="secondary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default connect(mapStoreStateToProps, mapDispatchToStore)(RecipeDetails);
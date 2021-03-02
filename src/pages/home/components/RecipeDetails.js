import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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
        //   searchText: storeState.common.searchText,
    };
};

const mapDispatchToStore = (dispatch) => {
    return {
        //   setSearchText: (payload) => dispatch(setSearchText(payload)),
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
        console.log("handleClickOpen");
        props.handleDetails();
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
                View Recipe
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {props.recipe.title}
                </DialogTitle>
                <DialogContent dividers>
                <Grid container className={classes.gridWrapper} spacing={0} direction="row" justify="center"
                    alignItems="center">
                    <Grid item md={4} xs={12}>
                        <CardMedia
                            className={classes.media}
                            image={props.recipe.image}
                            title={props.recipe.title}
                        />
                    </Grid>
                    <Grid item md={8} xs={12}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {props.recipe.title}
                            </Typography>
                    </Grid>
                </Grid>
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
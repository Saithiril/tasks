import React from 'react';
import {Grid, makeStyles} from "@material-ui/core";
import EditedComponent from "../EditedComponent";
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import Fab from "@material-ui/core/Fab";
import IconButton from '@material-ui/core/IconButton';

const styles = makeStyles((theme) => ({
    root: {
        border: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        padding: '5px',
        margin: '10px 0',
    },
    completed: {
        background: '#0afdff',
    },
    icon: {

    }
}));

export const StatusTypes = {
    NEW: 'new',
    COMPLETED: 'completed',
};

const Card = ({ task, onChange, onDelete, onComplete }) => {
    const classes = styles();
    const handlerOnChange = (val) => {
        onChange && onChange(val);
    };
    const handlerOnDelete = () => {
        onDelete && onDelete();
    };
    const handleComplete = () => {
        onComplete && onComplete();
    };
    return (
        <Grid container className={[classes.root, task.status === StatusTypes.COMPLETED && classes.completed].join(' ')}>
            <Grid item xs={8}>
                <EditedComponent setChange={handlerOnChange}>
                    <div>{task.title}</div>
                </EditedComponent>
            </Grid>
            <Grid item xs={2}>
                <IconButton onClick={handleComplete} size="small" >
                    {
                        task.status === StatusTypes.COMPLETED ?
                            <ClearIcon />:
                            <DoneIcon />
                    }
                </IconButton>
            </Grid>
            <Grid item xs={2}>
                <Fab onClick={handlerOnDelete} size="small" aria-label="delete" className={classes.fab}>
                    <DeleteIcon />
                </Fab>
            </Grid>
        </Grid>
    )
};

export default Card;

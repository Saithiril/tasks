import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import Card, {StatusTypes} from "../Card";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const styles = makeStyles(() => ({
  root: {
      margin: '20px',
  },
}));

const newTask = {
    title: 'Новая задача',
    status: StatusTypes.NEW,
};

const save = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const load = () => {
    return JSON.parse(localStorage.getItem('tasks'));
};

const sortByTitle = (a, b) => a.title <= b.title ? -1 : 1;

function Index() {
    const [tasks, setTasks] = useState(load() || []);
    const classes = styles();
    const addTask = () => {
        setTasks((val => val.concat(newTask)))
    };
    const board = useMemo(() => {
        const handlerChangeTitle = (id, title) => {
            setTasks(_tasks => _tasks.map((task, index) => id === index ? {...task, title: title} : task));
        };
        const handlerDeleteCard = id => {
            setTasks(val => val.filter((_, index) => index !== id));
        };
        const handlerComplete = id => {
            setTasks(_tasks => _tasks.map((task, index) => id === index ? {
                ...task,
                status: task.status === StatusTypes.COMPLETED ? StatusTypes.NEW : StatusTypes.COMPLETED
            } : task));
        };
        return tasks
            .sort(sortByTitle)
            .map((task, index) =>
                <Card
                    key={`${task.title}_${index}`}
                    task={task}
                    onChange={(title) => handlerChangeTitle(index, title)}
                    onDelete={() => handlerDeleteCard(index)}
                    onComplete={() => handlerComplete(index)}
                />
            )
    }
    , [tasks]);
    useEffect(() => {
        save(tasks);
    }, [tasks]);
    return (
      <Grid container spacing={0} className={classes.root}>
        <Grid item xs={12} sm={3}>
            {board}
            <Grid container justify="flex-end">
                <Fab onClick={addTask} size="small" color="primary" aria-label="add" className={classes.fab}>
                    <AddIcon />
                </Fab>
            </Grid>
        </Grid>
      </Grid>
    );
}

export default Index;

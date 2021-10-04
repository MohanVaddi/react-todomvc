import React, { useContext } from 'react';
import classes from './TodoItems.module.css';
import TodoContext from '../store/todo-context';

const TodoItems = (props) => {
    const ctx = useContext(TodoContext);

    const markAsCompleteHandler = () => {
        ctx.markAsCompleted(props.item);
    };
    return (
        <div
            key={Math.random()}
            className={`${classes.title} ${
                props.item.isCompleted ? classes.strikeThrough : ''
            }`}
            onClick={markAsCompleteHandler}>
            <i className={`fas fa-list-ul ${classes.markIcon}`} />
            <span className={classes.text}> {`  ${props.item.title}`}</span>
            <a href='#!' className={classes.delBtn}>
                <i className={`fas fa-trash-alt ${classes.markIcon}`}></i>
            </a>
        </div>
    );
};

export default TodoItems;

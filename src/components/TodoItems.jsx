import React, { useContext } from 'react';
import classes from './TodoItems.module.css';
import TodoContext from '../store/todo-context';

const TodoItems = (props) => {
    const ctx = useContext(TodoContext);

    const markAsCompleteHandler = () => {
        ctx.markAsCompleted(props.item);
    };
    return (
        <div>
            <div
                key = {Math.random()}
                className={`${classes.title} ${
                    props.item.isCompleted ? classes.strikeThrough : ''
                }`}
                onClick={markAsCompleteHandler}>
                {props.item.title}
                {/* <button className={classes.delBtn}>Del</button> */}
            </div>
        </div>
    );
};

export default TodoItems;

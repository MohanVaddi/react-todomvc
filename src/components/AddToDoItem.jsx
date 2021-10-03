import React, { useContext, useRef } from 'react';
import classes from './AddToDoItem.module.css';
import Button from './UI/Button';
import TodoContext from '../store/todo-context';

const AddToDoItem = (props) => {
    const ctx = useContext(TodoContext);
    const inputRef = useRef();
    const submitHandler = (event) => {
        event.preventDefault();
        if (inputRef.current.value.trim().length === 0) {
            return;
        }
        const item = {
            id: Math.random(),
            title: inputRef.current.value,
            isCompleted: false,
        };
        ctx.addItem(item);
        props.hideForm();
    };

    return (
        <form onSubmit={submitHandler}>
            <div className={classes.input}>
                <input type='text' ref={inputRef} />
            </div>
            <Button onClick={submitHandler}>Add</Button>
        </form>
    );
};

export default AddToDoItem;

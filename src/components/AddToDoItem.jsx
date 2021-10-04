import React, { useContext, useRef } from 'react';
import classes from './AddToDoItem.module.css';
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
        inputRef.current.value = '';
    };

    return (
        <form onSubmit={submitHandler}>
            <div className={classes.input}>
                <input type='text' ref={inputRef} placeholder='What needs to be done? ' />
            </div>
        </form>
    );
};

export default AddToDoItem;

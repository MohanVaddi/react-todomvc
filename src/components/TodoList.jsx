import React, { useContext, useState, useRef, useEffect } from 'react';
import { Fragment } from 'react';
import TodoContext from '../store/todo-context';
import AddToDoItem from './AddToDoItem';
import TodoItems from './TodoItems';
import classes from './TodoList.module.css';

const TodoList = (props) => {
    const ctx = useContext(TodoContext);
    const [toggleAll, setToggleAll] = useState(false);
    const [toDoList, setToDoList] = useState(ctx.toDoItems);

    useEffect(() => {
        setToDoList(ctx.toDoItems);
        if (ctx.toDoItems.length > 0) {
            selectRef.current.value = 'all';
        }
    }, [ctx.toDoItems]);

    props.toBecompletedCount(ctx.toDoItems.length - ctx.completed);

    const selectRef = useRef();
    const filterChangeHandler = () => {
        console.log(selectRef.current.value);
        if (selectRef.current.value === 'all') {
            setToDoList(ctx.toDoItems);
        } else if (selectRef.current.value === 'active') {
            let toDoItems = ctx.toDoItems.filter(
                (item) => item.isCompleted === false
            );
            setToDoList(toDoItems);
            console.log(toDoItems);
        } else {
            let toDoItems = ctx.toDoItems.filter(
                (item) => item.isCompleted === true
            );
            setToDoList(toDoItems);
        }
    };
    return (
        <Fragment>
            <div className={classes.card}>
                <AddToDoItem />
                {toDoList.map((item) => {
                    return <TodoItems key={item.id} item={item} />;
                })}
                <div className={classes.btnDiv}>
                    {ctx.toDoItems.length > 0 ? (
                        toggleAll ? (
                            <button
                                onClick={() => {
                                    setToggleAll(false);
                                    ctx.toggleCompleted('off');
                                }}>
                                Activate all
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setToggleAll(true);
                                    ctx.toggleCompleted('on');
                                }}>
                                Deactivate All
                            </button>
                        )
                    ) : (
                        ''
                    )}
                    {ctx.completed > 0 && (
                        <button
                            onClick={() => {
                                ctx.removeCompleted();
                            }}>
                            Delete Completed
                        </button>
                    )}
                </div>
                {ctx.toDoItems.length > 0 && (
                    <select
                        className={`select ${classes.btnDiv}`}
                        ref={selectRef}
                        onChange={filterChangeHandler}>
                        <option value='all'>Show All</option>
                        <option value='active'>Active</option>
                        <option value='completed'>Completed</option>
                    </select>
                )}
            </div>
        </Fragment>
    );
};

export default TodoList;

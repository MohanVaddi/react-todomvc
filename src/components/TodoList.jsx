import React, {
    useContext,
    Fragment,
    useState,
    useRef,
    useEffect,
} from 'react';
import TodoContext from '../store/todo-context';
import AddToDoItem from './AddToDoItem';
import TodoItems from './TodoItems';
import Button from './UI/Button';

const TodoList = (props) => {
    const ctx = useContext(TodoContext);
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);
    const [toggleAll, setToggleAll] = useState(false);
    const [toDoList, setToDoList] = useState(ctx.toDoItems);

    useEffect(() => {
        setToDoList(ctx.toDoItems);
        if (ctx.toDoItems.length > 0) {   
            selectRef.current.value = 'all';
        }
    }, [ctx.toDoItems]);

    const switchToButton = () => {
        setIsAddFormVisible(false);
    };
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
            {toDoList.map((item) => {
                return <TodoItems key={item.id} item={item} />;
            })}

            {ctx.toDoItems.length > 0 && (
                <select
                    className='select'
                    ref={selectRef}
                    onChange={filterChangeHandler}>
                    <option value='all'>Show All</option>
                    <option value='active'>Active</option>
                    <option value='completed'>Completed</option>
                </select>
            )}

            {isAddFormVisible ? (
                <AddToDoItem hideForm={switchToButton} />
            ) : (
                <Button
                    onClick={() => {
                        setIsAddFormVisible(true);
                    }}>
                    + Add
                </Button>
            )}
            {ctx.completed > 0 && (
                <Button
                    onClick={() => {
                        ctx.removeCompleted();
                    }}>
                    Delete Completed
                </Button>
            )}
            {ctx.toDoItems.length > 0 ? (
                toggleAll ? (
                    <Button
                        onClick={() => {
                            setToggleAll(false);
                            ctx.toggleCompleted('off');
                        }}>
                        Activate all
                    </Button>
                ) : (
                    <Button
                        onClick={() => {
                            setToggleAll(true);
                            ctx.toggleCompleted('on');
                        }}>
                        Deactivate All
                    </Button>
                )
            ) : (
                ''
            )}
        </Fragment>
    );
};

export default TodoList;

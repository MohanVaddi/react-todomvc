import React, { useReducer } from 'react';
import TodoContext from './todo-context';

const initialState = {
    toDoItems: [
        {
            id: Math.random(),
            title: 'Learn React',
            isCompleted: true,
        },
        {
            id: Math.random(),
            title: 'Data Structures',
            isCompleted: false,
        },
        {
            id: Math.random(),
            title: 'React Native',
            isCompleted: false,
        },
    ],
    completed: 1,
};

const findCompleted = (arr) => {
    let count = 0;
    arr.forEach((item) => {
        if (item.isCompleted === true) {
            count += 1;
        }
    });
    return count;
};

const itemReducer = (state, action) => {
    if (action.type === 'ADD') {
        console.log(action.item);
        let updatedItems = [...state.toDoItems];
        updatedItems[state.toDoItems.length] = action.item;
        console.log({
            toDoItems: updatedItems,
            completed: state.completed,
        });
        return {
            toDoItems: updatedItems,
            completed: state.completed,
        };
    } else if (action.type === 'REMOVE_COMPLETED') {
        console.log('REMOVE_COMPLETED');
        let updatedItems2 = state.toDoItems.filter((item) => {
            return item.isCompleted !== true;
        });
        let newState2 = {
            toDoItems: updatedItems2,
            completed: findCompleted(updatedItems2),
        };
        return newState2;
    } else if (action.type === 'MARK_COMPLETED') {
        console.log(state);
        console.log('mark as completed');
        console.log(action.item);
        const idx = state.toDoItems.findIndex(
            (item) => item.id === action.item.id
        );
        let updatedItem = {
            id: action.item.id,
            title: action.item.title,
            isCompleted: !action.item.isCompleted,
        };
        let updatedItems = [...state.toDoItems];
        updatedItems[idx] = updatedItem;
        console.log({
            toDoItems: updatedItems,
            completed: findCompleted(updatedItems),
        });
        return {
            toDoItems: updatedItems,
            completed: findCompleted(updatedItems),
        };
    } else if (action.type === 'TOGGLE_ALL') {
        if (action.value) {
            let updatedItems = [...state.toDoItems];
            updatedItems.map((item) => {
                return (item.isCompleted = true);
            });
            return {
                toDoItems: updatedItems,
                completed: updatedItems.length,
            };
        } else {
            let updatedItems = [...state.toDoItems];
            updatedItems.map((item) => {
                return (item.isCompleted = false);
            });
            return {
                toDoItems: updatedItems,
                completed: 0,
            };
        }
    }
    return initialState;
};

const ContextProvider = (props) => {
    const [itemState, itemDispatcher] = useReducer(itemReducer, initialState);

    const addItemHandler = (item) => {
        itemDispatcher({ type: 'ADD', item: item });
    };
    const removeCompletedHandler = () => {
        itemDispatcher({ type: 'REMOVE_COMPLETED' });
    };
    const markAsCompletedHandler = (item) => {
        itemDispatcher({ type: 'MARK_COMPLETED', item: item });
    };
    const toggleCompletedHandler = (value) => {
        if (value === 'on') {
            itemDispatcher({ type: 'TOGGLE_ALL', value: true });
        } else {
            itemDispatcher({ type: 'TOGGLE_ALL', value: false });
        }
    };

    const todoContext = {
        toDoItems: itemState.toDoItems,
        completed: itemState.completed,
        addItem: addItemHandler,
        removeCompleted: removeCompletedHandler,
        markAsCompleted: markAsCompletedHandler,
        toggleCompleted: toggleCompletedHandler,
    };
    return (
        <TodoContext.Provider value={todoContext}>
            {props.children}
        </TodoContext.Provider>
    );
};

export default ContextProvider;

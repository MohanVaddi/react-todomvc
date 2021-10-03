import { createContext } from 'react';

const TodoContext = createContext({
    toDoItems: [],
    completed: 0,
    addItem: () => {},
    removeCompleted: () => {},
    markAsCompleted: () => {},
    toggleCompleted: () => {},
});

export default TodoContext;

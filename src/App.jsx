import { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import ContextProvider from './store/ContextProvider';

/*
  TodoMVC
  1. add todo
  2. display todos
  3. cross off todo
  4. show number of active todos
  5. filter all/active/complete
  6. delete todo
  7. delete all complete
    7.1 only show if atleast one is complete
  8. button to toggle all on/off
*/

const App = () => {
    const [toBeCompleted, setToBeCompleted] = useState(0);

    const completedCountHandler = (count) => {
        setToBeCompleted(count);
    };

    return (
        <ContextProvider>
            <div className='App App-header'>
                <h3>ToDo list ({toBeCompleted})</h3>
                <TodoList toBecompletedCount={completedCountHandler} />
            </div>
        </ContextProvider>
    );
};

export default App;

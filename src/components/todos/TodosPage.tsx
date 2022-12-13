import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/store.hook";
import { addNewTodo, fetchTodos } from "../../store/todoSlice";
import InputTodoForm from "./InputTodoForm";

function TodosPage() {
  const [title, setTitle] = useState('')
  const { loading, error } = useAppSelector(state => state.todos);;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAction = () => {
    if (title.trim().length) {
      dispatch(addNewTodo(title));
      setTitle('');
    }
  }

  return ( 
      <div className="todos-main">
        <InputTodoForm
          value={title}
          updateText={setTitle}
          handleAction={handleAction}
        />
      {loading && <h2>Loading...</h2>}
      {error && <h2>An error occured: {error}</h2>}
      </div>
    );
}

export default TodosPage;
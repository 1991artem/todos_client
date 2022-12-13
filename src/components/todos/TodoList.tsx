import { useAppSelector } from "../../hooks/store.hook";
import { ITodo } from "../../types/interface";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const todos = useAppSelector(state => state.todos.list);

  return (
    <ul>
      {todos.map((todo: ITodo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
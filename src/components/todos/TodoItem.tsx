import { useAppDispatch } from "../../hooks/store.hook";
import { toggleStatus, deleteTodo } from "../../store/todoSlice";
import { ITodo } from "../../types/interface";

interface ITotoItemProps {
  todo: ITodo
}

function TodoItem({todo}: ITotoItemProps) {
  const dispatch = useAppDispatch();
  const {id, completed, title} = todo
  return ( 
    <li>
      <input
        type='checkbox'
        checked={completed}
        onChange={() => dispatch(toggleStatus(id))}
      />
      <span>{title}</span>
      <span onClick={() => dispatch(deleteTodo(id))}>&times;</span>
    </li>
   );
}

export default TodoItem;
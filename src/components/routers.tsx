import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import TodosPage from './todos/TodosPage';

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/todos" element={<TodosPage />} />
    </Routes>
  );
}

export default Routers;

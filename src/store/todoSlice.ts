import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { ITodo, ITodosState } from '../types/interface';

export const fetchTodos = createAsyncThunk<ITodo[], undefined, {rejectValue: string}>(
  'todos/fetchTodos',
  async function (_, { rejectWithValue }) {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');

    if (!response.ok) {
      return rejectWithValue('Server Error!');
    }

    const data = await response.json();

    return data;
  }
);

export const addNewTodo = createAsyncThunk<ITodo, string, { rejectValue: string }>(
'todos/addNewTodo',
async function (text, { rejectWithValue }) {
    const todo = {
      title: text,
      userId: 1,
      completed: false,
    };

    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    });

    if (!response.ok) {
      return rejectWithValue('Can\'t add task. Server error.');
    }

    return (await response.json()) as ITodo;
}
);

export const toggleStatus = createAsyncThunk<ITodo, string, { rejectValue: string, state: { todos: ITodosState} }>(
'todos/toggleStatus',
async function (id, { rejectWithValue, getState }) {
  const todo = getState().todos.list.find((todo: ITodo) => todo.id === +id);

  if (todo) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: !todo.completed,
      })
    });

    if (!response.ok) {
      return rejectWithValue('Can\'t toggle status. Server error.');
    }

    return (await response.json()) as ITodo; 
  }

  return rejectWithValue('No such todo in the list!')
}
);

export const deleteTodo = createAsyncThunk<string, string, { rejectValue: string }>(
'todos/deleteTodo',
async function (id, { rejectWithValue }) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    return rejectWithValue('Can\'t delete task. Server error.');
  }

  return id;
}
);

const initialState: ITodosState = {
list: [],
loading: false,
error: null,
}

const todoSlice = createSlice({
name: 'todos',
initialState,
reducers: {},
extraReducers: (builder) => {
  builder
    .addCase(fetchTodos.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchTodos.fulfilled, (state, action) => {
      state.list = action.payload;
      state.loading = false;
    })
    .addCase(addNewTodo.pending, (state) => {
      state.error = null;
    })
    .addCase(addNewTodo.fulfilled, (state, action) => {
      state.list.push(action.payload);
    })
    .addCase(toggleStatus.fulfilled, (state, action) => {
      const toggledTodo = state.list.find((todo: ITodo) => todo.id === action.payload.id);
      if (toggledTodo) {
        toggledTodo.completed = !toggledTodo.completed;
      }
    })
    .addCase(deleteTodo.fulfilled, (state, action) => {
      state.list = state.list.filter((todo: ITodo) => todo.id !== +action.payload);
    })
    .addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    });
}
});

export default todoSlice.reducer;

function isError(action: AnyAction) {
return action.type.endsWith('rejected');
}
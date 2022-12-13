export interface ITodo {
  userId?: number,
  id?: number,
  title: string,
  completed: boolean
}

export interface ITodosState {
  list: ITodo[];
  loading: boolean;
  error: string | null;
}

export interface ITodosAction {
  payload: ITodo | string;
  type: string;
}

import { v4 as uuidv4 } from "uuid";
import { Todo } from "../models/todo";

const todos: Todo[] = [];

export function getAll(): Todo[] {
  return todos;
}

export function getById(id: string): Todo | undefined {
  return todos.find((t) => t.id === id);
}

export function create(title: string): Todo {
  const todo: Todo = {
    id: uuidv4(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  todos.push(todo);
  return todo;
}

export function update(
  id: string,
  fields: Partial<Pick<Todo, "title" | "completed">>
): Todo | null {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return null;
  if (fields.title !== undefined) todo.title = fields.title;
  if (fields.completed !== undefined) todo.completed = fields.completed;
  return todo;
}

export function toggle(id: string): Todo | null {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return null;
  todo.completed = !todo.completed;
  return todo;
}

export function remove(id: string): boolean {
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return false;
  todos.splice(index, 1);
  return true;
}

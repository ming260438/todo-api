import { Request, Response } from "express";
import * as store from "../store/todosStore";

export function listTodos(req: Request, res: Response): void {
  res.json(store.getAll());
}

export function getTodo(req: Request, res: Response): void {
  const todo = store.getById(req.params.id);
  if (!todo) {
    res.status(404).json({ message: "Todo not found" });
    return;
  }
  res.json(todo);
}

export function createTodo(req: Request, res: Response): void {
  const { title } = req.body as { title?: unknown };
  if (!title || typeof title !== "string" || title.trim() === "") {
    res.status(400).json({ message: "title is required and must be a non-empty string" });
    return;
  }
  const todo = store.create(title.trim());
  res.status(201).json(todo);
}

export function updateTodo(req: Request, res: Response): void {
  const { title, completed } = req.body as { title?: unknown; completed?: unknown };

  if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
    res.status(400).json({ message: "title must be a non-empty string" });
    return;
  }
  if (completed !== undefined && typeof completed !== "boolean") {
    res.status(400).json({ message: "completed must be a boolean" });
    return;
  }

  const fields: { title?: string; completed?: boolean } = {};
  if (title !== undefined) fields.title = (title as string).trim();
  if (completed !== undefined) fields.completed = completed as boolean;

  const todo = store.update(req.params.id, fields);
  if (!todo) {
    res.status(404).json({ message: "Todo not found" });
    return;
  }
  res.json(todo);
}

export function toggleTodo(req: Request, res: Response): void {
  const todo = store.toggle(req.params.id);
  if (!todo) {
    res.status(404).json({ message: "Todo not found" });
    return;
  }
  res.json(todo);
}

export function deleteTodo(req: Request, res: Response): void {
  const deleted = store.remove(req.params.id);
  if (!deleted) {
    res.status(404).json({ message: "Todo not found" });
    return;
  }
  res.status(204).send();
}

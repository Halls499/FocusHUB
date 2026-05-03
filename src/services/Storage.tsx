import type { Task } from "../hooks/useTasks"

const STORAGE_KEY = "tasks"

export const Storage = {
  get(): Task[] {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  },

  set(tasks: Task[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  },
}
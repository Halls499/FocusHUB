import { useState, useEffect } from "react";
import { Storage } from "../services/Storage";

export type Task = {
  id: number;
  title: string;
  done: boolean;
  day: string;
};

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(Storage.get());

  // salva sempre que tasks mudar
  useEffect(() => {
    Storage.set(tasks);
  }, [tasks]);

  function addTask(title: string, day: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      day,
      done: false,
    };

    setTasks((prev) => [...prev, newTask]);
  }

  function toggleTask(id: number) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }

  function deleteTask(id: number) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
  };
}

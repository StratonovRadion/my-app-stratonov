import { cache } from "react";
import {cacheLife} from "next/cache";
import TaskList from "../components/List/list";
import "./tasks.css";

export interface Task {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}


export async function getTasks() {
  'use cache'

  cacheLife('hours')

    const post = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")

    return post.json()
}

export default async function TasksPage() {

  const response = await getTasks();
  const tasks: Task[] = await response;

  return (
    <div className="task">
      <h1>Task List</h1>
      {}
      <TaskList tasks={tasks} />
    </div>
  );
}
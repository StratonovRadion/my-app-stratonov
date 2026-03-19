import { cache } from "react";
import TaskList from "../components/List/list";
import "./tasks.css";

export interface Task {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}


export const getPost = cache(async () => {
    const post = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")

    return post
})

export default async function TasksPage() {

  const response = await getPost();
  const tasks: Task[] = await response.json();

  return (
    <div className="task">
      <h1>Task List</h1>
      {}
      <TaskList tasks={tasks} />
    </div>
  );
}
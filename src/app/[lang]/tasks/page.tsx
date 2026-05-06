import { cacheLife } from "next/cache";
import TaskList from "../../components/List/list";
import "../tasks/tasks.css";
import { getT } from "../../../i18n/server";

export interface Task {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

async function getTasks(): Promise<Task[]> {
  "use cache";
  cacheLife("hours");
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10"
  );
  return res.json();
}

export default async function TasksPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const { t } = await getT("common", lang);
  const tasks: Task[] = await getTasks();

  return (
    <div className="task">
      <h1>{t("tasks.title")}</h1>
      {/* Pluralization example */}
      <p>{t("tasks.taskCount", { count: tasks.length })}</p>
      <TaskList tasks={tasks} />
    </div>
  );
}

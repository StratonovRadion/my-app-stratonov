import Card from "../Card/card";
import "./list.css";

export interface Task {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

type ListProps = {
  tasks: Task[];
};

export default function TaskList({ tasks }: ListProps) {
  return (
    <div className="task-list">
      {}
      {tasks.map((task) => (
        <Card key={task.id} task={task} />
      ))}
    </div>
  );
}
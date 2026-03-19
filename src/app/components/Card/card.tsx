"use client";

import { useState } from "react";
import "./card.css";


export interface Task {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}


type CardProps = {
  task: Task;
};

export default function Card({ task }: CardProps) {

  const [isCompleted, setIsCompleted] = useState(task.completed);


  const toggleStatus = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div 
      className={`task-card ${isCompleted ? "completed-card" : ""}`} 
      onClick={toggleStatus}
    >
      <div className="task-info">
        <div>
          {}
          <h3 style={{ textDecoration: isCompleted ? "line-through" : "none" }}>
            {task.title}
          </h3>
          <p className="task-meta">
            ID: {task.id} • User: {task.userId}
          </p>
        </div>
      </div>

      {}
      <div className={`badge ${isCompleted ? "badge-completed" : "badge-progress"}`}>
        {isCompleted ? "Completed" : "In Progress"}
      </div>
    </div>
  );
}
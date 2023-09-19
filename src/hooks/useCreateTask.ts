import { useState } from "react";
import { type TaskData } from "@/utils/types";
import axios from "axios";
import { mutate } from "swr";

const useCreateTask = (userId: string) => {
  const [taskData, setTaskData] = useState<TaskData>({
    title: "",
    description: "",
    status: "TODO",
  });

  const createTask = async () => {
    // TODO: Add validations
    // TODO: Add notifications
    const data = {
      title: taskData.title,
      description: taskData.description,
      status: taskData.status,
      userId: userId,
    };
    await axios.post("/api/tasks", data);
    mutate("/api/tasks/user");
    setTaskData({
      title: "",
      description: "",
      status: taskData.status,
    });
  };

  return { taskData, setTaskData, createTask };
};

export default useCreateTask;

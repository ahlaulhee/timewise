import { useState, useEffect } from "react";
import { type TaskData, type Task } from "@/utils/types";
import axios from "axios";
import { mutate } from "swr";

const useUpdateTask = (editableTask: Task) => {
  const [taskData, setTaskData] = useState<TaskData>({
    title: "",
    description: "",
    status: "",
    timespent: "",
    userId: "",
  });

  useEffect(() => {
    setTaskData({
      title: editableTask?.title,
      description: editableTask?.description,
      status: editableTask?.status,
      timespent: editableTask?.timeSpent,
      userId: editableTask?.userId,
    });
  }, [editableTask]);

  const updateTask = async () => {
    // TODO: Add validations
    // TODO: Add notifications
    await axios.put(`/api/tasks/${editableTask.id}`, taskData).finally(() => {
      mutate("/api/tasks/user");
    });
    setTaskData({
      title: "",
      description: "",
      status: "",
      timespent: "",
      userId: "",
    });
  };

  return { taskData, setTaskData, updateTask };
};

export default useUpdateTask;

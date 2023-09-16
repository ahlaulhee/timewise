"use client";

import React, { useEffect, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { inter } from "@/app/fonts";
import { useSession } from "next-auth/react";
import axios from "axios";

function UpdateTaskModal({
  setOpenModal,
  editableTask,
}: {
  setOpenModal: (arg0: boolean) => void;
  editableTask: {
    id: number;
    title: string;
    description: string;
    status: string;
    timeSpent: string;
    createdAt: Date;
    updateAt: Date;
    userId: string;
  };
}) {
  const {
    data: session,
    status,
  }: { data: any; status: "loading" | "authenticated" | "unauthenticated" } =
    useSession();

  const [taskData, setTaskData] = useState<{
    title: string;
    description: string;
    status: string;
    timespent: string;
    userId: string;
  }>({
    title: "",
    description: "",
    status: "",
    timespent: "",
    userId: "",
  });

  const dragControls = useDragControls();

  useEffect(() => {
    setTaskData({
      title: editableTask?.title,
      description: editableTask?.description,
      status: editableTask?.status,
      timespent: editableTask?.timeSpent,
      userId: editableTask?.userId,
    });
  }, [editableTask]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // TODO: Add validations
    // TODO: Add notifications
    await axios.put(`/api/tasks/${editableTask.id}`, taskData);
    setOpenModal(false);
    setTaskData({
      title: "",
      description: "",
      status: "",
      timespent: "",
      userId: "",
    });
  };

  return (
    <div className="w-full flex justify-center">
      <motion.div
        drag
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{
          top: -window.innerHeight / 2 + 400,
          left: -window.innerWidth / 2 + 500,
          right: window.innerWidth / 2 - 500,
          bottom: window.innerHeight / 2 - 150,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.7, ease: "anticipate" }}
        className={`${inter.className} w-fit fixed`}
      >
        <div className="w-[500px] h-[470px] bg-[#171a26] rounded-[12px] shadow-lg flex flex-col justify-between p-3">
          <div
            onPointerDown={(e) => {
              dragControls.start(e);
            }}
            className="flex justify-between items-center"
          >
            <div className="w-1/3"></div>
            <p className="text-2xl font-bold w-1/3 text-center">Update Task</p>
            <div className="w-1/3 flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-700 duration-200 px-4 py-2 rounded-full border-none text-base font-bold cursor-pointer"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                X
              </button>
            </div>
          </div>
          <div className="text-center flex flex-col justify-center items-center"></div>
          <input
            type="text"
            placeholder="Title..."
            name="title"
            maxLength={35}
            value={taskData?.title}
            onChange={handleChange}
            className="w-full rounded bg-main p-3 tracking-widest"
          />
          <textarea
            placeholder="Description..."
            name="description"
            rows={6}
            value={taskData?.description}
            onChange={handleChange}
            className="w-full rounded bg-main p-3 tracking-widest resize-none"
          />
          <input
            type="text"
            placeholder="HR:MIN:SEC"
            name="timespent"
            maxLength={35}
            value={taskData?.timespent}
            onChange={handleChange}
            className="w-full rounded bg-main p-3 tracking-widest"
          />
          <select
            name="status"
            defaultValue="todo"
            value={taskData?.status}
            onChange={handleSelectChange}
            className="w-full rounded bg-main p-4 tracking-widest"
          >
            <option value="TODO">To Do</option>
            <option value="INPROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
          <div className="flex-1/5 flex justify-center items-center space-x-4">
            <button
              className="w-full p-2 border-2 border-red-500 bg-red-700 text-white hover:bg-red-500 hover:text-black hover:tracking-wide duration-200 rounded-[8px] text-[20px] cursor-pointer"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="w-full p-2 border-2 border-green-500 bg-green-700 text-white hover:bg-green-500 hover:text-black hover:tracking-wide duration-200 rounded-[8px] text-[20px] cursor-pointer"
            >
              Update
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default UpdateTaskModal;

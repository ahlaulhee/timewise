"use client";
import { worksans } from "@/app/fonts";
import axios from "axios";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TaskItem = ({
  id,
  title,
  description,
  status,
  timespent,
  handleEdit,
  handleDelete,
}: {
  id: number;
  title: string;
  description: string;
  status: string;
  timespent: string;
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}) => {
  const [hours, minutes, seconds] = timespent.split(":");
  const totalSeconds = +hours * 3600 + +minutes * 60 + +seconds;
  const [time, setTime] = useState(totalSeconds);
  const [timer, setTimer] = useState(false);

  useEffect(() => {
    setTime(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timer) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!timer && time !== 0) {
      if (interval) {
        clearInterval(interval);
      }
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer, time]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    const formattedH = h < 10 ? `0${h}` : h;
    const formattedM = m < 10 ? `0${m}` : m;
    const formattedS = s < 10 ? `0${s}` : s;

    return `${formattedH}:${formattedM}:${formattedS}`;
  };

  const startTimer = () => {
    setTimer(true);
  };

  const stopTimer = async () => {
    const spentTime = formatTime(time);
    await axios.put(`/api/tasks/${id}`, {
      title,
      description,
      status,
      timespent: spentTime,
    });
    setTimer(false);
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", duration: 0.8 }}
      exit={{ opacity: 0 }}
      viewport={{ once: true }}
      className={`${worksans.className} flex justify-evenly m-4 p-4 bg-main rounded-lg`}
    >
      <p className="w-1/3 font-bold">{title}</p>
      <p className="w-1/4 flex justify-center">
        Status:
        <span
          className={`${
            status === "DONE" ? "text-green-600" : "text-blue-600"
          } ml-1 font-bold`}
        >
          {status}
        </span>
      </p>
      <div className="flex w-1/4 space-x-1 justify-center">
        <p className="text-center">Spent Time:</p>
        <p className={`${timer ? "text-forest-green" : ""}`}>
          {formatTime(time)}
        </p>
      </div>
      <div className="w-1/3 space-x-4 flex justify-end">
        {timer ? (
          <button
            className="hover:underline active:text-indigo duration-100"
            onClick={() => stopTimer()}
          >
            Stop Timer
          </button>
        ) : (
          <button
            className="hover:underline active:text-indigo duration-100"
            onClick={() => startTimer()}
          >
            Start Timer
          </button>
        )}
        <button
          className="hover:underline active:text-teal duration-100"
          onClick={() => handleEdit(id)}
        >
          Edit
        </button>
        <button
          className="hover:underline active:text-maroon duration-100"
          onClick={() => handleDelete(id)}
        >
          Remove
        </button>
      </div>
    </motion.div>
  );
};

export default TaskItem;

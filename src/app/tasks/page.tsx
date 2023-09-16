"use client";
import { useSession } from "next-auth/react";
import { inter, worksans } from "../fonts";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TaskModal from "@/components/TaskModal";
import axios from "axios";
import UpdateTaskModal from "@/components/UpdateTaskModal";

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
  // TODO: Add copy counter
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
        <p>{formatTime(time)}</p>
      </div>
      <div className="w-1/3 space-x-4 flex justify-end">
        {timer ? (
          <button
            className="hover:underline active:text-custom-purple duration-100"
            onClick={() => stopTimer()}
          >
            Stop Timer
          </button>
        ) : (
          <button
            className="hover:underline active:text-custom-purple duration-100"
            onClick={() => startTimer()}
          >
            Start Timer
          </button>
        )}
        <button
          className="hover:underline active:text-custom-cyan duration-100"
          onClick={() => handleEdit(id)}
        >
          Edit
        </button>
        <button
          className="hover:underline active:text-custom-red duration-100"
          onClick={() => handleDelete(id)}
        >
          Remove
        </button>
      </div>
    </motion.div>
  );
};

export default function Tasks() {
  const [tasks, setTasks] = useState<
    {
      id: number;
      title: string;
      description: string;
      status: string;
      timeSpent: string;
      createdAt: Date;
      updatedAt: Date;
      userId: string;
    }[]
  >();
  const [filteredTasks, setFilteredTasks] = useState<
    {
      id: number;
      title: string;
      description: string;
      status: string;
      timeSpent: string;
      createdAt: Date;
      updatedAt: Date;
      userId: string;
    }[]
  >();
  const [modalOpen, setModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [editableTask, setEditableTask] = useState<{
    id: number;
    title: string;
    description: string;
    status: string;
    timeSpent: string;
    createdAt: Date;
    updateAt: Date;
    userId: string;
  }>({
    id: 0,
    title: "",
    description: "",
    status: "",
    timeSpent: "",
    createdAt: new Date(Date.now()),
    updateAt: new Date(Date.now()),
    userId: "",
  });
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const {
    data: session,
    status,
  }: {
    data: any;
    status: "loading" | "authenticated" | "unauthenticated";
  } = useSession();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredTasks(
      tasks?.filter((task) =>
        task.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  const handleEdit = async (id: number) => {
    await axios
      .get(`/api/tasks/${id}`)
      .then((res) => res.data)
      .then((data) => setEditableTask(data.storedTask))
      .finally(() => setUpdateModalOpen(true));
  };
  const handleDelete = async (id: number) => {
    // TODO: Add notification
    await axios.delete(`/api/tasks/${id}`);
    setRefresh(!refresh);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      await axios
        .get(`/api/tasks/user/${session?.user?.id}`)
        .then((res) => res.data)
        .then((data) => {
          setTasks(data.tasks);
          setFilteredTasks(data.tasks);
        });
    };
    fetchPosts();
  }, [modalOpen, updateModalOpen, session?.user?.id, refresh]);

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      <div
        className={`${inter.className} max-w-screen-xl mx-auto flex justify-between items-center`}
      >
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
          className="rounded-lg pl-4 pr-12 py-3 text-black"
        />
        <p className="hidden md:block text-center text-3xl">
          {session?.user?.name}&apos;s tasks
        </p>
        <motion.button
          initial={{ scale: 1, opacity: 1 }}
          whileTap={{ scale: 1.05, opacity: 1 }}
          transition={{ duration: 0.01 }}
          className="py-3 px-20 border-2 rounded-lg bg-foreground hover:bg-main duration-200 text-white cursor-pointer"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          ADD TASK
        </motion.button>
      </div>
      <AnimatePresence>
        {modalOpen && <TaskModal setOpenModal={setModalOpen} />}
      </AnimatePresence>
      <AnimatePresence>
        {updateModalOpen && (
          <UpdateTaskModal
            setOpenModal={setUpdateModalOpen}
            editableTask={editableTask}
          />
        )}
      </AnimatePresence>
      <div className="max-w-screen-xl mx-auto h-fit rounded-lg bg-foreground m-3 py-1">
        <AnimatePresence>
          {filteredTasks &&
            filteredTasks
              .sort((a, b) => b.id - a.id)
              .map((task) => (
                <TaskItem
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  status={task.status}
                  description={task.description}
                  timespent={task.timeSpent}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

"use client";
import { useSession } from "next-auth/react";
import { inter, worksans } from "../fonts";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TaskModal from "@/components/TaskModal";
import axios from "axios";

const TaskItem = ({
  id,
  title,
  description,
  status,
  timespent,
  handleTimer,
  handleEdit,
  handleDelete,
}: {
  id: number;
  title: string;
  description: string;
  status: string;
  timespent: string;
  handleTimer: (timespent: string) => void;
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}) => {
  // TODO: Add copy counter
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
      <p className="w-1/3 flex justify-center">Status: {status}</p>
      <p className="w-1/3 flex justify-center">Spent Time: {timespent}</p>
      <div className="w-1/3 space-x-4 flex justify-end">
        <button
          className="hover:underline active:text-custom-cyan duration-100"
          onClick={() => handleTimer(timespent)}
        >
          Start Timer
        </button>
        <button
          className="hover:underline active:text-custom-cyan duration-100"
          onClick={() => handleEdit(id)}
        >
          Edit
        </button>
        <button
          className="hover:underline active:text-custom-cyan duration-100"
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
  const [modalOpen, setModalOpen] = useState(false);
  const {
    data: session,
    status,
  }: {
    data: any;
    status: "loading" | "authenticated" | "unauthenticated";
  } = useSession();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const handleTimer = () => {};
  const handleEdit = () => {};
  const handleDelete = () => {};

  useEffect(() => {
    const fetchPosts = async () => {
      await axios
        .get(`/api/tasks/${session?.user?.id}`)
        .then((res) => res.data)
        .then((data) => setTasks(data.tasks));
    };
    fetchPosts();
  }, [modalOpen, session?.user?.id]);

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
      <div className="max-w-screen-xl mx-auto h-fit rounded-lg bg-foreground m-3 py-1">
        <AnimatePresence>
          {tasks &&
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                id={task.id}
                title={task.title}
                status={task.status}
                description={task.description}
                timespent={task.timeSpent}
                handleTimer={handleTimer}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

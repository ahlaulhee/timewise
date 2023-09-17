"use client";
import { signOut, useSession } from "next-auth/react";
import { inter, worksans } from "../fonts";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TaskModal from "@/components/TaskModal";
import axios from "axios";
import UpdateTaskModal from "@/components/UpdateTaskModal";
import TaskItem from "@/components/TaskItem";
import { useRouter } from "next/navigation";

import Swal from "sweetalert2";
import { CustomAlert } from "@/utils/Toast";
// import "@sweetalert2/theme-dark/dark.css";

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
  const [searchInput, setSearchInput] = useState("");
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

  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
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
  const handleDelete = (id: number) => {
    CustomAlert.fire({
      title: "Are you sure you want to delete this task?",
      text: "Once deleted, it is not possible to recover this task.",
      icon: "warning",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`/api/tasks/${id}`).then(() => {
          setRefresh(!refresh);
          setSearchInput("");
        });
        CustomAlert.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  useEffect(() => {
    const fetchPosts = async () => {
      await axios
        .get(`/api/tasks/user/${session?.user?.id}`)
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setTasks(data.tasks);
          setFilteredTasks(data.tasks);
        })
        .catch((err) => {
          setTasks([]);
          setFilteredTasks([]);
          console.log(err);
        });
    };
    if (session) fetchPosts();
  }, [modalOpen, updateModalOpen, session?.user?.id, refresh, session]);

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
          value={searchInput}
          onChange={handleSearch}
          className="rounded-lg pl-4 py-3 text-black w-full md:w-1/4"
        />
        {session ? (
          <div className="text-center w-2/4 flex justify-center flex-col items-center">
            <button
              className="text-crimson border rounded px-2"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
            <p className="hidden md:block text-center text-2xl">
              {session?.user?.name}&apos;s tasks
            </p>
          </div>
        ) : null}
        <motion.button
          initial={{ scale: 1, opacity: 1 }}
          whileTap={{ scale: 1.05, opacity: 1 }}
          transition={{ duration: 0.01 }}
          className="py-3 border-2 rounded-lg bg-white-smoke hover:bg-main duration-200 text-main hover:text-white cursor-pointer w-full md:w-1/4"
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

"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/lib/redux";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { Priority, Task, useGetTasksByUserQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ListIcon, PlusIcon, Table } from "lucide-react";
import ModalNewTask from "../modal/modal-new-task";
import Header from "../globals/header";

type Props = {
  priority: Priority;
};

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 150,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <span
        className="inline-flex rounded-full bg-opacity-10 px-2 text-xs font-semibold leading-5"
        style={{
          backgroundColor:
            params.value === "Completed"
              ? "rgba(0, 200, 0, 0.1)"
              : "rgba(255, 170, 0, 0.1)",
          color:
            params.value === "Completed"
              ? "rgb(0, 150, 0)"
              : "rgb(200, 130, 0)",
        }}
      >
        {params.value}
      </span>
    ),
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 100,
    renderCell: (params) => (
      <span
        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
          params.value === "High"
            ? "bg-red-100 text-red-800"
            : params.value === "Medium"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
        }`}
      >
        {params.value}
      </span>
    ),
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 150,
    renderCell: (params) => (
      <span
        className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold text-blue-800"
      >
        {params.value}
      </span>
    ),
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 130,
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 130,
  },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => params.value.username || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value.username || "Unassigned",
  },
];

export default function ReusablePriorityPage({ priority }: Props) {
  const [view, setView] = useState("list");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  const userId = 2;
  const {
    data: tasks,
    isLoading,
    isError: isTasksError,
  } = useGetTasksByUserQuery(userId || 0, {
    skip: userId === null,
  });

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const filteredTasks = tasks?.filter(
    (task: Task) => task.priority === priority,
  );

  if (isTasksError || !tasks) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="rounded-lg bg-white p-8 shadow-xl dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-bold text-red-600 dark:text-red-400">
            Error
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            An error occurred while fetching tasks. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="m-5 p-4">
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      />
      <Header
        name={`${priority} Priority Tasks`}
        buttonComponent={
          <button
            className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 flex"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            <PlusIcon className="mr-2 h-5 w-5" />
            Add Task
          </button>
        }
      />
      <div className="mb-6 flex justify-start space-x-2">
        <button
          className={`flex items-center rounded-md px-4 py-2 ${
            view === "list"
              ? "bg-blue-500 text-white dark:bg-blue-600"
              : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          }`}
          onClick={() => setView("list")}
        >
          <ListIcon className="mr-2 h-5 w-5" />
          List
        </button>
        <button
          className={`flex items-center rounded-md px-4 py-2 ${
            view === "table"
              ? "bg-blue-500 text-white dark:bg-blue-600"
              : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          }`}
          onClick={() => setView("table")}
        >
          <Table className="mr-2 h-5 w-5" />
          Table
        </button>
      </div>
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : view === "list" ? (
        <div className="grid grid-cols-1 gap-4 max-w-3xl">
          {filteredTasks?.map((task: Task) => (
            <div
              key={task.id}
              className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-gray-800"
            >
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {task.title}
                </h3>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  {task.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      task.priority === "High"
                        ? "bg-red-100 text-red-800"
                        : task.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {task.priority}
                  </span>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      task.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        view === "table" &&
        filteredTasks && (
          <div className="rounded-lg bg-white shadow-md dark:bg-gray-800">
            <DataGrid
              rows={filteredTasks}
              columns={columns}
              checkboxSelection
              getRowId={(row) => row.id}
              className={`${dataGridClassNames} min-h-[400px]`}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        )
      )}
    </div>
  );
}

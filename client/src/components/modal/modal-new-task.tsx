import { Priority, Status, useCreateTaskMutation } from "@/state/api";
import React, { useState } from "react";
import { formatISO } from "date-fns";
import ModalComponent from ".";
import {
  ClipboardListIcon,
  AlignLeftIcon,
  TagIcon,
  CalendarIcon,
  UserIcon,
  BriefcaseIcon,
  FlagIcon,
} from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id?: string | null;
};

const ModalNewTask = ({ isOpen, onClose, id = null }: Props) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>(Status.ToDo);
  const [priority, setPriority] = useState<Priority>(Priority.Backlog);
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [authorUserId, setAuthorUserId] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [projectId, setProjectId] = useState("");

  const handleSubmit = async () => {
    if (!title || !authorUserId || !(id !== null || projectId)) return;

    const formattedStartDate = startDate
      ? formatISO(new Date(startDate), {
          representation: "complete",
        })
      : undefined;
    const formattedDueDate = dueDate
      ? formatISO(new Date(dueDate), {
          representation: "complete",
        })
      : undefined;

    await createTask({
      title,
      description,
      status,
      priority,
      tags,
      startDate: formattedStartDate,
      dueDate: formattedDueDate,
      authorUserId: parseInt(authorUserId),
      assignedUserId: parseInt(assignedUserId),
      projectId: id !== null ? Number(id) : Number(projectId),
    });
    onClose();
  };

  const isFormValid = () => {
    return title && authorUserId && (id !== null || projectId);
  };

  const inputStyles = `
    w-full rounded-lg border border-gray-300 p-3 pl-10 shadow-sm transition-all duration-200
    focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50
    dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400
    dark:focus:ring-blue-300 dark:focus:ring-opacity-50
  `;

  const selectStyles = `
    ${inputStyles} appearance-none bg-white dark:bg-gray-700
    bg-no-repeat bg-right pr-8
  `;

  const labelStyles =
    "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <ModalComponent isOpen={isOpen} onClose={onClose} name="Create New Task">
      <form
        className="mt-6 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <label htmlFor="title" className={labelStyles}>
            Title
          </label>
          <div className="relative">
            <ClipboardListIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              id="title"
              type="text"
              className={inputStyles}
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className={labelStyles}>
            Description
          </label>
          <div className="relative">
            <AlignLeftIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <textarea
              id="description"
              className={`${inputStyles} min-h-[100px]`}
              placeholder="Task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="status" className={labelStyles}>
              Status
            </label>
            <div className="relative">
              <BriefcaseIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <select
                id="status"
                className={selectStyles}
                value={status}
                onChange={(e) =>
                  setStatus(Status[e.target.value as keyof typeof Status])
                }
              >
                <option value={Status.ToDo}>To Do</option>
                <option value={Status.WorkInProgress}>Work In Progress</option>
                <option value={Status.UnderReview}>Under Review</option>
                <option value={Status.Completed}>Completed</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="priority" className={labelStyles}>
              Priority
            </label>
            <div className="relative">
              <FlagIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <select
                id="priority"
                className={selectStyles}
                value={priority}
                onChange={(e) =>
                  setPriority(Priority[e.target.value as keyof typeof Priority])
                }
              >
                <option value={Priority.Urgent}>Urgent</option>
                <option value={Priority.High}>High</option>
                <option value={Priority.Medium}>Medium</option>
                <option value={Priority.Low}>Low</option>
                <option value={Priority.Backlog}>Backlog</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="tags" className={labelStyles}>
            Tags
          </label>
          <div className="relative">
            <TagIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              id="tags"
              type="text"
              className={inputStyles}
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="startDate" className={labelStyles}>
              Start Date
            </label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                id="startDate"
                type="date"
                className={inputStyles}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="dueDate" className={labelStyles}>
              Due Date
            </label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                id="dueDate"
                type="date"
                className={inputStyles}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="authorUserId" className={labelStyles}>
            Author User ID
          </label>
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              id="authorUserId"
              type="text"
              className={inputStyles}
              placeholder="Author User ID"
              value={authorUserId}
              onChange={(e) => setAuthorUserId(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="assignedUserId" className={labelStyles}>
            Assigned User ID
          </label>
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              id="assignedUserId"
              type="text"
              className={inputStyles}
              placeholder="Assigned User ID"
              value={assignedUserId}
              onChange={(e) => setAssignedUserId(e.target.value)}
            />
          </div>
        </div>

        {id === null && (
          <div>
            <label htmlFor="projectId" className={labelStyles}>
              Project ID
            </label>
            <div className="relative">
              <BriefcaseIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                id="projectId"
                type="text"
                className={inputStyles}
                placeholder="Project ID"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className={`mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${!isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""} `}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="mr-2 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating...
            </span>
          ) : (
            "Create Task"
          )}
        </button>
      </form>
    </ModalComponent>
  );
};

export default ModalNewTask;

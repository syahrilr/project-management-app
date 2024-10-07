import React from "react";
import { Task } from "@/state/api";
import { format } from "date-fns";
import Image from "next/image";
import {
  CalendarIcon,
  TagIcon,
  UserIcon,
  ClockIcon,
  FlagIcon,
  PaperclipIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const priorityColors = {
    Low: "bg-blue-200 text-blue-700",
    Medium: "bg-green-200 text-green-700",
    High: "bg-yellow-200 text-yellow-700",
    Urgent: "bg-red-200 text-red-700",
  };

  const statusColors: any = {
    "To Do": "border-blue-500 text-blue-700",
    "Work In Progress": "border-green-500 text-green-700",
    "Under Review": "border-yellow-500 text-yellow-700",
    Completed: "border-black text-black",
  };

  return (
    <div className="mb-6 overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800 dark:text-white">
      <div
        className="border-l-4 p-6"
        style={{ backgroundColor: statusColors[task.status as keyof typeof statusColors] }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {task.title}
          </h2>
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${
              statusColors[task.status as keyof typeof statusColors]
            }`}
          >
            {task.status}
          </span>
        </div>

        <p className="mb-4 text-gray-600 dark:text-gray-300">
          {task.description
            ? isExpanded
              ? task.description
              : `${task.description.slice(0, 100)}${
                  task.description.length > 100 ? "..." : ""
                }`
            : "No description provided"}
        </p>

        {task.description && task.description.length > 100 && (
          <button
            className="mb-4 text-sm text-blue-500 hover:underline dark:text-blue-400"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <ChevronUpIcon className="mr-1 inline h-4 w-4" />
                Show less
              </>
            ) : (
              <>
                <ChevronDownIcon className="mr-1 inline h-4 w-4" />
                Show more
              </>
            )}
          </button>
        )}

        <div className="mb-4 flex flex-wrap items-center gap-4">
          <span
            className={`flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
              priorityColors[task.priority as keyof typeof priorityColors]
            }`}
          >
            <FlagIcon size={12} className="mr-1" />
            {task.priority}
          </span>
          {task.tags && (
            <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <TagIcon size={14} className="mr-1" />
              {task.tags}
            </span>
          )}
        </div>

        <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <CalendarIcon size={14} className="mr-2" />
            <span>
              Start:{" "}
              {task.startDate
                ? format(new Date(task.startDate), "PP")
                : "Not set"}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <ClockIcon size={14} className="mr-2" />
            <span>
              Due:{" "}
              {task.dueDate ? format(new Date(task.dueDate), "PP") : "Not set"}
            </span>
          </div>
        </div>

        <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
          <div className="flex items-center">
            <UserIcon
              size={14}
              className="mr-2 text-gray-500 dark:text-gray-400"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Author: {task.author ? task.author.username : "Unknown"}
            </span>
          </div>
          <div className="flex items-center">
            <UserIcon
              size={14}
              className="mr-2 text-gray-500 dark:text-gray-400"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Assignee: {task.assignee ? task.assignee.username : "Unassigned"}
            </span>
          </div>
        </div>

        {task.attachments && task.attachments.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
              <PaperclipIcon size={14} className="mr-2" />
              Attachments:
            </p>
            <div className="flex flex-wrap gap-2">
              {task.attachments.map((attachment, index) => (
                <div
                  key={index}
                  className="group relative h-16 w-16 overflow-hidden rounded-lg"
                >
                  <Image
                    src={`/${attachment.fileURL}`}
                    alt={attachment.fileName}
                    layout="fill"
                    objectFit="cover"
                    className="transition-all duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="text-xs text-white">
                      {attachment.fileName.slice(0, 10)}
                      {attachment.fileName.length > 10 ? "..." : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 text-xs text-gray-400 dark:text-gray-500">
          Task ID: {task.id}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

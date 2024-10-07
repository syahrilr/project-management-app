import { useCreateProjectMutation } from "@/state/api";
import { useState } from "react";
import ModalComponent from "./index";
import {
  CalendarIcon,
  FileTextIcon,
  FolderIcon,
  ClockIcon,
} from "lucide-react";
import {formatISO} from "date-fns";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalNewProject = ({ isOpen, onClose }: Props) => {
  const [createProject, { isLoading }] = useCreateProjectMutation();

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async () => {
    if (!projectName || !startDate || !endDate) return;

    const formattedStartDate = formatISO(new Date(startDate), { representation: "complete" });
    const formattedEndDate = formatISO(new Date(endDate), { representation: "complete" });

    await createProject({
      name: projectName,
      description,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });
    onClose();
  };

  const isFormValid = () => {
    return projectName && description && startDate && endDate;
  };

  const inputStyles = `
    w-full rounded-lg border border-gray-300 p-3 shadow-sm transition-all duration-200
    focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50
    dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none dark:focus:border-blue-400
    dark:focus:ring-blue-300 dark:focus:ring-opacity-50
  `;

  const labelStyles =
    "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <ModalComponent isOpen={isOpen} onClose={onClose} name="Create New Project">
      <form
        className="mt-6 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <label htmlFor="projectName" className={labelStyles}>
            Project Name
          </label>
          <div className="relative">
            <FolderIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              id="projectName"
              type="text"
              className={`${inputStyles} pl-10`}
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className={labelStyles}>
            Description
          </label>
          <div className="relative">
            <FileTextIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <textarea
              id="description"
              className={`${inputStyles} min-h-[100px] pl-10`}
              placeholder="Enter project description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
                className={`${inputStyles} pl-10`}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="endDate" className={labelStyles}>
              End Date
            </label>
            <div className="relative">
              <ClockIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                id="endDate"
                type="date"
                className={`${inputStyles} pl-10`}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

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
              Creating Project...
            </span>
          ) : (
            "Create Project"
          )}
        </button>
      </form>
    </ModalComponent>
  );
};

export default ModalNewProject;

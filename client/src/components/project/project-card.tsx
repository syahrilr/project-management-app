import { Project } from "@/state/api";
import { Calendar, Clock } from "lucide-react";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          {project.name}
        </h3>
      </div>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
        {project.description}
      </p>
      <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Calendar className="mr-2 h-4 w-4" />
          <span>Start: {project.startDate}</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Clock className="mr-2 h-4 w-4" />
          <span>End: {project.endDate}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

"use client";

import Header from "@/components/globals/header";
import { useAppSelector } from "@/lib/redux";
import { useGetProjectsQuery } from "@/state/api";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import React, { useMemo, useState } from "react";
import { ChevronDown, Calendar, Loader } from 'lucide-react';

type TaskTypeItems = "task" | "milestone" | "project";

const Timeline = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { data: projects, isLoading, isError } = useGetProjectsQuery();

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const ganttTasks = useMemo(() => {
    return (
      projects?.map((project) => ({
        start: new Date(project.startDate as string),
        end: new Date(project.endDate as string),
        name: project.name,
        id: `Project-${project.id}`,
        type: "project" as TaskTypeItems,
        progress: 50,
        isDisabled: false,
      })) || []
    );
  }, [projects]);

  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  };

  if (isLoading) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="w-8 h-8 animate-spin text-blue-500" />
    </div>
  );
  
  if (isError || !projects)
    return (
      <div className="text-center text-red-500 p-4">
        An error occurred while fetching projects. Please try again later.
      </div>
    );

  return (
    <div className="max-w-full p-4 md:p-8">
      <header className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between">
        <Header name="Projects Timeline" />
        <div className="relative inline-block w-full md:w-64 mt-4 md:mt-0">
          <select
            className="block w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-8 leading-tight shadow-sm transition-colors duration-200 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
            value={displayOptions.viewMode}
            onChange={handleViewModeChange}
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option value={ViewMode.Month}>Month</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </header>

      <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg dark:bg-gray-800 dark:text-white">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Timeline View</h2>
          <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </div>
        <div className="timeline p-4">
          <Gantt
            tasks={ganttTasks}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            rowHeight={50}
            barCornerRadius={4}
            projectBackgroundColor={isDarkMode ? "#3B82F6" : "#60A5FA"}
            projectProgressColor={isDarkMode ? "#1D4ED8" : "#2563EB"}
            projectProgressSelectedColor={isDarkMode ? "#1E40AF" : "#1D4ED8"}
            barProgressColor={isDarkMode ? "#1D4ED8" : "#2563EB"}
            barProgressSelectedColor={isDarkMode ? "#1E40AF" : "#1D4ED8"}
            handleWidth={10}
            todayColor={isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
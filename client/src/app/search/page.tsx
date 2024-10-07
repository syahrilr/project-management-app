"use client";

import { useSearchQuery } from "@/state/api";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import Header from "@/components/globals/header";
import TaskCard from "@/components/globals/task-card";
import ProjectCard from "@/components/project/project-card"; 
import UserCard from "@/components/user-card"; 
import { Search, Loader, AlertCircle } from "lucide-react";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500,
  );

  useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch]);

  return (
    <div className="max-w-7xl p-4 sm:p-6 lg:p-8">
      <Header name="Search" />
      <div className="mb-8 mt-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tasks, projects, or users..."
            className="w-[540px] rounded-lg border border-gray-300 p-4 pl-12 shadow-sm transition duration-150 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            onChange={handleSearch}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 transform text-gray-400" />
        </div>
      </div>
      <div className="space-y-8">
        {isLoading && (
          <div className="flex h-32 items-center justify-center">
            <Loader className="animate-spin text-blue-500" size={32} />
          </div>
        )}
        {isError && (
          <div className="flex h-32 items-center justify-center text-red-500">
            <AlertCircle className="mr-2" size={24} />
            <p>An error occurred while fetching results</p>
          </div>
        )}
        {!isLoading && !isError && searchResults && (
          <div className="space-y-8">
            {searchResults.tasks && searchResults.tasks.length > 0 && (
              <div>
                <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
                  Tasks
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {searchResults.tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>
            )}

            {searchResults.projects && searchResults.projects.length > 0 && (
              <div>
                <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
                  Projects
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {searchResults.projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            )}

            {searchResults.users && searchResults.users.length > 0 && (
              <div>
                <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
                  Users
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {searchResults.users.map((user) => (
                    <UserCard key={user.userId} user={user} />
                  ))}
                </div>
              </div>
            )}

            {(!searchResults.tasks || searchResults.tasks.length === 0) &&
              (!searchResults.projects ||
                searchResults.projects.length === 0) &&
              (!searchResults.users || searchResults.users.length === 0) && (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <p>No results found. Try a different search term.</p>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

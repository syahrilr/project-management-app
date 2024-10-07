"use client";
import { useAppDispatch, useAppSelector } from "@/lib/redux";
import { setIsSidebarCollapsed } from "@/state";
import { useGetProjectsQuery } from "@/state/api";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  FolderKanban,
  Home,
  Layers3,
  LockIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import SidebarLinks from "./sidebar-links";

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);
  const {data: projects} = useGetProjectsQuery();

  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-300 ease-in-out bg-white dark:bg-black overflow-y-auto h-full z-40 ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}`;

  return (
    <div className={sidebarClassNames}>
      <div className="flex h-[100%] w-full flex-col justify-start">
        {/* TOP LOGO */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            PM-APP
          </div>
          {isSidebarCollapsed ? null : (
            <button
              className="py-3"
              onClick={() => {
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
              }}
            >
              <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>
        {/* TEAM */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image src={"/logo.png"} alt="logo" width={40} height={40} />
          <div>
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
              Project Management
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>
        {/* Navbar Links */}
        <nav className="z-0-10 w-full">
          <SidebarLinks icon={Home} label="Home" href="/" />
          <SidebarLinks icon={Briefcase} label="Timeline" href="/timeline" />
          <SidebarLinks icon={Search} label="Search" href="/search" />
          <SidebarLinks icon={Settings} label="settings" href="/settings" />
          <SidebarLinks icon={User} label="users" href="/users" />
          <SidebarLinks icon={Users} label="teams" href="/teams" />
        </nav>
        {/* Projects */}
        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Projects</span>
          {showProjects ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {/* Projects List */}
          {showProjects && projects?.map((project) => (
            <SidebarLinks 
                key={project.id}
                icon={FolderKanban}
                label={project.name}
                href={`/projects/${project.id}`}
            />
          ))}
        {/* Priority */}
        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Priority</span>
          {showPriority ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {/* Priority List */}
        {showPriority && (
          <>
            <SidebarLinks
              icon={AlertCircle}
              label="Urgent"
              href="/priority/urgent"
            />
            <SidebarLinks
              icon={ShieldAlert}
              label="High"
              href="/priority/high"
            />
            <SidebarLinks
              icon={AlertTriangle}
              label="Medium"
              href="/priority/medium"
            />
            <SidebarLinks icon={AlertOctagon} label="Low" href="/priority/low" />
            <SidebarLinks
              icon={Layers3}
              label="Backlog"
              href="/priority/backlog"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

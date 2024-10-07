"use client";
import ModalNewTask from "@/components/modal/modal-new-task";
import BoardView from "@/components/project/board-view";
import ListView from "@/components/project/list-view";
import ProjectHeader from "@/components/project/project-header";
import TableView from "@/components/project/table-view";
import TimelineView from "@/components/project/timeline-view";
import { useState } from "react";

type Props = {
  params: {
    id: string;
  };
};

const ProjectPage = ({ params }: Props) => {
  const { id } = params;
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    // MODAL NEW TAKS
    <div>
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      />
      <ProjectHeader activeTabs={activeTab} setActiveTabs={setActiveTab} />
      {activeTab === "Board" && (
        <BoardView 
            id={id} 
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
      {activeTab === "List" && (
        <ListView 
            id={id} 
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
      {activeTab === "Timeline" && (
        <TimelineView 
            id={id} 
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
      {activeTab === "Table" && (
        <TableView 
            id={id} 
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
    </div>
  );
};

export default ProjectPage;

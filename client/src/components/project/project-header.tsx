import { useState } from "react";
import Header from "../globals/header";
import TabButton from "../globals/tab-button";
import { Clock, Filter, Grid3X3, List, PlusSquare, Share2, Table } from "lucide-react";
import ModalNewProject from "../modal/modal-new-project";

type Props = {
  activeTabs: string;
  setActiveTabs: (tabName: string) => void;
};
const ProjectHeader = ({ activeTabs, setActiveTabs }: Props) => {
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);
  return (
    <div className="px-4 xl:px-6">
      {/* MODAL NEW PROJECT */}
      <ModalNewProject 
        isOpen={isModalNewProjectOpen}
        onClose={() => setIsModalNewProjectOpen(false)}
      />
      <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
        <Header name="Product Design Development" 
          buttonComponent={
            <button className="flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600" onClick={()=>setIsModalNewProjectOpen(true)}>
              <PlusSquare className="mr-2 h-5 w-5"/>
              New Boards
            </button>
          }
        />
      </div>
      {/* TABS */}
      <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-[8px] pt-2 dark:border-stroke-dark md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="Board"
            icon={<Grid3X3 className="h-5 w-5" />}
            setActiveTab={setActiveTabs}
            activeTab={activeTabs}
          />
          <TabButton
            name="List"
            icon={<List className="h-5 w-5" />}
            setActiveTab={setActiveTabs}
            activeTab={activeTabs}
          />
          <TabButton
            name="Timeline"
            icon={<Clock className="h-5 w-5" />}
            setActiveTab={setActiveTabs}
            activeTab={activeTabs}
          />
          <TabButton
            name="Table"
            icon={<Table className="h-5 w-5" />}
            setActiveTab={setActiveTabs}
            activeTab={activeTabs}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-neutral-300">
            <Filter className="h-5 w-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-neutral-300">
            <Share2 className="h-5 w-5" />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Task"
              className="rounded-md border py-1 pl-10 pr-4 focus:outline-none dark:bg-dark-secondary
              dark:border-dark-secondary dark:text-white"
            />
            <Grid3X3 className="absolute left-3 top-2 h-4 w-4 text-gray-400 dark:text-neutral-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectHeader;

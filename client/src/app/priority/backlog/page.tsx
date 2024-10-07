import ReusablePriority from "@/components/reusable-priority";
import { Priority } from "@/state/api";

const BacklogPage = () => {
  return <ReusablePriority priority={Priority.Backlog} />;
};
export default BacklogPage;

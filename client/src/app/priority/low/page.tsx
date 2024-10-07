import ReusablePriority from "@/components/reusable-priority";
import { Priority } from "@/state/api";

const LowPage = () => {
  return <ReusablePriority priority={Priority.Low} />;
};
export default LowPage;

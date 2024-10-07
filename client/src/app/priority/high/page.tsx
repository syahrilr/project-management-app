import ReusablePriority from "@/components/reusable-priority";
import { Priority } from "@/state/api";

const HighPage = () => {
  return <ReusablePriority priority={Priority.High} />;
};
export default HighPage;

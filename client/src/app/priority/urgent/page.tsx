import ReusablePriority from "@/components/reusable-priority"
import { Priority } from "@/state/api"

const UrgentPage = () => {
  return (
    <ReusablePriority 
        priority={Priority.Urgent}
    />
  )
}
export default UrgentPage
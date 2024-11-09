import { EditIcon, PlayIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Button } from "./components/ui/button";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <main className="w-full flex flex-col gap-5">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your counters
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="secondary" onClick={() => navigate("/new-counter")}>
            <PlusIcon className="size-6" />
            Add new counter
          </Button>
        </div>
      </div>
      {[...Array(3)].map((_, index) => (
        <div
          className="flex items-center w-full p-2 border rounded-md"
          key={index}
        >
          <div className="flex-1 font-semibold text-lg">Challenge {index}</div>
          <div className="flex items-center gap-2">
            <Button variant="secondary">
              <PlayIcon className="size-6" /> Execute
            </Button>
            <Button variant="secondary">
              <EditIcon className="size-6" /> Edit
            </Button>
            <Button variant="destructive">
              <TrashIcon className="size-6" /> Delete
            </Button>
          </div>
        </div>
      ))}
    </main>
  );
}

export default App;

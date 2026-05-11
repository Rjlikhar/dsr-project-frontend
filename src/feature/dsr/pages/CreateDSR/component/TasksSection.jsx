import { STATUS_CYCLE } from "../../../constant/status";
import { useCallback} from "react";


const TasksSection = ({ data, setData, STATUS_META, TaskCard, Section }) => {
  const taskSummary = STATUS_CYCLE.map((s) => ({
    s,
    count: data.tasks?.filter((t) => t.status === s).length,
  })).filter((x) => x.count > 0);

  const updateTask = useCallback(
    (i, task) =>
      setData((prev) => {
        const tasks = [...prev.tasks];
        tasks[i] = task;
        return { ...prev, tasks };
      }),
    [],
  );

  return (
    <Section icon="✅" title="Tasks">
      {taskSummary.length > 0 && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {taskSummary.map(({ s, count }) => (
            <span
              key={s}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${STATUS_META[s].badge}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${STATUS_META[s].dot}`}
              />
              {count} {STATUS_META[s].label}
            </span>
          ))}
        </div>
      )}
      <div className="flex flex-col gap-2.5">
        {data.tasks?.map((task, i) => (
          <TaskCard
            key={i}
            task={task}
            onUpdate={(t) => updateTask(i, t)}
            onDelete={() =>
              setData((p) => ({
                ...p,
                tasks: p.tasks.filter((_, j) => j !== i),
              }))
            }
          />
        ))}
      </div>
      <button
        onClick={() =>
          setData((p) => ({
            ...p,
            tasks: [
              ...p.tasks,
              { title: "", status: "TODO", completion: 0, subtasks: [] },
            ],
          }))
        }
        className="mt-3 w-full border-2 border-dashed border-slate-200 hover:border-blue-300 hover:text-blue-400 rounded-xl py-2.5 text-sm text-slate-400 transition-all"
      >
        + Add task
      </button>
    </Section>
  );
};

export default TasksSection;

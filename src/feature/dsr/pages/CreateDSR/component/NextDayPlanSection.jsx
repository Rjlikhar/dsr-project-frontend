const NextDayPlanSection = ({
  data,
  Section,
  Field,
  inputCls,
  setPath,
  setData
}) => {

  const addNextTask = () => {
    setData((prev) => ({
      ...prev,
      nextPlan: {
        ...prev.nextPlan,
        tasks: [...prev.nextPlan.tasks, ""],
      },
    }));
  };

  const deleteNextTask = (index) => {
    setData((prev) => ({
      ...prev,
      nextPlan: {
        ...prev.nextPlan,
        tasks: prev.nextPlan.tasks.filter((_, i) => i !== index),
      },
    }));
  };

  const updateNextTask = (index, value) => {
    const updated = [...data.nextPlan.tasks];
    updated[index] = value;

    setData((prev) => ({
      ...prev,
      nextPlan: {
        ...prev.nextPlan,
        tasks: updated,
      },
    }));
  };

  return (
    <Section icon="📅" title="Next Day's Plan">
      <div className="bg-gradient-to-br from-blue-50 to-violet-50 border border-blue-100 rounded-xl p-5">
        <div className="mb-4">
          <Field label="Plan Date">
            <input
              type="date"
              className={inputCls}
              style={{ maxWidth: 220 }}
              value={data.nextPlan?.date}
              onChange={(e) => setPath(["nextPlan", "date"], e.target.value)}
            />
          </Field>
        </div>
        <Field label="Next Plan Tasks">
          <div className="flex flex-col gap-2">
            {data.nextPlan?.tasks?.map((task, i) => (
              <div key={i} className="flex items-center gap-2 group">
                <input
                  type="text"
                  value={task}
                  onChange={(e) => updateNextTask(i, e.target.value)}
                  placeholder="Enter next task..."
                  className="flex-1 text-sm px-2 py-1 bg-slate-100 rounded outline-none border-white"
                />

                {/* ❌ Delete */}
                <button
                  onClick={() => deleteNextTask(i)}
                  className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100"
                >
                  ×
                </button>
              </div>
            ))}

            {/* ➕ Add Button */}
            <button
              onClick={addNextTask}
              className="text-xs text-blue-600 font-semibold mt-1"
            >
              + Add Task
            </button>
          </div>
        </Field>
      </div>
    </Section>
  );
};

export default NextDayPlanSection;

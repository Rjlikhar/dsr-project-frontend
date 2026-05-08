import { TIME_BG_CLS, TIME_KEYS, TIME_META } from "../../../constant/time";

const TimeAllocationSection = ({
    data,
    setData,
    totalHours,
    TimeBar,
    Section,
}) => {

    const calculateTotalHours = (distribution) => {
        return Object.values(distribution || {}).reduce(
            (sum, val) => sum + (parseFloat(val) || 0),
            0
        );
    };

    console.log("TIME_KEYS", TIME_KEYS)

    return (
        <Section icon="⏱" title="Time Allocation">
            <div className="flex flex-col gap-4 mb-5">
                {TIME_KEYS.map((k) => (
                    <TimeBar
                        key={k}
                        keyName={k}
                        value={data.time?.distribution[k]}
                        onChange={(v) => {
                            const updatedDistribution = {
                                ...data.time?.distribution,
                                [k]: v,
                            };

                            setData((prev) => ({
                                ...prev,
                                time: {
                                    ...prev.time,
                                    distribution: updatedDistribution,
                                    totalHours: calculateTotalHours(updatedDistribution), // 👈 update here
                                },
                            }));
                        }}
                    />
                ))}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Total hours
                </span>
                <span className="text-3xl font-black text-slate-800 tabular-nums">
                    {totalHours}
                    <span className="text-sm font-normal text-slate-300 ml-1">
                        hrs
                    </span>
                </span>
            </div>
            {/* Bar chart */}
            {totalHours > 0 && (
                <div className="mt-4">
                    <div className="flex gap-1 h-10 items-end">
                        {TIME_KEYS.filter((k) => data.time.distribution[k] > 0).map(
                            (k) => {
                                const pct =
                                    (data.time.distribution[k] / totalHours) * 100;
                                return (
                                    <div
                                        key={k}
                                        title={`${TIME_META[k].label}: ${data.time.distribution[k]}h`}
                                        className={`${TIME_BG_CLS[k]} rounded-t-md transition-all duration-300 flex-1 min-w-[8px]`}
                                        style={{ height: `${pct}%` }}
                                    />
                                );
                            },
                        )}
                    </div>
                    <div className="flex gap-3 mt-2 flex-wrap">
                        {TIME_KEYS.filter((k) => data.time.distribution[k] > 0).map(
                            (k) => (
                                <div
                                    key={k}
                                    className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium"
                                >
                                    <span
                                        className={`w-2 h-2 rounded-full ${TIME_BG_CLS[k]}`}
                                    />
                                    {TIME_META[k].label}
                                </div>
                            ),
                        )}
                    </div>
                </div>
            )}
        </Section>
    );
};

export default TimeAllocationSection;
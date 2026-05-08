const ChallengesSection = ({
    challenges,
    updateChallenge,
    deleteChallenge,
    addChallenge,
    Section,
}) => {
    return (
        <Section icon="⚠️" title="Challenges & Resolutions">
            <div className="flex flex-col gap-3">
                {challenges?.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg group"
                    >
                        {/* Challenge */}
                        <input
                            type="text"
                            value={item.challenge}
                            onChange={(e) =>
                                updateChallenge(index, "challenge", e.target.value)
                            }
                            placeholder="Enter challenge..."
                            className="flex-1 text-sm px-2 py-1 bg-white rounded outline-none"
                        />

                        {/* Status */}
                        <select
                            value={item.status}
                            onChange={(e) =>
                                updateChallenge(index, "status", e.target.value)
                            }
                            className="text-xs px-2 py-1 bg-white rounded outline-none"
                        >
                            <option value="pending">Pending</option>
                            <option value="solved">ReSolved</option>
                        </select>

                        {/* ✅ Resolution (only if solved) */}
                        {item.status === "solved" && (
                            <input
                                type="text"
                                value={item.resolution}
                                onChange={(e) =>
                                    updateChallenge(index, "resolution", e.target.value)
                                }
                                placeholder="Enter resolution..."
                                className="flex-1 text-sm px-2 py-1 bg-green-100 rounded outline-none"
                            />
                        )}

                        {/* ❌ Delete */}
                        <button
                            onClick={() => deleteChallenge(index)}
                            className="text-slate-300 hover:text-red-500 text-lg opacity-0 group-hover:opacity-100"
                        >
                            ×
                        </button>
                    </div>
                ))}

                {/* ➕ Add Button */}
                <button
                    onClick={addChallenge}
                    className="self-start text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
                >
                    + Add Challenge
                </button>
            </div>
        </Section>
    );
};

export default ChallengesSection;
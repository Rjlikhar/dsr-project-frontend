const ReferencesSection = ({
    data,
    Field,
    Section,
    textareaCls,
    updateReference,
    deleteReference,
    addReference,
    updateCommit,
    deleteCommit,
    addCommit,
}) => {
    return (
        <Section icon="🔗" title="References & Commits">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Reference Links">
                    <div className="flex flex-col gap-2">
                        {data.references?.map((ref, i) => (
                            <div key={i} className="flex items-center gap-2 group">
                                <textarea
                                    className={textareaCls}
                                    value={ref}
                                    onChange={(e) => updateReference(i, e.target.value)}
                                    placeholder="Docs, PRs, Jira links..."
                                />

                                <button
                                    onClick={() => deleteReference(i)}
                                    className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100"
                                >
                                    ×
                                </button>
                            </div>
                        ))}

                        <button
                            onClick={addReference}
                            className="text-xs text-blue-600 font-semibold"
                        >
                            + Add Reference
                        </button>
                    </div>
                </Field>
                <Field label="Code Commit Links">
                    <div className="flex flex-col gap-2">
                        {data.commits?.map((commit, i) => (
                            <div key={i} className="flex items-center gap-2 group">
                                <textarea
                                    className={textareaCls}
                                    value={commit}
                                    onChange={(e) => updateCommit(i, e.target.value)}
                                    placeholder="GitHub / GitLab commit URLs..."
                                />

                                <button
                                    onClick={() => deleteCommit(i)}
                                    className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100"
                                >
                                    ×
                                </button>
                            </div>
                        ))}

                        <button
                            onClick={addCommit}
                            className="text-xs text-blue-600 font-semibold"
                        >
                            + Add Commit
                        </button>
                    </div>
                </Field>
            </div>
        </Section>
    );
};

export default ReferencesSection;
const ActionButtons = ({
    handleSave,
    setShowPreview,
    handleSend,
    user,
    data,
    emailHTML,
    setToast,
}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-10">
            {/* Save */}
            <button
                onClick={handleSave}
                className="flex items-center justify-center gap-2.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-sm rounded-2xl py-3.5 transition-all hover:shadow-md active:scale-[0.98]"
            >
                <span className="text-base">💾</span> Save
            </button>

            {/* Preview */}
            <button
                onClick={() => setShowPreview(true)}
                className="flex items-center justify-center gap-2.5 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-semibold text-sm rounded-2xl py-3.5 transition-all active:scale-[0.98]"
            >
                <span className="text-base">👁</span> Preview
            </button>

            {/* Send */}
            <button
                onClick={() => handleSend({ user, data, emailHTML, setToast })}
                className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-bold text-sm rounded-2xl py-3.5 shadow-lg transition-all active:scale-[0.98]"
            >
                <span className="text-base">🚀</span> Send
            </button>
        </div>
    );
};

export default ActionButtons;
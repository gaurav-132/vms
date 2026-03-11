export function Input({ label, className = "", ...props }) {
    return (
        <label className="grid gap-2 text-sm font-medium text-slate-700">
            {label}
            <input
                className={`w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-indigo-500 placeholder:text-slate-400 focus:ring ${className}`}
                {...props}
            />
        </label>
    );
}

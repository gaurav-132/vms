export function AuthShell({ title, subtitle, children }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-white p-4">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
                <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
                <p className="mb-6 mt-1 text-sm text-slate-500">{subtitle}</p>
                {children}
            </div>
        </div>
    );
}

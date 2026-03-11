export const formatDate = (date, opts = {}) => {
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        ...opts,
    });
};

export const formatTime = (date) => {
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const formatDateTime = (date) =>
    `${formatDate(date)} ${formatTime(date)}`;

export function DateFormatter(dateStr: string) {
    const date = new Date(dateStr);

// Format to DD MM YYYY
    const formattedDate = `${String(date.getDate()).padStart(2, '0')} / ${String(date.getMonth() + 1).padStart(2, '0')} / ${date.getFullYear()}`;
    return formattedDate
}
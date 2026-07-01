/**
 * Converts an array of objects to a CSV string and triggers a browser download.
 */
export function exportToCsv(filename: string, rows: Record<string, unknown>[]) {
  if (!rows || rows.length === 0) {
    alert('Tidak ada data untuk diekspor.');
    return;
  }

  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(','),
    ...rows.map((row) =>
      headers.map((h) => {
        const val = row[h];
        if (val === null || val === undefined) return '';
        const str = String(val).replace(/"/g, '""');
        // Wrap in quotes if contains comma, newline, or quotes
        return /[",\n\r]/.test(str) ? `"${str}"` : str;
      }).join(',')
    ),
  ].join('\n');

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

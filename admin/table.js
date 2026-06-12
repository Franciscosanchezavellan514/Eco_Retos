function createTable(containerId, columns, rows) {
    const container = document.getElementById(containerId);

    if (!container) {
        return;
    }

    if (!rows || rows.length === 0) {
        container.innerHTML =
        '<p class="table-empty">No hay datos disponibles.</p>';
        return;
    }

    let html = `
        <div class="table-wrapper">
            <table class="app-table">
                <thead>
                    <tr>
    `;

    columns.forEach(function(column) {
        html += `<th>${column.label}</th>`;
    });

    html += `
                    </tr>
                </thead>
                <tbody>
    `;

    rows.forEach(function(row) {
        html += "<tr>";

        columns.forEach(function(column) {
            html += `<td>${row[column.key] ?? ""}</td>`;
        });

        html += "</tr>";
    });

    html += `
                </tbody>
            </table>
        </div>
    `;

    container.innerHTML = html;
}
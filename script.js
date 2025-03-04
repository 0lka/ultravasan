async function fetchSheetData() {
    const sheetID = "1K8PnqG2LdiANzL-VXa6MxTa90dHj311Ch9bdyJiRYQA"; // Ersätt med ditt faktiska Google Sheet ID
    const url = `https://opensheet.elk.sh/${sheetID}/1`; // 1 = första fliken i Google Sheets

    try {
        const response = await fetch(url);
        const data = await response.json();

        const tableBody = document.getElementById("data");
        tableBody.innerHTML = ""; // Rensa tabellen innan ny data läggs till

        data.forEach(row => {
            let tr = document.createElement("tr");
            tr.innerHTML = `<td>${row.Namn}</td><td>${row.Kilometer}</td>`;
            tableBody.appendChild(tr);
        });
    } catch (error) {
        console.error("Fel vid hämtning av data:", error);
    }
}

// Kör funktionen när sidan laddas
fetchSheetData();

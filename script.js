async function fetchSheetData() {
    const sheetID = "1K8PnqG2LdiANzL-VXa6MxTa90dHj311Ch9bdyJiRYQA"; // Byt ut mot ditt ID
    const url = `https://opensheet.elk.sh/${sheetID}/1`; // Hämtar första fliken

    try {
        const response = await fetch(url);
        const data = await response.json();

        const tableBody = document.getElementById("data");
        tableBody.innerHTML = ""; // Töm tabellen

        data.forEach(row => {
            let name = row.Namn;
            let km = parseFloat(row.Kilometer || 0);
            let percent = Math.min((km / 450) * 100, 100); // Max 100%

            // Status baserat på antal kilometer
            let status = "🚀 Nu kör vi!";
            if (km >= 100) status = "🔥 Redan över 100 km!";
            if (km >= 250) status = "💪 Halvvägs!";
            if (km >= 400) status = "🎉 Snart framme!";
            if (km >= 450) status = "🏆 MÅL!";

            // Skapa tabellrad
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${name}</td>
                <td>${km.toFixed(1)} km</td>
                <td>
                    <div class="progress-container">
                        <div class="progress-bar" style="width: ${percent}%"></div>
                    </div>
                </td>
                <td class="status">${status}</td>
            `;
            tableBody.appendChild(tr);
        });
    } catch (error) {
        console.error("Fel vid hämtning av data:", error);
    }
}

// Kör funktionen när sidan laddas
fetchSheetData();

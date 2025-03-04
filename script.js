// Funktion för att beräkna nedräkningen
function updateCountdown() {
    const targetDate = new Date('2025-08-16'); // Måldatum: 16 augusti 2025
    const today = new Date();
    
    // Beräkna skillnaden mellan idag och måldatumet
    const timeDiff = targetDate - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Omvandla till dagar
    
    // Uppdatera nedräkningen på sidan
    document.getElementById("days-left").textContent = daysLeft;
}

// Funktion för att hämta data från Google Sheets och fylla i tabellen
async function fetchSheetData() {
    const sheetID = "1K8PnqG2LdiANzL-VXa6MxTa90dHj311Ch9bdyJiRYQA"; // Byt ut mot ditt ID
    const url = `https://opensheet.elk.sh/${sheetID}/1`; // 1 = första fliken

    try {
        const response = await fetch(url);
        const data = await response.json();

        const table = document.getElementById("data");
        table.innerHTML = ""; // Töm tabellen

        data.forEach(row => {
            let tr = document.createElement("tr");
            const progress = (row.Kilometer / 450) * 100; // Beräkna progress i %
            let status = row.Kilometer >= 450 ? "Komplett" : "Pågående";
            tr.innerHTML = `<td>${row.Namn}</td><td>${row.Kilometer} km</td><td><div class="progress"><div class="progress-bar" style="width:${progress}%"></div></div></td><td>${status}</td>`;
            table.appendChild(tr);
        });
    } catch (error) {
        console.error("Fel vid hämtning av data:", error);
    }
}

// Kör funktionerna när sidan laddas
updateCountdown();
fetchSheetData();

// Funktion för att beräkna nedräkningen
function updateCountdown() {
    const targetDate = new Date('2025-08-16'); // Måldatum: 16 augusti 2025
    const today = new Date();
    
    // Beräkna skillnaden mellan idag och måldatumet
    const timeDiff = targetDate - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Omvandla till dagar
    
    // Uppdatera nedräkningen på sidan
    document.getElementById("countdown").textContent = `Dagar kvar till Ultravasan: ${daysLeft} dagar!`;
}

// Funktion för att hämta data från Google Sheets och fylla i tabellen
async function fetchSheetData() {
    const sheetID = "1K8PnqG2LdiANzL-VXa6MxTa90dHj311Ch9bdyJiRYQA"; // Byt ut mot ditt Google Sheet ID
    const url = `https://opensheet.elk.sh/${sheetID}/1`; // Hämtar första fliken

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Sortera datan efter antal kilometer i fallande ordning
        data.sort((a, b) => {
            let kmA = parseFloat(a.Kilometer.replace(",", ".") || 0); // Konvertera till flyttal
            let kmB = parseFloat(b.Kilometer.replace(",", ".") || 0); // Konvertera till flyttal

            if (isNaN(kmA)) kmA = 0; // Om det är NaN, sätt det till 0
            if (isNaN(kmB)) kmB = 0; // Om det är NaN, sätt det till 0

            return kmB - kmA; // Sortera i fallande ordning (största först)
        });

        const tableBody = document.getElementById("data");
        tableBody.innerHTML = ""; // Töm tabellen

        // Skapa tabellrader
        data.forEach(row => {
            let name = row.Namn;
            let km = parseFloat(row.Kilometer.replace(",", ".") || 0); // Konvertera text till flyttal

            if (isNaN(km)) {
                km = 0; // Om det är NaN, sätt det till 0
            }

            let percent = Math.min((km / 450) * 100, 100); // Beräkna progress, max 100%

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

// Kör funktionerna när sidan laddas
updateCountdown();
fetchSheetData();

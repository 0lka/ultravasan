async function fetchData() {
    const sheetID = "1K8PnqG2LdiANzL-VXa6MxTa90dHj311Ch9bdyJiRYQA"; // Byt ut mot ditt Sheet-ID
    const url = `https://spreadsheets.google.com/feeds/list/${sheetID}/1/public/values?alt=json`;
    
    const response = await fetch(url);
    const data = await response.json();
    const rows = data.feed.entry;

    let html = "";
    rows.forEach(row => {
        const name = row["gsx$namn"]["$t"];
        const time = row["gsx$tid"]["$t"];
        html += `<tr><td>${name}</td><td>${time}</td></tr>`;
    });

    document.getElementById("data").innerHTML = html;
}

fetchData();

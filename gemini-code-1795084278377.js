function rowsToTracks(rows, blogOnly) {
    if (!rows || rows.length < 2) return [];
    const headers = rows[0].map(h => String(h || "").trim());
    const items = [];

    for (let r = 1; r < rows.length; r++) {
        const cells = rows[r];
        if (!cells || cells.every(c => String(c || "").trim() === "")) continue;

        const row = {};
        headers.forEach((h, idx) => {
            if (h !== "") {
                row[h] = cells[idx] !== undefined ? String(cells[idx]).trim() : "";
            }
        });

        const no         = row["track no"] || "";
        const trackName  = row["Track Name"] || "";
        const artistName = row["Artist Name(s)"] || "";
        const memo       = row["Listening Memo"] || "";
        const points     = row["point"] || "";
        const mood       = row["mood"] || "";
        const texture    = row["texture"] || "";
        const link       = row["Link"] || "";
        const flag       = row["フラグ"] || "";

        if (!no) continue;
        if (!trackName && !artistName) continue;
        if (flag === "除外") continue;
        if (blogOnly && !isTruthyFlag(flag)) continue;

        items.push({
            no,
            trackName,
            artistName,
            memo,
            points,
            mood,
            texture,
            spotifyId: extractSpotifyTrackId(link)
        });
    }
    return items;
}
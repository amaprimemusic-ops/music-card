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

        const no         = row["track no"] || String(r);
        const trackName  = row["Track Name"] || "";
        const artistName = row["Artist Name(s)"] || "";
        const memo       = row["Listening Memo"] || "";
        const points     = row["point"] || "";
        const mood       = row["mood"] || "";
        const texture    = row["texture"] || "";
        const link       = row["Link"] || "";

        if (!trackName && !artistName) continue;

        const blogFlag = row["blog"] || "";
        if (blogOnly && !isTruthyFlag(blogFlag)) continue;

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
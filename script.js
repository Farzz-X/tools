function showTool(tool) {
  document.querySelectorAll(".tool-section").forEach(el => el.classList.remove("active"));
  document.getElementById(tool).classList.add("active");
}

async function searchTikTok() {
  const query = document.getElementById("tiktokQuery").value.trim();
  const resultBox = document.getElementById("tiktokResult");

  if (!query) {
    resultBox.innerHTML = "Masukkan kata kunci dulu!";
    return;
  }

  resultBox.innerHTML = "🔍 Sedang mencari...";

  try {
    // Ganti URL API dengan yang benar
    const tiktokApiUrl = `https://faris-apii.biz.id/tiktoksearch?query=${encodeURIComponent(query)}`;
    const res = await fetch(tiktokApiUrl);
    const data = await res.json();

    if (!data || !data.result) {
      resultBox.innerHTML = "❌ Tidak ditemukan hasil TikTok.";
      return;
    }

    // karena result bukan array, jadikan array sementara
    const videos = Array.isArray(data.result) ? data.result : [data.result];

    resultBox.innerHTML = `
      <h3>🎥 Hasil TikTok:</h3>
      <div class="results">
        ${videos.map(v => `
          <div class="card">
            <video src="${v.no_watermark}" controls width="100%" poster="${v.cover}"></video>
            <p><b>${v.title || "Tanpa Judul"}</b></p>
            <audio controls src="${v.music}"></audio>
            <div class="links">
              <a href="${v.no_watermark}" target="_blank">⬇️ Download No Watermark</a>
              <a href="${v.watermark}" target="_blank">⬇️ Download Watermark</a>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } catch (error) {
    console.error(error);
    resultBox.innerHTML = "⚠️ Gagal mengambil data dari API TikTok.";
  }
}

async function searchSpotify() {
  const query = document.getElementById("spotifyQuery").value.trim();
  const resultBox = document.getElementById("spotifyResult");

  if (!query) {
    resultBox.innerHTML = "Masukkan kata kunci lagu!";
    return;
  }

  resultBox.innerHTML = "🎵 Sedang mencari...";

  try {
    // Ganti URL API dengan yang benar
    const spotifyApiUrl = `https://api.siputzx.my.id/api/s/spotify?query=${encodeURIComponent(query)}`;
    const res = await fetch(spotifyApiUrl);
    const data = await res.json();

    if (!data || !data.data) {
      resultBox.innerHTML = "❌ Lagu tidak ditemukan!";
      return;
    }

    resultBox.innerHTML = `
      <h3>🎶 Hasil Spotify:</h3>
      <div class="results">
        ${data.data.map(song => `
          <div class="card">
            <p><b>${song.title}</b> - ${song.artist || "Unknown"}</p>
            <a href="${song.track_url}" target="_blank">⬇️ Download</a>
          </div>
        `).join('')}
      </div>
    `;
  } catch (error) {
    console.error(error);
    resultBox.innerHTML = "⚠️ Gagal mengambil data dari API Spotify.";
  }
}

// Default tampil TikTok
showTool('tiktok');

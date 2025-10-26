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
            <video src="${v.no_watermark}" controls width="100%" poster="${v.cover}" autoplay muted></video>
            <p><b>${v.title || "Tanpa Judul"}</b></p>
            <audio controls src="${v.music}"></audio>
          </div>
        `).join('')}
      </div>
    `;

    // Setelah menambahkan hasil pencarian ke resultBox
    const videoElements = resultBox.querySelectorAll('video'); // Ganti nama variabel menjadi videoElements
    videoElements.forEach(video => {
      // Gunakan setTimeout untuk menunggu video termuat sebelum mencoba download
      setTimeout(() => {
        const videoUrl = video.getAttribute('src');
        downloadResource(videoUrl, 'video.mp4');
      }, 2000); // Tunggu 2 detik (sesuaikan jika perlu)
    });

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
            <img src="${song.thumbnail}" alt="${song.title}" width="100%">
            <p><b>${song.title}</b> - ${song.artist || "Unknown"}</p>
            <audio controls src="${song.preview_url}"></audio>
            <div class="links">
              <a href="${song.preview_url}" download="${song.title} - ${song.artist || 'Unknown'}.mp3">⬇️ Download</a>
            </div>
          </div>
        `).join('')}
      </div>
  
    `;
  } catch (error) {
    console.error(error);
    resultBox.innerHTML = "⚠️ Gagal mengambil data dari API Spotify.";
  }
}

// Fungsi untuk memicu download
function downloadResource(url, filename) {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Default tampil TikTok
showTool('tiktok');

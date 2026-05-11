async function loadTrends(country = 'FR') {
  const container = document.getElementById('trend-list-container');
  container.innerHTML = '<li class="trend-item">Mise à jour...</li>';
  
  try {
    const response = await fetch(`https://searchgtrends-api.vercel.app/api/trends?country=${country}`);
    const data = await response.json();
    
    if (data.error) {
       container.innerHTML = `<li class="trend-item">${data.error}</li>`;
       return;
    }

    container.innerHTML = data.map(item => `
      <li class="trend-item" onclick="window.open('${item.link}', '_blank')">
        <div>
          <div class="trend-word">${item.title}</div>
          <div class="trend-meta">${item.traffic}</div>
        </div>
        <div style="color:var(--accent)">↗</div>
      </li>
    `).join('');
  } catch (e) {
    container.innerHTML = '<li class="trend-item">Serveur en maintenance, réessayez dans 1 min.</li>';
  }
}

document.getElementById("year").textContent = new Date().getFullYear();
loadTrends("FR");

async function loadTrends(country = 'FR') {
  const container = document.getElementById('trend-list-container');
  container.innerHTML = '<li class="trend-item">Mise à jour des tendances...</li>';
  
  try {
    const response = await fetch(`/api/trends?country=${country}`);
    const data = await response.json();
    
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
    container.innerHTML = '<li class="trend-item">Erreur lors du chargement.</li>';
  }
}

document.getElementById("year").textContent = new Date().getFullYear();
loadTrends('FR');
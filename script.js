async function buscarClima() {
  const cidade = document.getElementById("cidade").value.trim();
  const climaEl = document.getElementById("clima");

  if (!cidade) {
    climaEl.innerHTML = "<p>Por favor, digite uma cidade.</p>";
    return;
  }

  const apiKey = "1855e0f290e48cd1e11c805abd5ab5fb";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&appid=${apiKey}&units=metric&lang=pt_br`;

  try {
    const resposta = await fetch(url);

    if (!resposta.ok) {
      climaEl.innerHTML = "<p>Cidade não encontrada.</p>";
      return;
    }

    const dados = await resposta.json();

    const nome = dados.name;
    const temp = dados.main.temp;
    const condicao = dados.weather[0].description;
    const umidade = dados.main.humidity;
    const vento = dados.wind.speed;

    climaEl.innerHTML = `
      <h2>${nome}</h2>
      <p>🌡️ Temperatura: ${temp} °C</p>
      <p>🌤️ Condição: ${condicao}</p>
      <p>💧 Umidade: ${umidade}%</p>
      <p>🌬️ Vento: ${vento} km/h</p>
    `;
  } catch (erro) {
    console.error("Erro na requisição:", erro);
    climaEl.innerHTML = "<p>Erro ao buscar o clima. Verifique sua conexão.</p>";
  }
}

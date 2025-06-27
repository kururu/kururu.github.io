fetch('https://php01-brown.vercel.app/api/note01.php')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('note01');

    // サムネイルとタイトルのHTMLを構築
    const html = `
      <a href="${data.link}" target="_blank">
        <img src="${data.thumbnail}" alt="thumbnail" />
        <h2>${data.title}</h2><div class="logo"></div>
      </a>
    `;

    container.innerHTML = html;
  })
  .catch(error => {
    console.error('データ取得エラー:', error);
    document.getElementById('note01').textContent = 'データの読み込みに失敗しました。';
  });
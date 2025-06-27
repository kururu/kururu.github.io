load01();
function load01() {
document.getElementById("output").innerHTML = "読み込み中...";
const endpoint = "https://script.google.com/macros/s/AKfycbz5RWCwhOyBHzTkKIdgK4shELo6wiZIcdAzJK8iYehDzdMKsI3RNz3IO29729Td2LcH/exec"; // ← 自分のエンドポイントに差し替えてください

fetch(endpoint)
.then(response => response.json())
.then(data => {
  document.getElementById("output").innerHTML = "";
  const container = document.getElementById("output");

  // 最新の5件のみを取得
  const latestData = data.slice(-5);
  latestData.forEach(item => {
    const time = new Date(item.time);
    const formattedTime = `${time.getFullYear()}/${time.getMonth()+1}/${time.getDate()} ${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
    const cleanText = item.text.replace(/^"|"$/g, ''); // 前後の " を除去

    const entry = document.createElement("div");
    entry.className = "entry";

    entry.innerHTML = `
      <div class="text">${cleanText}</div>
      <div class="time">${formattedTime}</div>
    `;

    container.appendChild(entry);
  });
})
.catch(error => {
  console.error("エラー:", error);
});
}

function sendData() {
  const text = encodeURIComponent("ボタンを押しました");
  const url = `https://script.google.com/macros/s/AKfycbz5RWCwhOyBHzTkKIdgK4shELo6wiZIcdAzJK8iYehDzdMKsI3RNz3IO29729Td2LcH/exec?text01=${text}`;

  fetch(url)
    .then(response => response.text())  // GASがJSON返すなら .json() に変更
    .then(data => {
      console.log("レスポンス:", data);
      alert("送信成功");
      load01();
    })
    .catch(error => {
      console.error("エラー:", error);
    });
}

function sendPost() {
  const url = "https://script.google.com/macros/s/AKfycbz8RTw0C3OrDMhFVn2rIj8bs8L1bIklBtPTJAwIwL1qT7G3coJJWOEpKgPYR4StPcDc/exec"; // ←あなたのURLに置き換えてください
　const inputValue = document.getElementById("textInput").value;
  const formData = new FormData();
  formData.append("text01", inputValue);

  fetch(url, {
    method: "POST",
    body: formData,
  })
  .then(response => response.text())
  .then(result => {
    console.log("レスポンス:", result);
    load01();
    alert("送信成功");
  })
  .catch(error => {
    console.error("送信エラー:", error);
    alert("エラーが発生しました");
  });
}
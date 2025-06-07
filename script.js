let database = {};

window.onload = async () => {
  const response = await fetch("database.json");
  database = await response.json();
  
  document.getElementById("user-input").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
};

function sendMessage() {
  const input = document.getElementById('user-input');
  const question = input.value.toLowerCase().trim();
  if (!question) return;

  addMessage("Você", question, "user");

  const answer = database[question] || "Desculpe, ainda não sei responder isso sobre React.";
  typeMessage("Bot", answer, "bot");

  input.value = "";
}

function addMessage(sender, message, type) {
  const chatLog = document.getElementById("chat-log");
  const msg = document.createElement("div");
  msg.className = `message ${type}`;
  msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function typeMessage(sender, fullMessage, type) {
  const chatLog = document.getElementById("chat-log");
  const msg = document.createElement("div");
  msg.className = `message ${type}`;
  msg.innerHTML = `<strong>${sender}:</strong> <span class="typing"></span>`;
  chatLog.appendChild(msg);

  const span = msg.querySelector(".typing");
  let index = 0;

  function typeChar() {
    if (index < fullMessage.length) {
      span.innerHTML += fullMessage.charAt(index);
      index++;
      chatLog.scrollTop = chatLog.scrollHeight;
      setTimeout(typeChar, 30);
    }
  }

  typeChar();
}

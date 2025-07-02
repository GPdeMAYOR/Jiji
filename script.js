const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

chatForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("user", message);
  userInput.value = "";

  if (message.toLowerCase().includes("search")) {
    simulateTyping("Searching online...", () => getWebSearchResults(message));
  } else {
    simulateTyping("Let me think...", () => generateFountainReply(message));
  }
});

function appendMessage(sender, text, isHTML = false) {
  const msg = document.createElement("div");
  msg.classList.add(sender === "user" ? "user-message" : "bot-message");
  if (isHTML) msg.innerHTML = text;
  else msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function simulateTyping(placeholder, callback) {
  const typingBubble = document.createElement("div");
  typingBubble.classList.add("bot-message");
  typingBubble.textContent = "";
  chatBox.appendChild(typingBubble);

  let i = 0;
  const interval = setInterval(() => {
    if (i < placeholder.length) {
      typingBubble.textContent += placeholder[i];
      i++;
      chatBox.scrollTop = chatBox.scrollHeight;
    } else {
      clearInterval(interval);
      typingBubble.remove();
      callback();
    }
  }, 30);
}

function generateFountainReply(userText) {
  let reply = "Hmm, I don't quite know how to respond.";

  const text = userText.toLowerCase();
  if (text.includes("hello") || text.includes("hi")) reply = "Hey there! I'm Fountain 😊";
  else if (text.includes("name")) reply = "I'm Fountain, your smart assistant.";
  else if (text.includes("how are you")) reply = "I'm fantastic and ready to help you!";
  else if (text.includes("thank")) reply = "You're most welcome!";
  else reply = "Try saying 'search ...' and I’ll look it up online for you.";

  appendMessage("bot", reply);
}

async function getWebSearchResults(query) {
  try {
    const res = await fetch("http://localhost:3000/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });

    const data = await res.json();
    if (!data.results || data.results.length === 0) {
      appendMessage("bot", "Sorry, I couldn’t find anything relevant.");
      return;
    }

    const top = data.results.slice(0, 3).map(item =>
      `🔹 <a href="${item.url}" target="_blank">${item.title}</a><br>${item.snippet}`
    ).join("<br><br>");

    appendMessage("bot", top, true);
  } catch (err) {
    appendMessage("bot", "Something went wrong while searching.");
  }

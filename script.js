const chatForm = document.getElementById('chat-form');
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

chatForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const message = userInput.value.trim();
  if (message === '') return;

  appendMessage('user', message);
  userInput.value = '';

  setTimeout(() => {
    const reply = generateBotReply(message);
    appendMessage('bot', reply);
  }, 1000);
});

function appendMessage(sender, text) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender);
  msgDiv.innerText = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function generateBotReply(message) {
  const lower = message.toLowerCase();

  if (lower.includes("hello") || lower.includes("hi")) {
    return "Hello! I'm Fountain AI. How can I assist you today?";
  }

  if (lower.includes("who are you") || lower.includes("what is your name")) {
    return "I'm Fountain AI, your animated smart assistant.";
  }

  if (lower.includes("weather")) {
    return "I can't check real-time weather yet, but I recommend checking Google Weather or installing a weather app!";
  }

  if (lower.includes("news")) {
    return "Currently, I can't fetch live news. Would you like me to be connected to the internet for real-time updates?";
  }

  if (lower.includes("how are you")) {
    return "I'm always great! I'm made of pure code and coffee ☕.";
  }

  if (lower.includes("help") || lower.includes("what can you do")) {
    return "I can chat, provide information, simulate AI responses, and even be upgraded to use real-time APIs!";
  }

  if (lower.includes("life advice")) {
    return "Life is a journey—stay curious, stay learning, and treat people kindly.";
  }

  if (lower.includes("joke")) {
    return "Why did the computer catch a cold? Because it left its Windows open!";
  }

  if (lower.includes("programming")) {
    return "Programming is like magic—only the spells are written in Python, JavaScript, or C++.";
  }

  if (lower.includes("love")) {
    return "Love is a beautiful part of life. Cherish it when you find it 💖.";
  }

  if (lower.includes("god")) {
    return "Many believe in a higher power—it's a personal journey. Do you have questions about faith?";
  }

  return "Hmm... I don't have a perfect answer to that yet, but I'm learning more every day! Want to ask something else?";
}

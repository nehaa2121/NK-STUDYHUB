const sendBtn = document.getElementById('send-btn');
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

sendBtn.addEventListener('click', sendToAI);

async function sendToAI() {
  const input = userInput.value.trim();
  if (!input) return;

  // Show user message
  chatBox.innerHTML += `<div class="user-msg">You: ${input}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
  userInput.value = '';

  // AI call
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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" // Replace with your OpenAI API key
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful study assistant for Computer Science and MCA CET topics." },
          { role: "user", content: input }
        ]
      })
    });

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    // Show AI response
    chatBox.innerHTML += `<div class="ai-msg">AI: ${aiMessage}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (error) {
    chatBox.innerHTML += `<div class="ai-msg">AI: Sorry, something went wrong. Try again.</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
    console.error(error);
  }
}

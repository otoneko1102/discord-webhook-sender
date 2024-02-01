function sendWebhook(event) {
  event.preventDefault();
  
  const webhookUrl = document.getElementById("webhookUrl").value;
  const interval = document.getElementById("interval").value || 1000;
  const times = document.getElementById("times").value || 1;
  const message = document.getElementById("message").value;
  const fileInput = document.getElementById("file");
  const option = document.getElementById("option").value;

  if (!webhookUrl || !interval || !times) {
    alert("Missing parameters.");
    return;
  }

  if (!message && fileInput.files.length == 0) {
    alert("Missing parameters.");
    return;
  }
  
  const modifiedMessage = applyOption(message, option);

  const payload = {
    content: modifiedMessage
  };
  
  const formData = new FormData();
  formData.append("payload_json", JSON.stringify(payload));
  if (fileInput.files.length > 0) {
    formData.append("file", fileInput.files[0]);
  }
  
  for (let i = 0; i < times; i++) {
    setTimeout(() => {
      fetch(webhookUrl, {
        method: "POST",
        body: formData
      }).then(response => {
        console.log("Message sent successfully!");
      }).catch(error => {
        console.error("Error sending message:", error);
      });
    }, i * interval);
  }
  alert(`Sent ${times} messages by ${webhookUrl}!`);
}

function applyOption(message, option) {
  switch (option) {
    case "Add random string at the top":
      return addRandomStringAtTop(message);
    case "Add random string at the end":
      return addRandomStringAtEnd(message);
    default:
      return message;
  }
}

function addRandomStringAtTop(message) {
  const randomString = generateRandomString();
  return `\n\n${randomString}${message}`;
}

function addRandomStringAtEnd(message) {
  const randomString = generateRandomString();
  return `${message}\n\n${randomString}`;
}

function generateRandomString() {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = "";
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
}

function clearFile() {
  const fileInput = document.getElementById("file");
  fileInput.value = null;
}

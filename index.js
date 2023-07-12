function sendWebhook(event) {
    event.preventDefault();
    
    var webhookUrl = document.getElementById("webhookUrl").value;
    var interval = document.getElementById("interval").value || 1000;
    var times = document.getElementById("times").value || 1;
    var message = document.getElementById("message").value;
    var fileInput = document.getElementById("file");
    
    var payload = {
        content: message
    };
    
    var formData = new FormData();
    formData.append("payload_json", JSON.stringify(payload));
    if (fileInput.files.length > 0) {
        formData.append("file", fileInput.files[0]);
    }
    
    for (var i = 0; i < times; i++) {
        setTimeout(function() {
            fetch(webhookUrl, {
                method: "POST",
                body: formData
            }).then(function(response) {
                console.log("Message sent successfully!");
            }).catch(function(error) {
                console.error("Error sending message:", error);
            });
        }, i * interval);
    }
}

function clearFile() {
    var fileInput = document.getElementById("file");
    fileInput.value = null;
}

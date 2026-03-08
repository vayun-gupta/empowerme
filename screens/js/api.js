async function sendMessage(){

    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value;

    if(message.trim() === "") return;

    const response = await fetch("http://127.0.0.1:8000/session/message",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            message: message
        })
    });

    const data = await response.json();

    showReply(data.reply);

    messageInput.value = "";
}

function showReply(text){

    let chatBox = document.getElementById("chatBox");

    if(!chatBox){
        chatBox = document.createElement("div");
        chatBox.id = "chatBox";
        document.querySelector("main").appendChild(chatBox);
    }

    const msg = document.createElement("div");
    msg.innerText = text;

    msg.style.background = "#ffffff";
    msg.style.color = "#000000";
    msg.style.padding = "10px";
    msg.style.margin = "10px";
    msg.style.borderRadius = "10px";

    chatBox.appendChild(msg);
}
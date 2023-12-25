document.addEventListener("DOMContentLoaded", () => {
  const socket = io();
  let user = "";
  const chatbox = document.getElementById("user__input");
  const messagesContainer = document.getElementById("messages__container");
  const userContainer = document.getElementById("user__container"); // Agregado

  Swal.fire({
    title: "Ingrese su email",
    input: "text",
    inputValidator: (value) => {
      return !value && "Debe ingresar su email";
    },
    icon: "success",
    allowOutsideClick: false,
  }).then((result) => {
    user = result.value;
    socket.emit("auth", user);
    console.log("Authenticated with user:", user); // Añade este log
  });

  chatbox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      if (chatbox.value.trim().length > 0) {
        saveMessage(user, chatbox.value);
        chatbox.value = "";
      }
    }
  });

  const loadMessages = (messages) => {
    console.log("Received messages from server:", messages);
    messages.forEach((message) => appendNewMessage(message));
  };

  const saveMessage = (user, message) => {
    socket.emit("client:newMessage", { user, message });
  };

  const loadNewMessage = (message) => {
    console.log("Received new message from server:", message);
    appendNewMessage(message);
  };

  const loadUsers = (users) => {
    console.log("Received user list from server:", users);
    renderUsers(users);
  };

  const renderUsers = (users) => {
    userContainer.innerHTML = "";
    users.forEach((user) => {
      const userElement = document.createElement("div");
      userElement.textContent = user;
      userContainer.appendChild(userElement);
    });
  };

  const oneMessage = (message) => {
    const container = document.createElement("div");
    container.innerHTML = `
      <h3>${message.user}:</h3>
      <p>${message.message}</p>
    `;
    return container;
  };

  const appendNewMessage = (message) => {
    messagesContainer.append(oneMessage(message));
  };

  socket.on("server:messages", loadMessages);
  socket.on("server:newMessage", loadNewMessage);
  socket.on("server:users", loadUsers); // Agregado
});

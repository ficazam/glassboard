const { io } = require("socket.io-client");

const socket = io("http://localhost:3001", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("[test] connected:", socket.id);

  socket.emit("client-event", {
    type: "create-card",
    payload: {
      title: "Created from test script",
      description: "If you see this in the UI, WS works.",
      columnId: "todo",
    },
  });
});

socket.on("server-event", (event) => {
  console.log("[test] server-event:", JSON.stringify(event, null, 2));
});

socket.on("disconnect", () => {
  console.log("[test] disconnected");
});

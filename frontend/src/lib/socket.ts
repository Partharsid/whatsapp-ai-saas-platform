import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

class SocketService {
  private socket: Socket | null = null;

  connect(userId: string) {
    if (!this.socket) {
      this.socket = io(SOCKET_URL, {
        withCredentials: true,
      });

      this.socket.on("connect", () => {
        console.log("Connected to WebSocket");
        this.socket?.emit("join", userId);
      });

      this.socket.on("disconnect", () => {
        console.log("Disconnected from WebSocket");
      });
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket() {
    return this.socket;
  }
}

export const socketService = new SocketService();

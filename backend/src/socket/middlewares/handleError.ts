import {Socket} from "socket.io";
import {Handler} from "../types";

export const handleError = (socket: Socket, handler: Handler) => {
  return async (data?: any) => {
    try {
      await handler.execute(socket, data);
    } catch (error) {
      console.error(error);
      console.log("ocurrió un problema al procesar el evento, se desconecta el cliente");
      socket.disconnect();
    }
  };
};

import openSocket from 'socket.io-client';

export enum SocketsEvents {
  RootInput = "RootInput",
}


class Socket {
  
  static isEnabled = ['True', 'TRUE', 'true', '1'].includes(process.env.REACT_APP_SOCKET_ENABLED || '');
  
  static socket = Socket.isEnabled ? openSocket(process.env.REACT_APP_SOCKET_URL || '') : null;
  
  static subscribeToRootInput(callback: (data: string) => void): void {
    Socket.socket?.on(SocketsEvents.RootInput, (data: string) => {
      console.log('%c' + Date.now() + ' Socket RootInput event', 'color: #4444ff; font-weight: bold;', '\n', data);
      callback(data);
    });
  }
  
  static broadcastRootInput(data: string): boolean {
    if (Socket.socket?.connected) {
      console.log('%c' + Date.now() + ' Socket emit RootInput event', 'color: #4444ff; font-weight: bold;', '\n', data);
      Socket.socket.emit(SocketsEvents.RootInput, data);
      return true;
    } else {
      return false;
    }
  }
  
}

export default Socket;
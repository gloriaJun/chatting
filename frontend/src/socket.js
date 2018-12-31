import io from 'socket.io-client';

const socket = io(process.env.VUE_APP_SOCKET_URL);

const EVENTS = {
  ERROR: 'error',
  LOGIN: 'login',

  // join to room
  JOIN: 'join',
  LEAVE: 'leave',
  MEMBER_UPDATE: 'memberUpdate',
  MESSAGE: 'message',
};

/**
 * global
 */
socket.on(EVENTS.ERROR, (err) => {
  console.log('Received Socket Error', err);
});

/**
 * define event function
 */
const socketEvents = {
  login: (userInfo, callback) => socket.emit(EVENTS.LOGIN, userInfo, callback),
  join: (roomId, callback) => socket.emit(EVENTS.JOIN, roomId, callback),
  leave: (roomId, callback) => socket.emit(EVENTS.LEAVE, roomId, callback),

  // register event for listening
  unregisterEvent: () => {
    socket.off(EVENTS.MEMBER_UPDATE);
    socket.off(EVENTS.MESSAGE);
  },
  registerMemberUpdate: onMemberJoined => socket.on(EVENTS.MEMBER_UPDATE, onMemberJoined),
  registerMessage: onReceiveMessage => socket.on(EVENTS.MESSAGE, onReceiveMessage),
  sendMessage: messageInfo => socket.emit(EVENTS.MESSAGE, messageInfo),
};

export default socketEvents;

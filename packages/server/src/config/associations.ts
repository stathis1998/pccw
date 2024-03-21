import User from "../api/models/userModel";
import Message from "../api/models/messageModel";
import ChatRoom from "../api/models/chatRoomModel";

function runAssosiacion(): void {
  User.hasMany(Message);
  Message.belongsTo(User);

  ChatRoom.hasMany(Message);
  Message.belongsTo(ChatRoom);
}

export { runAssosiacion };

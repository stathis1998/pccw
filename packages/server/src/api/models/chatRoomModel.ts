import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db";

class ChatRoomModel extends Model {
  public name!: string;
}

ChatRoomModel.init(
  {
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: "chatRooms",
    sequelize,
  }
);

export default ChatRoomModel;
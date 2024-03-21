import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db";

class Message extends Model {
  public content!: string;

  public userId!: number;
  public chatRoomId!: number;
}

Message.init(
  {
    content: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    userId: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    chatRoomId: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      references: {
        model: "chatRooms",
        key: "id",
      },
    },
  },
  {
    tableName: "messages",
    sequelize,
  }
);

export default Message;

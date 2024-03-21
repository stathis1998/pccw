import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import User from "../models/userModel";
import Message from "../models/messageModel";
import ChatRoom from "../models/chatRoomModel";

export async function createChatRoom(req: Request, res: Response) {
  try {
    const { name } = req.body;

    const existingChatRoom = await ChatRoom.findOne({ where: { name } });
    if (existingChatRoom) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Chat room already exists" });
    }

    const newChatRoom = await ChatRoom.create({ name });

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Chat room created", data: newChatRoom });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error creating chat room", error });
  }
}

export async function deleteChatRoom(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const chatRoom = await ChatRoom.findByPk(id);
    if (!chatRoom) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Chat room not found" });
    }

    await chatRoom.destroy();

    res.status(StatusCodes.OK).json({ message: "Chat room deleted" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error deleting chat room", error });
  }
}

export async function getChatRooms(req: Request, res: Response) {
  try {
    const chatRooms = await ChatRoom.findAll();

    res.status(StatusCodes.OK).json({ data: chatRooms });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error getting chat rooms", error });
  }
}

export async function createMessage(req: Request, res: Response) {
  try {
    const { content, userId, chatRoomId } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    const chatRoom = await ChatRoom.findByPk(chatRoomId);
    if (!chatRoom) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Chat room not found" });
    }

    const newMessage = await Message.create({ content, userId, chatRoomId });

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Message created", data: newMessage });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error creating message", error });
  }
}

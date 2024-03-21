import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

import User from "../models/userModel";
import authService from "../services/authService";
import jwtConfig from "../../config/jwtConfig";

export async function register(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Username already in use" });
    }

    const newUser = await User.create({ username, password });

    const token = jwt.sign({ user: newUser }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    res
      .status(StatusCodes.CREATED)
      .json({ message: "User created", data: { user: newUser, token } });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error registering new user", error });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Invalid credentials",
      });
    }

    const passwordMatch = await authService.comparePasswords(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res
      .status(StatusCodes.OK)
      .json({ message: "Login successful", data: { user, token } });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error logging in", error });
  }
}

export function validate(req: Request, res: Response) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Authorization header is required" });
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid token" });
    }

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid token" });
    }

    if (!token) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Token is required" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!verified) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid token" });
    }

    res.status(StatusCodes.OK).json({ message: "Token is valid" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error validating token", error });
  }
}

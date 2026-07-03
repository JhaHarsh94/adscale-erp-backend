import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";
import { verifyToken } from "../utils/jwt";
import { AppError } from "../utils/AppError";

export interface ClientAuthRequest extends Request {
  clientUser?: {
    id: string;
    clientId: string;
    name: string;
    email: string;
  };
}

export const clientProtect = async (
  req: ClientAuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Authentication token missing", 401);
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (decoded.role !== "CLIENT") {
      throw new AppError("Invalid client token", 401);
    }

    const clientUser = await prisma.clientUser.findUnique({
      where: { id: decoded.userId },
    });

    if (!clientUser) {
      throw new AppError("Client user not found", 401);
    }

    if (!clientUser.isActive) {
      throw new AppError("Account is deactivated", 403);
    }

    req.clientUser = {
      id: clientUser.id,
      clientId: clientUser.clientId,
      name: clientUser.name,
      email: clientUser.email,
    };

    next();
  } catch (error) {
    next(error);
  }
};

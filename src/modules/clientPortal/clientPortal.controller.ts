import { Response } from "express";
import prisma from "../../config/prisma";
import { asyncHandler } from "../../utils/asyncHandler";
import { AppError } from "../../utils/AppError";
import { comparePassword, hashPassword } from "../../utils/password";
import { generateToken } from "../../utils/jwt";
import { successResponse } from "../../utils/response";
import type { AuthRequest } from "../../middlewares/auth.middleware";

interface ClientAuthRequest extends AuthRequest {
  clientUser?: {
    id: string;
    clientId: string;
    name: string;
    email: string;
  };
}

function strVal(val: unknown): string | undefined {
  if (val === undefined || val === null) return undefined;
  return String(val);
}

export const clientLogin = asyncHandler(async (req, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  const clientUser = await prisma.clientUser.findUnique({
    where: { email: String(email).toLowerCase().trim() },
    include: { client: true, portalAccess: true },
  });

  if (!clientUser) {
    throw new AppError("Invalid credentials", 401);
  }

  if (!clientUser.isActive) {
    throw new AppError("Account is deactivated. Contact the administrator.", 403);
  }

  const isMatch = await comparePassword(password, clientUser.password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  await prisma.clientUser.update({
    where: { id: clientUser.id },
    data: { lastLogin: new Date() },
  });

  await prisma.clientActivityLog.create({
    data: {
      clientUserId: clientUser.id,
      action: "LOGIN",
      ipAddress: req.ip || null,
    },
  });

  const token = generateToken({
    userId: clientUser.id,
    email: clientUser.email,
    role: "CLIENT",
  });

  return successResponse(res, 200, "Login successful", {
    token,
    user: {
      id: clientUser.id,
      clientId: clientUser.clientId,
      name: clientUser.name,
      email: clientUser.email,
      phone: clientUser.phone,
      clientName: clientUser.client.name,
      portalAccess: clientUser.portalAccess,
    },
  });
});

export const getClientProfile = asyncHandler(async (req: ClientAuthRequest, res: Response) => {
  const clientUser = await prisma.clientUser.findUnique({
    where: { id: req.clientUser!.id },
    include: { client: true, portalAccess: true },
  });

  if (!clientUser) {
    throw new AppError("Client user not found", 404);
  }

  return successResponse(res, 200, "Profile fetched successfully", {
    id: clientUser.id,
    clientId: clientUser.clientId,
    name: clientUser.name,
    email: clientUser.email,
    phone: clientUser.phone,
    isActive: clientUser.isActive,
    lastLogin: clientUser.lastLogin,
    clientName: clientUser.client.name,
    portalAccess: clientUser.portalAccess,
  });
});

export const getClientDashboard = asyncHandler(async (req: ClientAuthRequest, res: Response) => {
  const { clientId } = req.clientUser!;

  const [
    totalProjects,
    activeProjects,
    completedProjects,
    openTickets,
    resolvedTickets,
    totalFiles,
  ] = await Promise.all([
    prisma.project.count({ where: { clientId } }),
    prisma.project.count({ where: { clientId, status: "ACTIVE" } }),
    prisma.project.count({ where: { clientId, status: "COMPLETED" } }),
    prisma.ticket.count({ where: { clientId, status: { in: ["OPEN", "ASSIGNED", "IN_PROGRESS"] } as any } }),
    prisma.ticket.count({ where: { clientId, status: "RESOLVED" } }),
    prisma.file.count({ where: { clientId } }),
  ]);

  return successResponse(res, 200, "Dashboard data fetched", {
    totalProjects,
    activeProjects,
    completedProjects,
    openTickets,
    resolvedTickets,
    totalFiles,
  });
});

export const getClientProjects = asyncHandler(async (req: ClientAuthRequest, res: Response) => {
  const { clientId } = req.clientUser!;
  const vStatus = strVal(req.query.status);
  const vSearch = strVal(req.query.search);

  const projects = await prisma.project.findMany({
    where: {
      clientId,
      status: vStatus as any,
      OR: vSearch
        ? [
            { name: { contains: vSearch, mode: "insensitive" } },
            { projectCode: { contains: vSearch, mode: "insensitive" } },
          ]
        : undefined,
    },
    include: {
      manager: {
        select: {
          id: true,
          employeeCode: true,
          user: { select: { id: true, name: true, email: true } },
        },
      },
      milestones: {
        orderBy: { dueDate: "asc" },
        select: { id: true, title: true, status: true, dueDate: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return successResponse(res, 200, "Projects fetched", projects);
});

export const getClientProjectById = asyncHandler(async (req: ClientAuthRequest, res: Response) => {
  const { clientId } = req.clientUser!;
  const id = String(req.params.id);

  const project = await prisma.project.findFirst({
    where: { id, clientId },
    include: {
      manager: {
        select: {
          id: true,
          employeeCode: true,
          user: { select: { id: true, name: true, email: true, phone: true } },
        },
      },
      members: {
        include: {
          employee: {
            select: {
              id: true,
              employeeCode: true,
              user: { select: { id: true, name: true } },
            },
          },
        },
      },
      milestones: { orderBy: { dueDate: "asc" } },
      timelines: { orderBy: { eventDate: "desc" }, take: 10 },
    },
  });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  return successResponse(res, 200, "Project fetched", project);
});

export const getClientTickets = asyncHandler(async (req: ClientAuthRequest, res: Response) => {
  const { clientId } = req.clientUser!;
  const vStatus = strVal(req.query.status);
  const vPriority = strVal(req.query.priority);
  const vSearch = strVal(req.query.search);

  const tickets = await prisma.ticket.findMany({
    where: {
      clientId,
      status: vStatus as any,
      priority: vPriority as any,
      OR: vSearch
        ? [
            { title: { contains: vSearch, mode: "insensitive" } },
            { ticketNumber: { contains: vSearch, mode: "insensitive" } },
          ]
        : undefined,
    },
    include: {
      category: { select: { id: true, name: true } },
      assignedTo: {
        select: {
          id: true,
          user: { select: { id: true, name: true } },
        },
      },
      comments: {
        orderBy: { createdAt: "desc" },
        take: 3,
        include: {
          author: { select: { id: true, name: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return successResponse(res, 200, "Tickets fetched", tickets);
});

export const createClientTicket = asyncHandler(async (req: ClientAuthRequest, res: Response) => {
  const { clientId } = req.clientUser!;
  const { title, description, priority, categoryId } = req.body;

  if (!title || !description) {
    throw new AppError("Title and description are required", 400);
  }

  const count = await prisma.ticket.count();
  const ticketNumber = `TKT-${String(count + 1).padStart(4, "0")}`;

  const ticket = await prisma.ticket.create({
    data: {
      ticketNumber,
      title: String(title).trim(),
      description: String(description).trim(),
      priority: priority || "MEDIUM",
      source: "CLIENT",
      status: "OPEN",
      clientId,
      categoryId: categoryId || null,
    },
    include: {
      category: { select: { id: true, name: true } },
    },
  });

  await prisma.clientActivityLog.create({
    data: {
      clientUserId: req.clientUser!.id,
      action: "CREATE_TICKET",
      details: `Created ticket: ${ticketNumber}`,
    },
  });

  return successResponse(res, 201, "Ticket created successfully", ticket);
});

export const getClientTicketById = asyncHandler(async (req: ClientAuthRequest, res: Response) => {
  const { clientId } = req.clientUser!;
  const id = String(req.params.id);

  const ticket = await prisma.ticket.findFirst({
    where: { id, clientId },
    include: {
      category: { select: { id: true, name: true } },
      assignedTo: {
        select: {
          id: true,
          user: { select: { id: true, name: true, email: true } },
        },
      },
      comments: {
        orderBy: { createdAt: "asc" },
        include: {
          author: { select: { id: true, name: true, email: true } },
        },
      },
      statusLogs: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!ticket) {
    throw new AppError("Ticket not found", 404);
  }

  return successResponse(res, 200, "Ticket fetched", ticket);
});

export const addTicketComment = asyncHandler(async (req: ClientAuthRequest, res: Response) => {
  const { clientId } = req.clientUser!;
  const id = String(req.params.id);
  const { body } = req.body;

  if (!body) {
    throw new AppError("Comment body is required", 400);
  }

  const ticket = await prisma.ticket.findFirst({
    where: { id, clientId },
  });

  if (!ticket) {
    throw new AppError("Ticket not found", 404);
  }

  const comment = await prisma.ticketComment.create({
    data: {
      ticketId: id,
      body: String(body).trim(),
      isInternal: false,
    },
    include: {
      author: { select: { id: true, name: true, email: true } },
    },
  });

  return successResponse(res, 201, "Comment added", comment);
});

export const getClientFiles = asyncHandler(async (req: ClientAuthRequest, res: Response) => {
  const { clientId } = req.clientUser!;
  const vFolderId = strVal(req.query.folderId);

  const files = await prisma.file.findMany({
    where: {
      clientId,
      folderId: vFolderId || undefined,
    },
    include: {
      folder: { select: { id: true, name: true } },
      uploadedBy: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const folders = await prisma.folder.findMany({
    where: {
      clientId,
      parentId: vFolderId || null,
      isActive: true,
    },
    orderBy: { name: "asc" },
  });

  return successResponse(res, 200, "Files fetched", { files, folders });
});

export const getClientApprovals = asyncHandler(async (req: ClientAuthRequest, res: Response) => {
  const vStatus = strVal(req.query.status);

  const approvals = await prisma.approval.findMany({
    where: {
      status: vStatus as any,
      OR: [
        { files: { some: {} } },
      ],
    },
    include: {
      createdBy: { select: { id: true, name: true, email: true } },
      files: true,
      steps: {
        include: {
          reviewer: {
            select: {
              id: true,
              user: { select: { id: true, name: true } },
            },
          },
        },
        orderBy: { stepOrder: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return successResponse(res, 200, "Approvals fetched", approvals);
});

export const approveClientApproval = asyncHandler(async (req: ClientAuthRequest, res: Response) => {
  const id = String(req.params.id);
  const { comments } = req.body;

  const approval = await prisma.approval.findUnique({
    where: { id },
    include: { steps: true },
  });

  if (!approval) {
    throw new AppError("Approval not found", 404);
  }

  if (approval.status !== "PENDING" && approval.status !== "IN_REVIEW") {
    throw new AppError("Approval is already finalized", 400);
  }

  const updatedApproval = await prisma.approval.update({
    where: { id },
    data: {
      status: "APPROVED",
      comments: {
        create: {
          body: comments || "Approved via client portal",
          userId: null,
        },
      },
    },
    include: {
      createdBy: { select: { id: true, name: true } },
      files: true,
      steps: true,
    },
  });

  await prisma.clientActivityLog.create({
    data: {
      clientUserId: req.clientUser!.id,
      action: "APPROVE_WORK",
      details: `Approved: ${approval.title}`,
    },
  });

  return successResponse(res, 200, "Approval approved", updatedApproval);
});

export const rejectClientApproval = asyncHandler(async (req: ClientAuthRequest, res: Response) => {
  const id = String(req.params.id);
  const { comments } = req.body;

  if (!comments) {
    throw new AppError("Comments are required for rejection", 400);
  }

  const approval = await prisma.approval.findUnique({
    where: { id },
  });

  if (!approval) {
    throw new AppError("Approval not found", 404);
  }

  if (approval.status !== "PENDING" && approval.status !== "IN_REVIEW") {
    throw new AppError("Approval is already finalized", 400);
  }

  const updatedApproval = await prisma.approval.update({
    where: { id },
    data: {
      status: "REVISIONS_REQUESTED",
      comments: {
        create: {
          body: comments,
          userId: null,
        },
      },
    },
    include: {
      createdBy: { select: { id: true, name: true } },
      files: true,
      steps: true,
    },
  });

  await prisma.clientActivityLog.create({
    data: {
      clientUserId: req.clientUser!.id,
      action: "REJECT_WORK",
      details: `Requested revisions for: ${approval.title}`,
    },
  });

  return successResponse(res, 200, "Revisions requested", updatedApproval);
});

export const getClientMeetings = asyncHandler(async (req: ClientAuthRequest, res: Response) => {
  const vStatus = strVal(req.query.status);

  const meetings = await prisma.formalMeeting.findMany({
    where: {
      status: vStatus as any,
    },
    include: {
      createdBy: { select: { id: true, name: true } },
      agendaItems: { orderBy: { sortOrder: "asc" } },
      minutes: true,
      actionItems: {
        include: {
          assignedTo: {
            select: {
              id: true,
              user: { select: { id: true, name: true } },
            },
          },
        },
        orderBy: { sortOrder: "asc" },
      },
    },
    orderBy: { meetingDate: "desc" },
  });

  return successResponse(res, 200, "Meetings fetched", meetings);
});

export const getClientNotifications = asyncHandler(async (req: ClientAuthRequest, res: Response) => {
  const clientUser = await prisma.clientUser.findUnique({
    where: { id: req.clientUser!.id },
    include: {
      notifications: {
        orderBy: { createdAt: "desc" },
        take: 50,
      },
    },
  });

  const unreadCount = await prisma.clientNotification.count({
    where: { clientUserId: req.clientUser!.id, isRead: false },
  });

  return successResponse(res, 200, "Notifications fetched", {
    notifications: clientUser?.notifications || [],
    unreadCount,
  });
});

export const markNotificationRead = asyncHandler(async (req: ClientAuthRequest, res: Response) => {
  const id = String(req.params.id);

  await prisma.clientNotification.updateMany({
    where: { id, clientUserId: req.clientUser!.id },
    data: { isRead: true, readAt: new Date() },
  });

  return successResponse(res, 200, "Notification marked as read");
});

export const markAllNotificationsRead = asyncHandler(async (req: ClientAuthRequest, res: Response) => {
  await prisma.clientNotification.updateMany({
    where: { clientUserId: req.clientUser!.id, isRead: false },
    data: { isRead: true, readAt: new Date() },
  });

  return successResponse(res, 200, "All notifications marked as read");
});

export const adminCreateClientUser = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { clientId, name, email, phone, password } = req.body;

  if (!clientId || !name || !email || !password) {
    throw new AppError("clientId, name, email and password are required", 400);
  }

  const client = await prisma.client.findUnique({ where: { id: clientId } });

  if (!client) {
    throw new AppError("Client not found", 404);
  }

  const existing = await prisma.clientUser.findUnique({ where: { email: email.toLowerCase().trim() } });

  if (existing) {
    throw new AppError("A client user with this email already exists", 409);
  }

  const hashedPassword = await hashPassword(password);

  const clientUser = await prisma.clientUser.create({
    data: {
      clientId,
      name: String(name).trim(),
      email: String(email).toLowerCase().trim(),
      phone: phone || null,
      password: hashedPassword,
      portalAccess: {
        create: {},
      },
    },
    include: {
      client: { select: { id: true, name: true } },
      portalAccess: true,
    },
  });

  return successResponse(res, 201, "Client user created successfully", {
    id: clientUser.id,
    clientId: clientUser.clientId,
    clientName: clientUser.client.name,
    name: clientUser.name,
    email: clientUser.email,
    phone: clientUser.phone,
    portalAccess: clientUser.portalAccess,
  });
});

export const adminListClientUsers = asyncHandler(async (req: AuthRequest, res: Response) => {
  const clientUsers = await prisma.clientUser.findMany({
    include: {
      client: { select: { id: true, name: true } },
      portalAccess: true,
      _count: { select: { notifications: true, activityLogs: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return successResponse(res, 200, "Client users fetched", clientUsers);
});

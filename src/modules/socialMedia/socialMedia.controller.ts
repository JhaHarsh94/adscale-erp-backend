import prisma from "../../config/prisma";
import { AppError } from "../../utils/AppError";
import { asyncHandler } from "../../utils/asyncHandler";
import { successResponse } from "../../utils/response";

const projectInclude = { select: { id: true, name: true, client: { select: { id: true, name: true } } } };

/* ─── Dashboard ─── */
export const getSocialDashboard = asyncHandler(async (req, res) => {
  const [totalAccounts, totalPosts, statusCounts, recentPosts] = await Promise.all([
    prisma.socialAccount.count(),
    prisma.socialPost.count(),
    prisma.socialPost.groupBy({ by: ["status"], _count: true }),
    prisma.socialPost.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        account: { select: { id: true, platform: true, accountName: true, project: projectInclude } },
      },
    }),
  ]);

  return successResponse(res, 200, "Social media dashboard", {
    totalAccounts,
    totalPosts,
    postStatusBreakdown: statusCounts,
    recentPosts,
  });
});

/* ─── Accounts ─── */
export const listAccounts = asyncHandler(async (req, res) => {
  const accounts = await prisma.socialAccount.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      project: { select: { id: true, name: true, client: { select: { id: true, name: true } } } },
      _count: { select: { posts: true } },
    },
  });
  return successResponse(res, 200, "Social accounts", accounts);
});

export const getAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const account = await prisma.socialAccount.findUnique({
    where: { id },
    include: {
      project: projectInclude,
      posts: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!account) throw new AppError("Account not found", 404);
  return successResponse(res, 200, "Social account", account);
});

export const createAccount = asyncHandler(async (req, res) => {
  const { projectId, platform, accountName, accountId, followers } = req.body;
  if (!projectId || !platform || !accountName) throw new AppError("projectId, platform, and accountName are required", 400);

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) throw new AppError("Project not found", 404);

  const account = await prisma.socialAccount.create({
    data: {
      projectId,
      platform,
      accountName,
      accountId: accountId || null,
      followers: followers !== undefined ? Number(followers) : null,
    },
    include: { project: projectInclude, _count: { select: { posts: true } } },
  });
  return successResponse(res, 201, "Social account created", account);
});

export const updateAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { accountName, accountId, followers, isActive } = req.body;
  const data: Record<string, unknown> = {};
  if (accountName !== undefined) data.accountName = accountName;
  if (accountId !== undefined) data.accountId = accountId;
  if (followers !== undefined) data.followers = Number(followers);
  if (isActive !== undefined) data.isActive = Boolean(isActive);
  const account = await prisma.socialAccount.update({ where: { id }, data });
  return successResponse(res, 200, "Account updated", account);
});

export const deleteAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.socialAccount.delete({ where: { id } });
  return successResponse(res, 200, "Account deleted");
});

/* ─── Posts ─── */
export const listPosts = asyncHandler(async (req, res) => {
  const { accountId, status } = req.query;
  const where: Record<string, unknown> = {};
  if (accountId) where.accountId = String(accountId);
  if (status) where.status = String(status);
  const posts = await prisma.socialPost.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      account: { select: { id: true, platform: true, accountName: true, project: projectInclude } },
      calendar: { select: { id: true, month: true, year: true } },
    },
  });
  return successResponse(res, 200, "Posts", posts);
});

export const createPost = asyncHandler(async (req, res) => {
  const { accountId, calendarId, content, mediaUrl, caption, scheduledAt, status, notes } = req.body;
  if (!accountId || !content) throw new AppError("accountId and content are required", 400);

  const account = await prisma.socialAccount.findUnique({ where: { id: accountId } });
  if (!account) throw new AppError("Account not found", 404);

  const post = await prisma.socialPost.create({
    data: {
      accountId,
      calendarId: calendarId || null,
      content,
      mediaUrl: mediaUrl || null,
      caption: caption || null,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
      status: status || "DRAFT",
      notes: notes || null,
    },
    include: { account: { select: { id: true, platform: true, accountName: true } } },
  });
  return successResponse(res, 201, "Post created", post);
});

export const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content, mediaUrl, caption, scheduledAt, status, notes, likes, comments, shares, impressions, clicks } = req.body;
  const data: Record<string, unknown> = {};
  if (content !== undefined) data.content = content;
  if (mediaUrl !== undefined) data.mediaUrl = mediaUrl;
  if (caption !== undefined) data.caption = caption;
  if (scheduledAt !== undefined) data.scheduledAt = scheduledAt ? new Date(scheduledAt) : null;
  if (status !== undefined) data.status = status;
  if (notes !== undefined) data.notes = notes;
  if (likes !== undefined) data.likes = Number(likes);
  if (comments !== undefined) data.comments = Number(comments);
  if (shares !== undefined) data.shares = Number(shares);
  if (impressions !== undefined) data.impressions = Number(impressions);
  if (clicks !== undefined) data.clicks = Number(clicks);
  if (status === "PUBLISHED" && !scheduledAt) data.publishedAt = new Date();
  const post = await prisma.socialPost.update({ where: { id }, data });
  return successResponse(res, 200, "Post updated", post);
});

export const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.socialPost.delete({ where: { id } });
  return successResponse(res, 200, "Post deleted");
});

/* ─── Calendar ─── */
export const listCalendars = asyncHandler(async (req, res) => {
  const { projectId } = req.query;
  const where: Record<string, unknown> = {};
  if (projectId) where.projectId = String(projectId);
  const calendars = await prisma.socialCalendar.findMany({
    where,
    orderBy: [{ year: "desc" }, { month: "desc" }],
    include: {
      project: projectInclude,
      _count: { select: { posts: true } },
    },
  });
  return successResponse(res, 200, "Calendars", calendars);
});

export const getCalendar = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const calendar = await prisma.socialCalendar.findUnique({
    where: { id },
    include: {
      project: projectInclude,
      posts: {
        orderBy: { scheduledAt: "asc" },
        include: { account: { select: { id: true, platform: true, accountName: true } } },
      },
    },
  });
  if (!calendar) throw new AppError("Calendar not found", 404);
  return successResponse(res, 200, "Calendar", calendar);
});

export const createCalendar = asyncHandler(async (req, res) => {
  const { projectId, month, year, notes } = req.body;
  if (!projectId || month === undefined || !year) throw new AppError("projectId, month, and year are required", 400);
  const calendar = await prisma.socialCalendar.create({
    data: { projectId, month: Number(month), year: Number(year), notes: notes || null },
    include: { project: projectInclude },
  });
  return successResponse(res, 201, "Calendar created", calendar);
});

export const updateCalendar = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { notes } = req.body;
  const calendar = await prisma.socialCalendar.update({ where: { id }, data: { notes } });
  return successResponse(res, 200, "Calendar updated", calendar);
});

export const deleteCalendar = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.socialCalendar.delete({ where: { id } });
  return successResponse(res, 200, "Calendar deleted");
});

/* ─── Projects without accounts ─── */
export const getProjectsWithoutSocial = asyncHandler(async (req, res) => {
  const projects = await prisma.project.findMany({
    where: { socialAccounts: { none: {} } },
    select: { id: true, name: true },
    orderBy: { createdAt: "desc" },
  });
  return successResponse(res, 200, "Projects without social accounts", projects);
});

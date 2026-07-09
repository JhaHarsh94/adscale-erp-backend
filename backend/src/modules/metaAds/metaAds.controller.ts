import prisma from "../../config/prisma";
import { AppError } from "../../utils/AppError";
import { asyncHandler } from "../../utils/asyncHandler";
import { successResponse } from "../../utils/response";
import type { AuthRequest } from "../../middlewares/auth.middleware";

const projectInclude = { select: { id: true, name: true, client: { select: { id: true, name: true } } } };

export const getDashboard = asyncHandler(async (req, res) => {
  const [totalAccounts, totalCampaigns, metrics] = await Promise.all([
    prisma.metaAdsAccount.count(),
    prisma.metaAdsCampaign.count(),
    prisma.metaAdsMetric.aggregate({
      _sum: { impressions: true, clicks: true, cost: true, conversions: true, conversionValue: true, reach: true },
    }),
  ]);
  const recentCampaigns = await prisma.metaAdsCampaign.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { account: { select: { id: true, accountName: true, project: projectInclude } } },
  });
  return successResponse(res, 200, "Meta Ads dashboard", {
    totalAccounts, totalCampaigns,
    totalImpressions: metrics._sum.impressions || 0,
    totalReach: metrics._sum.reach || 0,
    totalClicks: metrics._sum.clicks || 0,
    totalCost: metrics._sum.cost || 0,
    totalConversions: metrics._sum.conversions || 0,
    totalConversionValue: metrics._sum.conversionValue || 0,
    recentCampaigns,
  });
});

export const listAccounts = asyncHandler(async (req, res) => {
  const accounts = await prisma.metaAdsAccount.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      project: projectInclude,
      _count: { select: { campaigns: true, adSets: true } },
    },
  });
  return successResponse(res, 200, "Meta Ads accounts", accounts);
});

export const getAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const account = await prisma.metaAdsAccount.findUnique({
    where: { id },
    include: {
      project: projectInclude,
      campaigns: {
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { adSets: true, metrics: true } } },
      },
    },
  });
  if (!account) throw new AppError("Account not found", 404);
  return successResponse(res, 200, "Meta Ads account", account);
});

export const createAccount = asyncHandler(async (req, res) => {
  const { projectId, accountName, accountId, currency, timezone } = req.body;
  if (!projectId || !accountName) throw new AppError("projectId and accountName are required", 400);
  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) throw new AppError("Project not found", 404);
  const account = await prisma.metaAdsAccount.create({
    data: { projectId, accountName, accountId: accountId || null, currency: currency || "INR", timezone: timezone || "Asia/Kolkata" },
    include: { project: projectInclude, _count: { select: { campaigns: true, adSets: true } } },
  });
  return successResponse(res, 201, "Account created", account);
});

export const updateAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data: Record<string, unknown> = {};
  ["accountName", "accountId", "currency", "timezone", "isActive"].forEach((k) => {
    if (req.body[k] !== undefined) data[k] = req.body[k];
  });
  const account = await prisma.metaAdsAccount.update({ where: { id }, data });
  return successResponse(res, 200, "Account updated", account);
});

export const deleteAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.metaAdsAccount.delete({ where: { id } });
  return successResponse(res, 200, "Account deleted");
});

export const listCampaigns = asyncHandler(async (req, res) => {
  const { accountId, status } = req.query;
  const where: Record<string, unknown> = {};
  if (accountId) where.accountId = String(accountId);
  if (status) where.status = String(status);
  const campaigns = await prisma.metaAdsCampaign.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      account: { select: { id: true, accountName: true, project: projectInclude } },
      _count: { select: { adSets: true, metrics: true } },
    },
  });
  return successResponse(res, 200, "Campaigns", campaigns);
});

export const getCampaign = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const campaign = await prisma.metaAdsCampaign.findUnique({
    where: { id },
    include: {
      account: { select: { id: true, accountName: true, project: projectInclude } },
      adSets: { orderBy: { createdAt: "desc" }, include: { _count: { select: { ads: true } } } },
      metrics: { orderBy: { date: "desc" }, take: 30 },
    },
  });
  if (!campaign) throw new AppError("Campaign not found", 404);
  return successResponse(res, 200, "Campaign", campaign);
});

export const createCampaign = asyncHandler(async (req, res) => {
  const { accountId, campaignName, campaignId, status, dailyBudget, lifetimeBudget, startDate, endDate } = req.body;
  if (!accountId || !campaignName) throw new AppError("accountId and campaignName are required", 400);
  const campaign = await prisma.metaAdsCampaign.create({
    data: {
      accountId, campaignName, campaignId: campaignId || null,
      status: status || "ACTIVE", dailyBudget: dailyBudget ? Number(dailyBudget) : null,
      lifetimeBudget: lifetimeBudget ? Number(lifetimeBudget) : null,
      startDate: startDate ? new Date(startDate) : null, endDate: endDate ? new Date(endDate) : null,
    },
    include: { account: { select: { id: true, accountName: true } } },
  });
  return successResponse(res, 201, "Campaign created", campaign);
});

export const updateCampaign = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data: Record<string, unknown> = {};
  ["campaignName", "campaignId", "status", "dailyBudget", "lifetimeBudget", "startDate", "endDate"].forEach((k) => {
    if (req.body[k] !== undefined) {
      if (k === "dailyBudget" || k === "lifetimeBudget") data[k] = Number(req.body[k]);
      else if (k === "startDate" || k === "endDate") data[k] = req.body[k] ? new Date(req.body[k]) : null;
      else data[k] = req.body[k];
    }
  });
  const campaign = await prisma.metaAdsCampaign.update({ where: { id }, data });
  return successResponse(res, 200, "Campaign updated", campaign);
});

export const deleteCampaign = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.metaAdsCampaign.delete({ where: { id } });
  return successResponse(res, 200, "Campaign deleted");
});

export const listAdSets = asyncHandler(async (req, res) => {
  const { campaignId, accountId, status } = req.query;
  const where: Record<string, unknown> = {};
  if (campaignId) where.campaignId = String(campaignId);
  if (accountId) where.accountId = String(accountId);
  if (status) where.status = String(status);
  const adSets = await prisma.metaAdsAdSet.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      campaign: { select: { id: true, campaignName: true } },
      account: { select: { id: true, accountName: true } },
      _count: { select: { ads: true } },
    },
  });
  return successResponse(res, 200, "Ad sets", adSets);
});

export const getAdSet = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const adSet = await prisma.metaAdsAdSet.findUnique({
    where: { id },
    include: {
      campaign: { select: { id: true, campaignName: true } },
      account: { select: { id: true, accountName: true } },
      ads: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!adSet) throw new AppError("Ad set not found", 404);
  return successResponse(res, 200, "Ad set", adSet);
});

export const createAdSet = asyncHandler(async (req, res) => {
  const { campaignId, accountId, adSetName, adSetId, status, dailyBudget, lifetimeBudget, startDate, endDate } = req.body;
  if (!campaignId || !accountId || !adSetName) throw new AppError("campaignId, accountId, and adSetName are required", 400);
  const adSet = await prisma.metaAdsAdSet.create({
    data: {
      campaignId, accountId, adSetName, adSetId: adSetId || null,
      status: status || "ACTIVE", dailyBudget: dailyBudget ? Number(dailyBudget) : null,
      lifetimeBudget: lifetimeBudget ? Number(lifetimeBudget) : null,
      startDate: startDate ? new Date(startDate) : null, endDate: endDate ? new Date(endDate) : null,
    },
    include: { campaign: { select: { id: true, campaignName: true } }, account: { select: { id: true, accountName: true } } },
  });
  return successResponse(res, 201, "Ad set created", adSet);
});

export const updateAdSet = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data: Record<string, unknown> = {};
  ["adSetName", "adSetId", "status", "dailyBudget", "lifetimeBudget", "startDate", "endDate"].forEach((k) => {
    if (req.body[k] !== undefined) {
      if (k === "dailyBudget" || k === "lifetimeBudget") data[k] = Number(req.body[k]);
      else if (k === "startDate" || k === "endDate") data[k] = req.body[k] ? new Date(req.body[k]) : null;
      else data[k] = req.body[k];
    }
  });
  const adSet = await prisma.metaAdsAdSet.update({ where: { id }, data });
  return successResponse(res, 200, "Ad set updated", adSet);
});

export const deleteAdSet = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.metaAdsAdSet.delete({ where: { id } });
  return successResponse(res, 200, "Ad set deleted");
});

export const listAds = asyncHandler(async (req, res) => {
  const { adSetId, status } = req.query;
  const where: Record<string, unknown> = {};
  if (adSetId) where.adSetId = String(adSetId);
  if (status) where.status = String(status);
  const ads = await prisma.metaAdsAd.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { adSet: { select: { id: true, adSetName: true } } },
  });
  return successResponse(res, 200, "Ads", ads);
});

export const getAd = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const ad = await prisma.metaAdsAd.findUnique({
    where: { id },
    include: { adSet: { select: { id: true, adSetName: true, campaign: { select: { id: true, campaignName: true } } } } },
  });
  if (!ad) throw new AppError("Ad not found", 404);
  return successResponse(res, 200, "Ad", ad);
});

export const createAd = asyncHandler(async (req, res) => {
  const { adSetId, adName, adId, status, creativeType, previewUrl } = req.body;
  if (!adSetId || !adName) throw new AppError("adSetId and adName are required", 400);
  const ad = await prisma.metaAdsAd.create({
    data: { adSetId, adName, adId: adId || null, status: status || "ACTIVE", creativeType: creativeType || null, previewUrl: previewUrl || null },
    include: { adSet: { select: { id: true, adSetName: true } } },
  });
  return successResponse(res, 201, "Ad created", ad);
});

export const updateAd = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data: Record<string, unknown> = {};
  ["adName", "adId", "status", "creativeType", "previewUrl"].forEach((k) => {
    if (req.body[k] !== undefined) data[k] = req.body[k];
  });
  const ad = await prisma.metaAdsAd.update({ where: { id }, data });
  return successResponse(res, 200, "Ad updated", ad);
});

export const deleteAd = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.metaAdsAd.delete({ where: { id } });
  return successResponse(res, 200, "Ad deleted");
});

export const listMetrics = asyncHandler(async (req, res) => {
  const { campaignId, adSetId, adId, from, to } = req.query;
  const where: Record<string, unknown> = {};
  if (campaignId) where.campaignId = String(campaignId);
  if (adSetId) where.adSetId = String(adSetId);
  if (adId) where.adId = String(adId);
  if (from || to) {
    where.date = {};
    if (from) (where.date as Record<string, unknown>).gte = new Date(String(from));
    if (to) (where.date as Record<string, unknown>).lte = new Date(String(to));
  }
  const metrics = await prisma.metaAdsMetric.findMany({
    where,
    orderBy: { date: "desc" },
  });
  return successResponse(res, 200, "Metrics", metrics);
});

export const upsertMetric = asyncHandler(async (req, res) => {
  const { campaignId, adSetId, adId, date, impressions, reach, frequency, clicks, cost, conversions, conversionValue } = req.body;
  if (!campaignId || !date) throw new AppError("campaignId and date are required", 400);
  const uniqueWhere: Record<string, unknown> = { campaignId, date: new Date(date) };
  if (adSetId) uniqueWhere.adSetId = adSetId;
  if (adId) uniqueWhere.adId = adId;
  if (!adSetId) uniqueWhere.adSetId = null;
  if (!adId) uniqueWhere.adId = null;
  const metric = await prisma.metaAdsMetric.upsert({
    where: { campaignId_adSetId_adId_date: uniqueWhere as any },
    update: {
      impressions: impressions !== undefined ? Number(impressions) : undefined,
      reach: reach !== undefined ? Number(reach) : undefined,
      frequency: frequency !== undefined ? Number(frequency) : undefined,
      clicks: clicks !== undefined ? Number(clicks) : undefined,
      cost: cost !== undefined ? Number(cost) : undefined,
      conversions: conversions !== undefined ? Number(conversions) : undefined,
      conversionValue: conversionValue !== undefined ? Number(conversionValue) : undefined,
    },
    create: {
      campaignId, adSetId: adSetId || null, adId: adId || null, date: new Date(date),
      impressions: Number(impressions || 0), reach: Number(reach || 0),
      frequency: frequency !== undefined ? Number(frequency) : null,
      clicks: Number(clicks || 0), cost: Number(cost || 0),
      conversions: Number(conversions || 0),
      conversionValue: conversionValue !== undefined ? Number(conversionValue) : null,
    },
  });
  return successResponse(res, 200, "Metric saved", metric);
});

export const deleteMetric = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.metaAdsMetric.delete({ where: { id } });
  return successResponse(res, 200, "Metric deleted");
});

export const listReports = asyncHandler(async (req, res) => {
  const { accountId } = req.query;
  const where: Record<string, unknown> = {};
  if (accountId) where.accountId = String(accountId);
  const reports = await prisma.metaAdsReport.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { account: { select: { id: true, accountName: true } } },
  });
  return successResponse(res, 200, "Reports", reports);
});

export const createReport = asyncHandler(async (req, res) => {
  const { accountId, title, periodStart, periodEnd, summary } = req.body;
  if (!accountId || !title) throw new AppError("accountId and title are required", 400);
  const account = await prisma.metaAdsAccount.findUnique({ where: { id: accountId } });
  if (!account) throw new AppError("Account not found", 404);
  const whereClause: Record<string, unknown> = { campaign: { accountId } };
  if (periodStart) whereClause.date = { ...(whereClause.date as object || {}), gte: new Date(periodStart) };
  if (periodEnd) whereClause.date = { ...(whereClause.date as object || {}), lte: new Date(periodEnd) };
  const [agg] = await Promise.all([
    prisma.metaAdsMetric.aggregate({
      where: whereClause as any,
      _sum: { impressions: true, reach: true, clicks: true, cost: true, conversions: true, conversionValue: true },
    }),
  ]);
  const report = await prisma.metaAdsReport.create({
    data: {
      accountId, title,
      periodStart: periodStart ? new Date(periodStart) : null,
      periodEnd: periodEnd ? new Date(periodEnd) : null,
      totalImpressions: agg._sum.impressions || 0,
      totalReach: agg._sum.reach || 0,
      totalClicks: agg._sum.clicks || 0,
      totalCost: agg._sum.cost || 0,
      totalConversions: agg._sum.conversions || 0,
      totalConversionValue: agg._sum.conversionValue || null,
      summary: summary || null,
    },
  });
  return successResponse(res, 201, "Report created", report);
});

export const deleteReport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.metaAdsReport.delete({ where: { id } });
  return successResponse(res, 200, "Report deleted");
});

export const getProjectsWithoutAds = asyncHandler(async (req, res) => {
  const projects = await prisma.project.findMany({
    where: { metaAdsAccounts: { none: {} } },
    select: { id: true, name: true },
    orderBy: { createdAt: "desc" },
  });
  return successResponse(res, 200, "Projects without Meta Ads accounts", projects);
});
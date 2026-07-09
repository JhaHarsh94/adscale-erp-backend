export interface MetaAdsDashboard {
  totalAccounts: number;
  totalCampaigns: number;
  totalImpressions: number;
  totalReach: number;
  totalClicks: number;
  totalCost: number;
  totalConversions: number;
  totalConversionValue: number;
  recentCampaigns: MetaAdsCampaign[];
}

export interface MetaAdsAccount {
  id: string;
  projectId: string;
  accountName: string;
  accountId: string | null;
  currency: string;
  timezone: string;
  isActive: boolean;
  project: { id: string; name: string; client: { id: string; name: string } };
  _count: { campaigns: number; adSets: number };
  campaigns?: MetaAdsCampaign[];
  createdAt: string;
}

export interface MetaAdsCampaign {
  id: string;
  accountId: string;
  campaignName: string;
  campaignId: string | null;
  status: string;
  dailyBudget: number | null;
  lifetimeBudget: number | null;
  startDate: string | null;
  endDate: string | null;
  account?: { id: string; accountName: string; project?: { id: string; name: string; client: { id: string; name: string } } };
  _count?: { adSets: number; metrics: number };
  adSets?: MetaAdsAdSet[];
  metrics?: MetaAdsMetric[];
  createdAt: string;
}

export interface MetaAdsAdSet {
  id: string;
  campaignId: string;
  accountId: string;
  adSetName: string;
  adSetId: string | null;
  status: string;
  dailyBudget: number | null;
  lifetimeBudget: number | null;
  startDate: string | null;
  endDate: string | null;
  campaign?: { id: string; campaignName: string };
  account?: { id: string; accountName: string };
  _count?: { ads: number };
  ads?: MetaAdsAd[];
  createdAt: string;
}

export interface MetaAdsAd {
  id: string;
  adSetId: string;
  adName: string;
  adId: string | null;
  status: string;
  creativeType: string | null;
  previewUrl: string | null;
  adSet?: { id: string; adSetName: string; campaign?: { id: string; campaignName: string } };
  createdAt: string;
}

export interface MetaAdsMetric {
  id: string;
  campaignId: string;
  adSetId: string | null;
  adId: string | null;
  date: string;
  impressions: number;
  reach: number;
  frequency: number | null;
  clicks: number;
  cost: number;
  conversions: number;
  conversionValue: number | null;
  ctr: number | null;
  cpc: number | null;
  cpm: number | null;
  cpa: number | null;
  roas: number | null;
}

export interface MetaAdsReport {
  id: string;
  accountId: string;
  title: string;
  periodStart: string | null;
  periodEnd: string | null;
  totalImpressions: number;
  totalReach: number;
  totalClicks: number;
  totalCost: number;
  totalConversions: number;
  totalConversionValue: number | null;
  summary: string | null;
  account?: { id: string; accountName: string };
  createdAt: string;
}
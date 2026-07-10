-- CreateTable: meta_ads_accounts
CREATE TABLE "meta_ads_accounts" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "accountId" TEXT,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "timezone" TEXT NOT NULL DEFAULT 'Asia/Kolkata',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meta_ads_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable: meta_ads_campaigns
CREATE TABLE "meta_ads_campaigns" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "campaignName" TEXT NOT NULL,
    "campaignId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "dailyBudget" DOUBLE PRECISION,
    "lifetimeBudget" DOUBLE PRECISION,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meta_ads_campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable: meta_ads_adsets
CREATE TABLE "meta_ads_adsets" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "adSetName" TEXT NOT NULL,
    "adSetId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "dailyBudget" DOUBLE PRECISION,
    "lifetimeBudget" DOUBLE PRECISION,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meta_ads_adsets_pkey" PRIMARY KEY ("id")
);

-- CreateTable: meta_ads_ads
CREATE TABLE "meta_ads_ads" (
    "id" TEXT NOT NULL,
    "adSetId" TEXT NOT NULL,
    "adName" TEXT NOT NULL,
    "adId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "creativeType" TEXT,
    "previewUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meta_ads_ads_pkey" PRIMARY KEY ("id")
);

-- CreateTable: meta_ads_metrics
CREATE TABLE "meta_ads_metrics" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "adSetId" TEXT,
    "adId" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "impressions" INTEGER NOT NULL DEFAULT 0,
    "reach" INTEGER NOT NULL DEFAULT 0,
    "frequency" DOUBLE PRECISION,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "cost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "conversions" INTEGER NOT NULL DEFAULT 0,
    "conversionValue" DOUBLE PRECISION DEFAULT 0,
    "ctr" DOUBLE PRECISION,
    "cpc" DOUBLE PRECISION,
    "cpm" DOUBLE PRECISION,
    "cpa" DOUBLE PRECISION,
    "roas" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "meta_ads_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable: meta_ads_reports
CREATE TABLE "meta_ads_reports" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "periodStart" TIMESTAMP(3),
    "periodEnd" TIMESTAMP(3),
    "totalImpressions" INTEGER NOT NULL DEFAULT 0,
    "totalReach" INTEGER NOT NULL DEFAULT 0,
    "totalClicks" INTEGER NOT NULL DEFAULT 0,
    "totalCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalConversions" INTEGER NOT NULL DEFAULT 0,
    "totalConversionValue" DOUBLE PRECISION,
    "summary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meta_ads_reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "meta_ads_accounts_projectId_accountId_key" ON "meta_ads_accounts"("projectId", "accountId");
CREATE INDEX "meta_ads_campaigns_accountId_idx" ON "meta_ads_campaigns"("accountId");
CREATE INDEX "meta_ads_adsets_campaignId_idx" ON "meta_ads_adsets"("campaignId");
CREATE INDEX "meta_ads_adsets_accountId_idx" ON "meta_ads_adsets"("accountId");
CREATE INDEX "meta_ads_ads_adSetId_idx" ON "meta_ads_ads"("adSetId");
CREATE UNIQUE INDEX "meta_ads_metrics_campaignId_adSetId_adId_date_key" ON "meta_ads_metrics"("campaignId", "adSetId", "adId", "date");
CREATE INDEX "meta_ads_metrics_campaignId_date_idx" ON "meta_ads_metrics"("campaignId", "date");
CREATE INDEX "meta_ads_reports_accountId_idx" ON "meta_ads_reports"("accountId");

-- AddForeignKey: meta_ads_accounts -> projects
ALTER TABLE "meta_ads_accounts" ADD CONSTRAINT "meta_ads_accounts_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: meta_ads_campaigns -> meta_ads_accounts
ALTER TABLE "meta_ads_campaigns" ADD CONSTRAINT "meta_ads_campaigns_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "meta_ads_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: meta_ads_adsets -> meta_ads_campaigns
ALTER TABLE "meta_ads_adsets" ADD CONSTRAINT "meta_ads_adsets_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "meta_ads_campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: meta_ads_adsets -> meta_ads_accounts
ALTER TABLE "meta_ads_adsets" ADD CONSTRAINT "meta_ads_adsets_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "meta_ads_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: meta_ads_ads -> meta_ads_adsets
ALTER TABLE "meta_ads_ads" ADD CONSTRAINT "meta_ads_ads_adSetId_fkey" FOREIGN KEY ("adSetId") REFERENCES "meta_ads_adsets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: meta_ads_metrics -> meta_ads_campaigns
ALTER TABLE "meta_ads_metrics" ADD CONSTRAINT "meta_ads_metrics_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "meta_ads_campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: meta_ads_metrics -> meta_ads_adsets
ALTER TABLE "meta_ads_metrics" ADD CONSTRAINT "meta_ads_metrics_adSetId_fkey" FOREIGN KEY ("adSetId") REFERENCES "meta_ads_adsets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: meta_ads_metrics -> meta_ads_ads
ALTER TABLE "meta_ads_metrics" ADD CONSTRAINT "meta_ads_metrics_adId_fkey" FOREIGN KEY ("adId") REFERENCES "meta_ads_ads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: meta_ads_reports -> meta_ads_accounts
ALTER TABLE "meta_ads_reports" ADD CONSTRAINT "meta_ads_reports_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "meta_ads_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;


import { PrismaClient } from "@prisma/client";
import Debug from 'debug';
import moment from 'moment-timezone';
import { defineEventHandler, getQuery } from 'h3'; // ใช้สำหรับ Nuxt 3

const prisma = new PrismaClient();
const debug = Debug('api:transaction:getAll');

interface AggregateResult {
  _count: number;
  _sum: {
    amount: number | null;
  };
}

interface QueryParams {
  filter?: string;
  startDate?: string;
  endDate?: string;
}

interface ResponseData {
  total: {
    countAll: AggregateResult;
    countQR: AggregateResult;
    countCash: AggregateResult;
  };
  washer: {
    countAll: AggregateResult;
    countQR: AggregateResult;
    countCash: AggregateResult;
  };
  dryer: {
    countAll: AggregateResult;
    countQR: AggregateResult;
    countCash: AggregateResult;
  };
}

async function getAggregateData(whereClause: any): Promise<AggregateResult> {
  return await prisma.transactions.aggregate({
    where: whereClause,
    _count: true,
    _sum: {
      amount: true,
    },
  });
}

export default defineEventHandler(async (event): Promise<ResponseData> => {
  const query = getQuery(event) as QueryParams;
  const filter = query.filter;
  const sDate = query.startDate;
  const eDate = query.endDate;

  let startDate: string | undefined, endDate: string | undefined;
  if (sDate && eDate) {
    startDate = moment.tz(String(sDate), 'Asia/Bangkok').toISOString();
    endDate = moment.tz(String(eDate), 'Asia/Bangkok').toISOString();
  }

  const baseWhere = {
    createdAt: {
      gte: startDate,
      lt: endDate,
    },
  };

  const branchWhere = filter !== "ALL" ? {
    device: {
      branch: { branchName: String(filter) },
    },
  } : {};

  const whereClause = { ...baseWhere, ...branchWhere };

  const [
    totalCount,
    totalCountQR,
    totalCountCash,
    washerCount,
    dryerCount,
    washerQRCount,
    washerCashCount,
    dryerQRCount,
    DryerCashCount
  ] = await Promise.all([
    getAggregateData(whereClause),
    getAggregateData({ ...whereClause, paymentBy: "qrcode" }),
    getAggregateData({ ...whereClause, paymentBy: "cash" }),
    getAggregateData({ ...whereClause, device: { type: "Washer" } }),
    getAggregateData({ ...whereClause, device: { type: "Dryer" } }),
    getAggregateData({ ...whereClause, device: { type: "Washer" }, paymentBy: "qrcode" }),
    getAggregateData({ ...whereClause, device: { type: "Washer" }, paymentBy: "cash" }),
    getAggregateData({ ...whereClause, device: { type: "Dryer" }, paymentBy: "qrcode" }),
    getAggregateData({ ...whereClause, device: { type: "Dryer" }, paymentBy: "cash" }),
  ]);

  return {
    total: {
      countAll: totalCount,
      countQR: totalCountQR,
      countCash: totalCountCash,
    },
    washer: {
      countAll: washerCount,
      countQR: washerQRCount,
      countCash: washerCashCount,
    },
    dryer: {
      countAll: dryerCount,
      countQR: dryerQRCount,
      countCash: DryerCashCount,
    },
  };
});
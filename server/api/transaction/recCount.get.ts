import { PrismaClient } from "@prisma/client";
import { defineEventHandler, getQuery } from 'h3'; // ใช้สำหรับ Nuxt 3

const prisma = new PrismaClient();

interface QueryParams {
  filter?: string;
  startDate?: string;
  endDate?: string;
}

interface ResponseData {
  total: {
    countAll: { count: number; sum: number };
    countQR: { count: number; sum: number };
    countCash: { count: number; sum: number };
  };
  washer: {
    countAll: { count: number; sum: number };
    countQR: { count: number; sum: number };
    countCash: { count: number; sum: number };
  };
  dryer: {
    countAll: { count: number; sum: number };
    countQR: { count: number; sum: number };
    countCash: { count: number; sum: number };
  };
}

export default defineEventHandler(async (event): Promise<ResponseData> => {
  const query = getQuery(event) as QueryParams;
  const filter = query.filter;
  const sDate = query.startDate;
  const eDate = query.endDate;

  if (!sDate || !eDate) {
    throw new Error("startDate and endDate are required");
  }

  const startDate = new Date(sDate).toISOString();
  const endDate = new Date(eDate).toISOString();

  const baseWhere = {
    createdAt: {
      gte: startDate,
      lt: endDate,
    },
    ...(filter !== "ALL" && {
      device: {
        branch: {
          branchName: String(filter),
        },
      },
    }),
  };

  const [
    totalCount,
    totalCountQR,
    totalCountCash,
    washerCount,
    dryerCount,
    washerQRCount,
    washerCashCount,
    dryerQRCount,
    DryerCashCount,
  ] = await Promise.all([
    prisma.transactions.aggregate({
      where: baseWhere,
      _count: true,
      _sum: {
        amount: true,
      },
    }),
    prisma.transactions.aggregate({
      where: {
        ...baseWhere,
        paymentBy: "qrcode",
      },
      _count: true,
      _sum: {
        amount: true,
      },
    }),
    prisma.transactions.aggregate({
      where: {
        ...baseWhere,
        paymentBy: "cash",
      },
      _count: true,
      _sum: {
        amount: true,
      },
    }),
    prisma.transactions.aggregate({
      where: {
        ...baseWhere,
        device: {
          type: "Washer",
        },
      },
      _count: true,
      _sum: {
        amount: true,
      },
    }),
    prisma.transactions.aggregate({
      where: {
        ...baseWhere,
        device: {
          type: "Dryer",
        },
      },
      _count: true,
      _sum: {
        amount: true,
      },
    }),
    prisma.transactions.aggregate({
      where: {
        ...baseWhere,
        device: {
          type: "Washer",
        },
        paymentBy: "qrcode",
      },
      _count: true,
      _sum: {
        amount: true,
      },
    }),
    prisma.transactions.aggregate({
      where: {
        ...baseWhere,
        device: {
          type: "Washer",
        },
        paymentBy: "cash",
      },
      _count: true,
      _sum: {
        amount: true,
      },
    }),
    prisma.transactions.aggregate({
      where: {
        ...baseWhere,
        device: {
          type: "Dryer",
        },
        paymentBy: "qrcode",
      },
      _count: true,
      _sum: {
        amount: true,
      },
    }),
    prisma.transactions.aggregate({
      where: {
        ...baseWhere,
        device: {
          type: "Dryer",
        },
        paymentBy: "cash",
      },
      _count: true,
      _sum: {
        amount: true,
      },
    }),
  ]);

  return {
    total: {
      countAll: { count: totalCount._count, sum: totalCount._sum.amount || 0 },
      countQR: { count: totalCountQR._count, sum: totalCountQR._sum.amount || 0 },
      countCash: { count: totalCountCash._count, sum: totalCountCash._sum.amount || 0 },
    },
    washer: {
      countAll: { count: washerCount._count, sum: washerCount._sum.amount || 0 },
      countQR: { count: washerQRCount._count, sum: washerQRCount._sum.amount || 0 },
      countCash: { count: washerCashCount._count, sum: washerCashCount._sum.amount || 0 },
    },
    dryer: {
      countAll: { count: dryerCount._count, sum: dryerCount._sum.amount || 0 },
      countQR: { count: dryerQRCount._count, sum: dryerQRCount._sum.amount || 0 },
      countCash: { count: DryerCashCount._count, sum: DryerCashCount._sum.amount || 0 },
    },
  };
});
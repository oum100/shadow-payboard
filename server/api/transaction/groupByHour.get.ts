import { PrismaClient } from "@prisma/client";
import Debug from "debug";
import moment from "moment-timezone";

const prisma = new PrismaClient();
const debug = Debug("api:transaction:getAll");

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  // Fetch and log filter and date query parameters
  const filter = query.filter;
  const sDate = query.startDate;
  const eDate = query.endDate;

  console.log("-------RecordsCount-------");
  console.log("->Filter:", filter);
  console.log("->sDate::", sDate);
  console.log("->eDate::", eDate);

  // Initialize start and end dates using the query parameters
  let startDate: string | undefined;
  let endDate: string | undefined;

  if (sDate && eDate) {
    startDate = moment.tz(String(sDate), "Asia/Bangkok").toISOString();
    endDate = moment.tz(String(eDate), "Asia/Bangkok").toISOString();

    console.log("->startDate->ISO: ", startDate);
    console.log("->endDate->ISO: ", endDate);
  }

  if (filter === "ALL") {
    // Fetch transactions and group by hour using Prisma
    const trans = await prisma.transactions.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      select: {
        // device: {
        //   select: {
        //     branch: true,
        //     type: true,
        //   },
        // },
        deviceUuid: true,
        paymentBy: true,
        amount: true,
        createdAt: true,
      },
      orderBy: { createdAt: "asc" },
    });

    // 2) สร้างชุด uuid แล้วไปดึง Devices + Branchs มาเอง
    const uuids = Array.from(
      new Set(trans.map((t) => t.deviceUuid).filter(Boolean))
    ) as string[];

    const devices = uuids.length
      ? await prisma.devices.findMany({
          where: { uuid: { in: uuids } },
          select: {
            uuid: true,
            type: true, // schema คุณเป็น String; ถ้าอยากใช้ enum ให้ปรับ schema ภายหลัง
            branch: {
              select: { branchName: true },
            },
          },
        })
      : [];

    const deviceMap = new Map<string, (typeof devices)[number]>();
    devices.forEach((d) => deviceMap.set(d.uuid, d));

    const zeros = () => Array(24).fill(0);
    // Initialize arrays to hold hourly amounts for different machine types
    const hourlyTotal = zeros();
    const hourlyTotalByQR = zeros();
    const hourlyTotalByCash = zeros();

    const hourlyWasher = zeros();
    const hourlyWasherByQR = zeros();
    const hourlyWasherByCash = zeros();

    const hourlyDryer = zeros();
    const hourlyDryerByQR = zeros();
    const hourlyDryerByCash = zeros();

    const hourlyTotalTrans = zeros();
    const hourlyTotalTransByQR = zeros();
    const hourlyTotalTransByCash = zeros();

    const hourlyWasherTrans = zeros();
    const hourlyWasherTransByQR = zeros();
    const hourlyWasherTransByCash = zeros();

    const hourlyDryerTrans = zeros();
    const hourlyDryerTransByQR = zeros();
    const hourlyDryerTransByCash = zeros();

    const hourlyBranch = Array(10).fill(0);
    hourlyBranch[0] = zeros();
    hourlyBranch[1] = zeros();

    const hourlyBranch1 = zeros();
    const hourlyBranch2 = zeros();

    // Iterate over the transactions to group amounts by hour
    trans.forEach((item) => {
      // Lookup device info using deviceUuid
      const device = item.deviceUuid
        ? deviceMap.get(item.deviceUuid)
        : undefined;

      // An hour must be in correct timezone.
      const hour = moment(item.createdAt).tz("Asia/Bangkok").hour();
      hourlyTotal[hour] += item.amount ?? 0;
      if (item.paymentBy === "qrcode") {
      }
      if (item.paymentBy === "cash") {
      }

      // Further classify by machine type
      if (device?.type === "Washer") {
        hourlyWasher[hour] += item.amount ?? 0;
        if (item.paymentBy === "qrcode") {
        }
        if (item.paymentBy === "cash") {
        }
      } else if (device?.type === "Dryer") {
        hourlyDryer[hour] += item.amount ?? 0;
        if (item.paymentBy === "qrcode") {
        }
        if (item.paymentBy === "cash") {
        }
      }

      // Futher classify by paymentBy
      if (item.paymentBy === "qrcode") {
      }

      // Further classify by branch
      if (device?.branch?.branchName === "SkyView") {
        hourlyBranch1[hour] += item.amount ?? 0;
      } else if (device?.branch?.branchName === "RGH-18") {
        hourlyBranch2[hour] += item.amount ?? 0;
      }
    });

    // Prepare the result object with the grouped data
    const result = {
      revenue: [
        {
          name: "Total",
          type: "line",
          data: hourlyTotal,
        },
        {
          name: "Washer",
          type: "column",
          data: hourlyWasher,
        },
        {
          name: "Dryer",
          type: "column",
          data: hourlyDryer,
        },
        {
          name: "SkyView",
          type: "area",
          data: hourlyBranch1,
        },
        {
          name: "RGH-18",
          type: "area",
          data: hourlyBranch2,
        },
      ],
      transaction: [],
    };

    return {
      data: result,
      // data: trans,
    };
  } else {
    const trans = await prisma.transactions.findMany({
      select: {
        device: {
          select: {
            type: true,
          },
        },
        amount: true,
        createdAt: true,
      },
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
        device: {
          branch: { branchName: String(filter) },
        },
      },
    });

    // console.log("Result Trans: ", trans);

    // Initialize arrays to hold hourly amounts for different machine types
    const hourlyTotal = Array(24).fill(0);
    const hourlyWasher = Array(24).fill(0);
    const hourlyDryer = Array(24).fill(0);

    // Iterate over the transactions to group amounts by hour
    trans.forEach((item) => {
      const hour = moment(item.createdAt).tz("Asia/Bangkok").hour();
      hourlyTotal[hour] += item.amount ?? 0;

      // Further classify by machine type
      if (item.device && item.device.type === "Washer") {
        hourlyWasher[hour] += item.amount ?? 0;
      } else if (item.device && item.device.type === "Dryer") {
        hourlyDryer[hour] += item.amount ?? 0;
      }
    });

    // Prepare the result object with the grouped data
    const result = {
      revenue: [
        {
          name: "Total",
          type: "area",
          data: hourlyTotal,
        },
        {
          name: "Washer",
          type: "column",
          data: hourlyWasher,
        },
        {
          name: "Dryer",
          type: "column",
          data: hourlyDryer,
        },
      ],
      transaction: [],
    };

    return {
      data: result,
    };
  }
});

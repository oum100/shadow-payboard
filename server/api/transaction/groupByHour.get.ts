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
      select: {
        device: {
          select: {
            branch: true,
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
      },
    });

    // console.log("Result Trans: ", trans);

    // Initialize arrays to hold hourly amounts for different machine types
    const hourlyAmounts = Array(24).fill(0);
    const hourlyWasher = Array(24).fill(0);
    const hourlyDryer = Array(24).fill(0);

    const hourlyBranch = Array(10).fill(0);
    hourlyBranch[0] = Array(24).fill(0);
    hourlyBranch[1] = Array(24).fill(0);

    const hourlyBranch1 = Array(24).fill(0);
    const hourlyBranch2 = Array(24).fill(0);

    // Iterate over the transactions to group amounts by hour
    trans.forEach((item) => {
      // const hourString = new Date(item.createdAt).toLocaleString("en-US", { timeZone: "Asia/Bangkok", hour: "2-digit", hour12: false });
      // const hour = parseInt(hourString, 10);

      const hour = moment(item.createdAt).tz("Asia/Bangkok").hour();
      // const hour = new Date(item.createdAt).getHours();  //Original

    //   console.log("And hour", hour);

      hourlyAmounts[hour] += item.amount ?? 0;

      // Further classify by machine type
      if (item.device.type === "Washer") {
        hourlyWasher[hour] += item.amount ?? 0;
      } else if (item.device.type === "Dryer") {
        hourlyDryer[hour] += item.amount ?? 0;
      }

      if (item.device.branch?.branchName === "SkyView") {
        hourlyBranch1[hour] += item.amount ?? 0;
      } else if (item.device.branch?.branchName === "RGH-18") {
        hourlyBranch2[hour] += item.amount ?? 0;
      }
    });

    // Prepare the result object with the grouped data
    const result = [
      {
        name: "Total",
        type: "line",
        data: hourlyAmounts,
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
    ];

    return {
      data: result,
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
    const hourlyAmounts = Array(24).fill(0);
    const hourlyWasher = Array(24).fill(0);
    const hourlyDryer = Array(24).fill(0);

    // Iterate over the transactions to group amounts by hour
    trans.forEach((item) => {
  
      const hour = moment(item.createdAt).tz("Asia/Bangkok").hour();
      hourlyAmounts[hour] += item.amount ?? 0;

      // Further classify by machine type
      if (item.device.type === "Washer") {
        hourlyWasher[hour] += item.amount ?? 0;
      } else if (item.device.type === "Dryer") {
        hourlyDryer[hour] += item.amount ?? 0;
      }
    });

    // Prepare the result object with the grouped data
    const result = [
      {
        name: "Total",
        data: hourlyAmounts,
      },
      {
        name: "Washer",
        data: hourlyWasher,
      },
      {
        name: "Dryer",
        data: hourlyDryer,
      },
    ];

    return {
      data: result,
    };
  }
});

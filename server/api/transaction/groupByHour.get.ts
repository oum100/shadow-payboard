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
        paymentBy:true,
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

    console.log("Result Trans: ", trans);

    // Initialize arrays to hold hourly amounts for different machine types
    const hourlyTotal = Array(24).fill(0);
    const hourlyTotalByQR = Array(24).fill(0);
    const hourlyTotalByCash = Array(24).fill(0);

    const hourlyWasher = Array(24).fill(0);
    const hourlyWasherByQR = Array(24).fill(0);
    const hourlyWasherByCash = Array(24).fill(0);

    const hourlyDryer = Array(24).fill(0);
    const hourlyDryerByQR = Array(24).fill(0);
    const hourlyDryerByCash = Array(24).fill(0);

    const hourlyTotalTrans = Array(24).fill(0)
    const hourlyTotalTransByQR = Array(24).fill(0)
    const hourlyTotalTransByCash = Array(24).fill(0)

    const hourlyWasherTrans = Array(24).fill(0)
    const hourlyWasherTransByQR = Array(24).fill(0)
    const hourlyWasherTransByCash = Array(24).fill(0)

    const hourlyDryerTrans = Array(24).fill(0);
    const hourlyDryerTransByQR = Array(24).fill(0)
    const hourlyDryerTransByCash = Array(24).fill(0)

    const hourlyBranch = Array(10).fill(0);
    hourlyBranch[0] = Array(24).fill(0);
    hourlyBranch[1] = Array(24).fill(0);

    const hourlyBranch1 = Array(24).fill(0);
    const hourlyBranch2 = Array(24).fill(0);



    // Iterate over the transactions to group amounts by hour
    trans.forEach((item) => {
      // An hour must be in correct timezone.
      const hour = moment(item.createdAt).tz("Asia/Bangkok").hour();
      hourlyTotal[hour] += item.amount ?? 0;
      if (item.paymentBy === "qrcode") {}
      if (item.paymentBy === "cash") {} 

      // Further classify by machine type
      if (item.device.type === "Washer") {
        hourlyWasher[hour] += item.amount ?? 0;
        if (item.paymentBy === "qrcode") {}
        if (item.paymentBy === "cash") {}
      } else if (item.device.type === "Dryer") {
        hourlyDryer[hour] += item.amount ?? 0;
        if (item.paymentBy === "qrcode") {}
        if (item.paymentBy === "cash") {}
      }

      // Futher classify by paymentBy
      if(item.paymentBy === 'qrcode'){
        
      }


      // Further classify by branch
      if (item.device.branch?.branchName === "SkyView") {
        hourlyBranch1[hour] += item.amount ?? 0;
      } else if (item.device.branch?.branchName === "RGH-18") {
        hourlyBranch2[hour] += item.amount ?? 0;
      }
    });

    // Prepare the result object with the grouped data
    const result = {
        revenue:[
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
        transaction:[]
    }

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
      if (item.device.type === "Washer") {
        hourlyWasher[hour] += item.amount ?? 0;
      } else if (item.device.type === "Dryer") {
        hourlyDryer[hour] += item.amount ?? 0;
      }
    });

    // Prepare the result object with the grouped data
    const result = {
        revenue:[
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
            }
          ],
        transaction:[]
    }

    return {
      data: result,
    };
  }
});

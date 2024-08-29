import { PrismaClient } from "@prisma/client";
import Debug from "debug";
import moment from "moment-timezone";

const prisma = new PrismaClient();
const debug = Debug("api:transaction:getAll");

const startDate = "2024-08-27T17:00:00.000Z";
const endDate = "2024-08-28T16:59:59.000Z";

const machineType = "Washer"; //Washer  Dryer

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  // console.log(event.node.req.filter)
  const filter = query.filter;
  const sDate = query.startDate;
  const eDate = query.endDate;

  // console.log("query:",query)
  console.log("-------RecordsCount-------");
  console.log("->Filter:",filter)
  console.log("->sDate::", sDate);
  console.log("->eDate::", eDate);

  let startDate, endDate;
  if (query.startDate && query.endDate) {
    startDate = moment.tz(String(sDate), "Asia/Bangkok").toISOString();
    endDate = moment.tz(String(eDate), "Asia/Bangkok").toISOString();

    console.log("->starDate->ISO: ", startDate);
    console.log("->endDate->ISO: ", endDate);
  }

  if (filter === "ALL") {
    // Fetch transactions and group by hour using Prisma
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
      },
      
    });

    console.log("Result Trans: ", trans);
    const hourlyAmounts = Array(24).fill(0);
    const hourlyWasher = Array(24).fill(0);
    const hourlyDryer = Array(24).fill(0);

    trans.forEach((item) => {
      const hour = new Date(item.createdAt).getHours();
      hourlyAmounts[hour] += item.amount ?? 0;
    });

    trans.forEach((item) => {
      const hour = new Date(item.createdAt).getHours();
      if (item.device.type === "Washer") {
        hourlyWasher[hour] += item.amount ?? 0;
      } else if (item.device.type === "Dryer") {
        hourlyDryer[hour] += item.amount ?? 0;
      }
    });
    
    const obj = [
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
      ]
    
    
    return obj
  }
})

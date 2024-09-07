import { PrismaClient } from "@prisma/client";
import Debug from "debug";
import moment from "moment-timezone";

const prisma = new PrismaClient();
const debug = Debug("api:transaction:getAll");

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  // Fetch and log filter and date query parameters
  const year = Number(query.year);
  const sMonth = Number(query.startMonth);
  const eMonth = Number(query.endMonth);

  console.log("-------RecordsCount-------");
  console.log("->Filter:", year);
  console.log("->sDate::", sMonth);
  console.log("->eDate::", eMonth);

  const result = aggregateEachDayForMonth(year);

  return result;
});

async function aggregateEachDayForMonth(
  year: number
) {
  // Fetch all transactions for the specified month
  const trans = await prisma.transactions.findMany({
    where: {
      createdAt: {
        gte: new Date(year,0,1), // Start of the year
        lt: new Date(year+1,0,1), // Start of the next year
      },
    },
    select: {
      createdAt: true,
      amount: true,
      paymentBy:true,
      device:{
        select:{
            deviceName:true,
            type:true,
            branch:{
                select:{
                    branchCode: true,
                    branchName:true
                } 
            }
        },
           
    }
    },
  });

  console.log("Raw Trans",trans)

  // Aggregate transactions by Month
  const aggregatedByMonth = trans.reduce((acc, transaction) => {
    const date = moment
      .tz(transaction.createdAt, "Asia/Bangkok")
      .format("YYYY-MM-DD");

    const month = moment
    .tz(transaction.createdAt, "Asia/Bangkok")
    .format("YYYY-MM");

    if (!acc[month]) {
      acc[month] = {
        epochTime: new Date(date).getTime() / 1000,
        revenue:{
            total:0,
            washer:0,
            dryer:0,
            qr:0,
            cash:0
        },
        transaction:{
            total:0,
            washer:0,
            dryer:0,
            qr:0,
            cash:0
        }
      }; // Initialize if not already present
    }
    acc[month].revenue.total += transaction.amount; // Sum the amounts
    acc[month].transaction.total++
    switch(transaction.device.type){
        case 'Washer':
            acc[month].revenue.washer += transaction.amount;
            acc[month].transaction.washer++
            break
        case 'Dryer':
            acc[month].revenue.dryer += transaction.amount;
            acc[month].transaction.dryer++
            break
    }

    switch(transaction.paymentBy){
        case 'qrcode':
            acc[month].revenue.qr += transaction.amount;
            acc[month].transaction.qr++
            break
        case 'cash':
            acc[month].revenue.cash += transaction.amount;
            acc[month].transaction.cash++
            break
    }

    return acc;
  }, {} as Record<string, { 
    epochTime: number
    revenue:{
        total: number,
        washer:number,
        dryer: number,
        qr:number,
        cash: number
    }, 
    transaction:{
        total: number,
        washer:number,
        dryer: number,
        qr:number,
        cash: number
    }
 }>);

  // Convert the aggregated object to an array for easier use
  const aggregatedArray = Object.entries(aggregatedByMonth).map(
    ([date, {epochTime,revenue,transaction}]) => ({
      date,
      epochTime,
      revenue: revenue,
      transaction:transaction
    })
  );

  console.log(aggregatedArray);
  return aggregatedArray;
}

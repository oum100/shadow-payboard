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

  const result = aggregateEachDayForMonth(year, sMonth, eMonth);

  return result;
});

async function aggregateEachDayForMonth(
  year: number,
  sMonth: number,
  eMonth: number
) {
  // Fetch all transactions for the specified month
  const trans = await prisma.transactions.findMany({
    where: {
      createdAt: {
        gte: new Date(year, sMonth - 1, 1), // Start of the month
        lt: new Date(year, eMonth-1, 1), // Start of the next month
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
  // console.log("Raw Trans",trans)

  const wholeMonth = {
    // date:moment.tz(new Date(year, month - 1, day, 0,0,0), "Asia/Bangkok").format("YYYY-MM-DD"),
    startMonth:sMonth,
    endMonth:eMonth,
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
  }


  // Aggregate transactions by day
  const aggregatedByDay = trans.reduce((acc, transaction) => {
    // const date = transaction.createdAt.toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
    const date = moment
      .tz(transaction.createdAt, "Asia/Bangkok")
      .format("YYYY-MM-DD");

    if (!acc[date]) {
      acc[date] = {
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
    acc[date].revenue.total += transaction.amount; // Sum the amounts
    acc[date].transaction.total++
    switch(transaction.device.type){
        case 'Washer':
            acc[date].revenue.washer += transaction.amount;
            acc[date].transaction.washer++
            break
        case 'Dryer':
            acc[date].revenue.dryer += transaction.amount;
            acc[date].transaction.dryer++
            break
    }

    switch(transaction.paymentBy){
        case 'qrcode':
            acc[date].revenue.qr += transaction.amount;
            acc[date].transaction.qr++
            break
        case 'cash':
            acc[date].revenue.cash += transaction.amount;
            acc[date].transaction.cash++
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
  const aggregatedArray = Object.entries(aggregatedByDay).map(
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

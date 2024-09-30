import { PrismaClient } from "@prisma/client";
import Debug from "debug";
import moment from "moment-timezone";

const prisma = new PrismaClient();
const debug = Debug("api:transaction:getAll");

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  // Fetch and log filter and date query parameters
  const shopName = query.shopName
  const sDateTime = query.startDateTime
  const eDateTime = query.endDateTime

  // const year = Number(query.year);
  // const month = Number(query.month);
  // const day = Number(query.day);

  // console.log("-------RecordsCount-------");
  console.log("->Filter:", shopName);
  console.log("->sDate::", sDateTime);
  console.log("->eDate::", eDateTime);


  const result = aggregateForEachHourInDay(shopName,sDateTime,eDateTime)
  // const result = aggregateForEachHourInDay(year, month,day)

  return result;
});

async function aggregateForEachHourInDay(
  shop: any,
  sDate: any,
  eDate: any
) {

  let startDate: string | undefined;
  let endDate: string | undefined;

  if (sDate && eDate) {
    startDate = moment.tz(String(sDate), "Asia/Bangkok").toISOString();
    endDate = moment.tz(String(eDate), "Asia/Bangkok").toISOString();

    console.log("->startDate->ISO: ", startDate);
    console.log("->endDate->ISO: ", endDate);
  }

  // Fetch all transactions for the specified month
  const trans = await prisma.transactions.findMany({
    where: {
      createdAt: {
        gte: startDate, // Start of the month
        lt: endDate, // Start of the next month
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
            merchant:{
              select:{
                name:true,
                merchantCode:true
              }
            },
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
  const wholeRange = {
    // date:moment.tz(new Date(year, month - 1, day, 0,0,0), "Asia/Bangkok").format("YYYY-MM-DD"),
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
  const aggregatedByHour = trans.reduce((acc, transaction) => {
    // const date = transaction.createdAt.toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
    const date = moment
      .tz(transaction.createdAt, "Asia/Bangkok")
      .format("YYYY-MM-DD");

    const hour =  moment
    .tz(transaction.createdAt, "Asia/Bangkok")
    .format("HH");

    if (!acc[hour]) {
      acc[hour] = {
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

    wholeRange.revenue.total += transaction.amount
    wholeRange.transaction.total++

    acc[hour].revenue.total += transaction.amount; // Sum the amounts
    acc[hour].transaction.total++

    switch(transaction.device.type){
        case 'Washer':
            wholeRange.revenue.washer += transaction.amount
            wholeRange.transaction.washer++
            acc[hour].revenue.washer += transaction.amount;
            acc[hour].transaction.washer++
            break
        case 'Dryer':
            wholeRange.revenue.dryer += transaction.amount
            wholeRange.transaction.dryer++
            acc[hour].revenue.dryer += transaction.amount;
            acc[hour].transaction.dryer++
            break
    }

    switch(transaction.paymentBy){
        case 'qrcode':
            wholeRange.revenue.qr += transaction.amount
            wholeRange.transaction.qr++
            acc[hour].revenue.qr += transaction.amount;
            acc[hour].transaction.qr++
            break
        case 'cash':
            wholeRange.revenue.cash += transaction.amount
            wholeRange.transaction.cash++
            acc[hour].revenue.cash += transaction.amount;
            acc[hour].transaction.cash++
            break
    }

    switch(transaction.device.branch?.branchName){
      
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
  const aggregatedArray = Object.entries(aggregatedByHour).map(
    ([hour, {epochTime,revenue,transaction}]) => (
      {
      hour,
      epochTime,
      revenue: revenue,
      transaction:transaction
      }
    )
  );

  console.log(aggregatedArray)
  return {
    wholeRange:wholeRange,
    hourly:aggregatedArray
  }
}

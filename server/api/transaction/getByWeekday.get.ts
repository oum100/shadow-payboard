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


  const result = aggregateForWeekday(shopName,sDateTime,eDateTime)
  // const result = aggregateForEachHourInDay(year, month,day)

  return result;
});


async function aggregateForWeekday(
    shop: any,
    sDate: any,
    eDate: any
  ) {
  
    let startDate: string | undefined;
    let endDate: string | undefined;
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
                      branchName: true
                  } 
              }
          },
            
      }
      },
    })


}
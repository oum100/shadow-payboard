import { PrismaClient } from "@prisma/client";
import Debug from "debug";
import moment from "moment-timezone";
import { sassTrue } from "sass";

const prisma = new PrismaClient();
const debug = Debug("api:transaction:getAll");

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  // Fetch and log filter and date query parameters
  const filter = query.filter;
  //   const branch = query.branch
  //   const paymentBy = query.paymentBy
  //   const machineType = query.machine
  const startBy = query.startBy;
  const endBy = query.endBy;

  console.log("-------RecordsCount-------");
  console.log("->Filter:", filter);
  console.log("->sDate::", startBy);
  console.log("->eDate::", endBy);

//   if (!filter) {
//     return {
//       status: 400,
//       message: "Request failed. missing information.",
//     };
//   }

  // Initialize start and end dates using the query parameters
  let startDate: string | undefined;
  let endDate: string | undefined;

  //Spedify month and year
  //   const stDate = new Date(year, month - 1, 1); // Month is 0-based
  //   const edDate = new Date(year, month, 0, 23, 59, 59, 999); // Last day of the month

  //Specify Year
  // const stDate = new Date(year, 0, 1); // Month is 0-based
  // const edDate = new Date(year, 12, 0, 23, 59, 59, 999); // Last day of the month

  // const today = moment(thisDay)
// console.log("show today",today)
// const start = today.clone().startOf('day').format("YYYY-MM-DD HH:mm")
// console.log("startOf: ",start )
// const end = today.clone().endOf('day').format("YYYY-MM-DD HH:mm")
// console.log("end Of: ",end)

// const thisDay = moment.tz(String(startBy), "Asia/Bangkok").toISOString()
// const today = moment(thisDay)
// console.log("thisDay: ",today)
// console.log("Today: ",today)


  if (filter === "daily") {
    const thisDay = moment.tz(String(startBy), "Asia/Bangkok").toISOString()
    const today = moment(thisDay)
    startDate = today.clone().startOf('day').toISOString()
    endDate = today.clone().endOf('day').toISOString()

  } else if (filter === "weekly") {
    const thisDay = moment.tz(String(startBy), "Asia/Bangkok").toISOString()
    const today = moment(thisDay)
    startDate = today.clone().startOf('week').toISOString()
    endDate = today.clone().endOf('week').toISOString()

  } else if (filter === "monthly") {
    const thisDay = moment.tz(String(new Date(Date.now())), "Asia/Bangkok").toISOString()
    const today = moment(thisDay)
    startDate = today.clone().startOf('month').toISOString()
    endDate = today.clone().endOf('month').toISOString()

  } else if (filter === "yearly") {
    const thisDay = moment.tz(String(new Date(Date.now())), "Asia/Bangkok").toISOString()
    const today = moment(thisDay)
    startDate = today.clone().startOf('year').toISOString()
    endDate = today.clone().endOf('year').toISOString()

  }else{
    console.log("default")
    if(startBy && !endBy){
        const thisDay = moment.tz(String(startBy), "Asia/Bangkok").toISOString()
        const today = moment(thisDay)
        startDate = today.clone().startOf('day').toISOString()
        endDate = today.clone().endOf('day').toISOString()
    }else if(!startBy && endBy){
        const thisDay = moment.tz(String(endBy), "Asia/Bangkok").toISOString()
        const today = moment(thisDay)
        startDate = today.clone().startOf('day').toISOString()
        endDate = today.clone().endOf('day').toISOString()     
    }else if (startBy && endBy) {
        startDate = moment.tz(String(startBy), "Asia/Bangkok").toISOString()
        endDate = moment.tz(String(endBy), "Asia/Bangkok").toISOString()
    }
  }

  console.log("->startDate->ISO: ", startDate);
  console.log("->endDate->ISO: ", endDate);


  /* //This working but comment for try other
  const result = await prisma.transactions.findMany({
    select: {
      device: {
        select: {
          branch: true,
          type: true,
        },
      },
      paymentBy: true,
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


  console.log("Result Trans: ", result);
  return result;
  */


  return "ok"

});

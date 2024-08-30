import { PrismaClient } from "@prisma/client";
import Debug from "debug";
import moment from "moment-timezone";

const prisma = new PrismaClient();
const debug = Debug("api:transaction:getAll");

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  let branch: any | undefined;
  let machine: any | undefined;

  branch = query.branch;
  machine = query.machine;
  const sDate = query.startDate;
  const eDate = query.endDate;

  console.log("-------getByAggregate-------");
  console.log("->Branch:", branch);
  console.log("->Machine:", machine);
  console.log("->startDate::", sDate);
  console.log("->endDate::", eDate);

  // Initialize start and end dates using the query parameters
  let startDate: string | undefined;
  let endDate: string | undefined;

  let year:number | undefined
  let month:number | undefined

  //--------------------  Filter month in year 
  year = Number(query.year)
  month = Number(query.month)
  console.log("this year",year)
  console.log("this month",month)

//Spedify month and year
  const stDate = new Date(year, month - 1, 1); // Month is 0-based
  const edDate = new Date(year, month, 0, 23, 59, 59, 999); // Last day of the month

//Specify Year
// const stDate = new Date(year, 0, 1); // Month is 0-based
// const edDate = new Date(year, 12, 0, 23, 59, 59, 999); // Last day of the month

  console.log("stDate", stDate)
  console.log("edDate", edDate)
  //-----------------------------------------------------------------------



  //Today is default if not specific datetime.
  if (sDate && eDate) {
    startDate = moment.tz(String(sDate), "Asia/Bangkok").toISOString();
    endDate = moment.tz(String(eDate), "Asia/Bangkok").toISOString();
  }

  // const result = await prisma.transactions.aggregate({
  //     _count:{
  //         deviceUuid:true
  //     },
  //     _sum:{
  //         amount:true
  //     }
  // })

  let result = null;

  //No branch no machine
  if (!branch && !machine) {
    result = await prisma.transactions.groupBy({
      by: ["paymentBy"],
      _count: {
        deviceUuid: true,
      },
      _sum: {
        amount: true,
      },
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        // device:{
        //     branch: { branchName: String(branch) },
        //     type: String(machine)
        // }
      },
    });
  }

  //Have branch no machine
  if (branch && !machine) { 
    result = await prisma.transactions.groupBy({
      by: ["paymentBy"],
      _count: {
        deviceUuid: true,
      },
      _sum: {amount:true},
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        device: {
          branch: { branchName: String(branch) },
          // type: String(machine)
        },
      },
    });
  }

// No branch but have machine
  if (!branch && machine) {
    result = await prisma.transactions.groupBy({
      by: ["paymentBy"],
      _count: {
        deviceUuid: true,
      },
      _sum: {amount:true},
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        device: {
          // branch: { branchName: String(branch) },
          type: String(machine),
        },
      },
    });
  }


// Branch and Machine
  if (branch && machine) {
    result = await prisma.transactions.groupBy({
      by: ["paymentBy"],
      _count: {
        deviceUuid: true,
      },
      _sum: {amount:true},
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        device: {
          branch: { branchName: String(branch) },
          type: String(machine),
        },
      },
    });
  }



  // const result = await prisma.transactions.count({

  // })

  return {
    startDate: startDate,
    endDate: endDate,
    data: result,
  };
});

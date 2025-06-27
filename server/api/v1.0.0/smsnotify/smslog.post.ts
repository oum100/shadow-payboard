import { PrismaClient } from "@prisma/client";
import Debug from "debug";
import { errorMessages } from "vue/compiler-sfc";
import { validateNewPartner } from "~/models/cyberpay";
import { SmsLog } from "~/types/smslog";

const prisma = new PrismaClient();
const debug = Debug("api:smsnotify:smslog");

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  console.log("Body: ", body);

  const shop = body.shop;
  const sender = body.sender;
  const timeRaw = body.time;
  const msgRaw = body.msg;

  // ดึงข้อความจริงจาก msg
  const messageMatch = msgRaw.match(/"message":"([^"]+)"/);
  const message = messageMatch ? messageMatch[1] : null;

  console.log("msg: ", message);

  //   const text = data.message;

  //   if (typeof text !== "string") {
  //     throw createError({
  //       statusCode: 400,
  //       statusMessage: "Invalid or missing 'message' field in request body",
  //     });
  //   }

  // ดึง deposit to
  //   const depositToMatch = text.match(/Deposit to (\w+)/);
  //   const amountMatch = text.match(/amount\s([\d,.]+)\sBaht/);
  //   const balanceMatch = text.match(/balance\s([\d,.]+)\sBaht/);

  //   // แปลงค่าที่ได้
  //   const depositTo = depositToMatch ? depositToMatch[1] : null;
  //   const amount = amountMatch
  //     ? parseFloat(amountMatch[1].replace(/,/g, ""))
  //     : null;

  //   const balance = balanceMatch
  //     ? parseFloat(balanceMatch[1].replace(/,/g, ""))
  //     : null;

  //   console.log("Deposit To:", depositTo); // xxx122856x
  //   console.log("Amount:", amount); // 2.01
  //   console.log("Balance:", balance); // 38826.03

  //   data.bankAccount = depositTo as string;
  //   data.amount = amount;
  //   data.balance = balance;

  //   // แปลงเป็น Date โดยใช้ moment หรือ JavaScript ล้วน

  //   const parsedTime = new Date(
  //     data.time.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1")
  //   ); // → "2025-06-27T21:09:00.000Z"

  //   if (isNaN(parsedTime.getTime())) {
  //     throw new Error("Invalid time format");
  //   }

  return {
    status: true,
    message: "success",
  };
});

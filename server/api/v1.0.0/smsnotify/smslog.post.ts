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

  if (!message) {
    throw createError({
      statusCode: 400,
      statusMessage: "Message content not found in 'msg'",
    });
  }

  // ดึงข้อมูลจาก message
  const depositToMatch = message.match(/Deposit to (\w+)/);
  const amountMatch = message.match(/amount\s([\d,.]+)\sBaht/);
  const balanceMatch = message.match(/balance\s([\d,.]+)\sBaht/);

  const depositTo = depositToMatch?.[1] || null;
  const amount = amountMatch
    ? parseFloat(amountMatch[1].replace(/,/g, ""))
    : null;
  const balance = balanceMatch
    ? parseFloat(balanceMatch[1].replace(/,/g, ""))
    : null;

  // แปลงเวลา
  const rawTime = timeRaw.replace(" ", ""); // remove special space
  const now = new Date(); // ใช้ปีปัจจุบัน
  const dateTimeString = `${now.getFullYear()}/${rawTime}`; // เช่น "2025/06/28, 12:40 AM"
  const parsedTime = new Date(dateTimeString);

  if (isNaN(parsedTime.getTime())) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid time format",
    });
  }

  // Save ลง Prisma
  const saveData = await prisma.smslog.create({
    data: {
      shop,
      sender,
      time: parsedTime,
      message,
      bankAccount: depositTo,
      amount,
      balance,
    },
  });

  return {
    status: true,
    message: "success",
    data: saveData,
  };
});

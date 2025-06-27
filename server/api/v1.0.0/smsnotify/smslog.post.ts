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
      message: "Message content not found in 'msg'",
    });
  }

  // ดึงข้อมูลจาก message
  const depositToMatch = message.match(/Deposit to (\w+)/);
  const amountMatch = message.match(/amount\s([\d,.]+)\sBaht/);
  const balanceMatch = message.match(/balance\s([\d,.]+)\sBaht/);
  const timeMatch = message.match(
    /\((\d{1,2}\/\d{1,2}\/\d{2}),\s*(\d{1,2}:\d{2})hr\)/
  );

  const [_, day, month, yearShort, hour, minute] = timeMatch;

  // แปลงปีให้อยู่ในรูปแบบ 4 หลัก
  const fullYear = parseInt(yearShort) + 2000;

  // สร้าง Date object (ตามเวลาท้องถิ่น)
  const dateObj = new Date(
    fullYear,
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hour),
    parseInt(minute)
  );

  if (isNaN(dateObj.getTime())) {
    throw createError({
      statusCode: 400,
      message: "ไม่สามารถแปลงเวลาได้",
    });
  }

  const depositTo = depositToMatch?.[1] || null;
  const amount = amountMatch
    ? parseFloat(amountMatch[1].replace(/,/g, ""))
    : null;
  const balance = balanceMatch
    ? parseFloat(balanceMatch[1].replace(/,/g, ""))
    : null;

  // Save ลง Prisma
  try {
    // const saveData = await prisma.smslog.create({
    //   data: {
    //     shop,
    //     sender,
    //     time: dateObj,
    //     message,
    //     bankAccount: depositTo,
    //     amount,
    //     balance,
    //   },
    // });

    return {
      status: true,
      message: "success",
    //   data: saveData,
    };
  } catch (err) {
    console.log("Error 2");
  }
});

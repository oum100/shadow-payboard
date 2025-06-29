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
  const msgRaw = body.msg;

  // แปลงและ ดึงข้อความจริงจาก msg
  const messageMatch = msgRaw.match(/"message":"([^"]+)"/);
  const message = messageMatch ? messageMatch[1] : null;

  // console.log("Shop: ", shop);
  // console.log("Sender: ", sender);
  // console.log("msg: ", message);

  // ดึงข้อมูลจาก message
  const depositToMatch = message.match(/Deposit to (\w+)/);
  const depositTo = depositToMatch?.[1] || null;

  const amountMatch = message.match(/amount\s([\d,.]+)\sBaht/);
  const amount = amountMatch
    ? parseFloat(amountMatch[1].replace(/,/g, ""))
    : null;

  const balanceMatch = message.match(/balance\s([\d,.]+)\sBaht/);
  const balance = balanceMatch
    ? parseFloat(balanceMatch[1].replace(/,/g, ""))
    : null;

  const timeMatch = message.match(
    /\((\d{1,2}\/\d{1,2}\/\d{2}),\s*(\d{1,2}:\d{2})hr\)/
  );

  const datePart = timeMatch[1]; // "29/6/25"
  const timePart = timeMatch[2]; // "21:55"

  // แยกส่วนของวัน เวลา
  const [day, month, yearShort] = datePart.split("/").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);

  // แปลงปี ค.ศ. (25 → 2025)
  const fullYear = yearShort + 2000;

  // สร้าง Date object (เวลาท้องถิ่น)
  const dateObj = new Date(fullYear, month - 1, day, hour, minute);

  if (isNaN(dateObj.getTime())) {
    throw createError({
      statusCode: 400,
      message: "Invalid date format",
    });
  }

  // console.log("Date object:", dateObj);
  // console.log("ISO string:", dateObj.toISOString());

  // Save ลง Prisma
  try {
    const saveData = await prisma.smslog.create({
      data: {
        shop,
        sender,
        time: dateObj,
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
  } catch (err) {
    console.log("Error3");
  }
});

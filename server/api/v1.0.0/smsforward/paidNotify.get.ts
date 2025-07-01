import { errorMessages } from "vue/compiler-sfc";
import { PrismaClient } from "@prisma/client";
import Debug from "debug";

const prisma = new PrismaClient();
const debug = Debug("api:cyberpay:painNotify");

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  console.log(query);

  const normalizedMsg = query.payload as string;
  // Normalize: ลบ narrow no-break space (U+202F) และช่องว่างแปลกๆ
  const msgRaw = normalizedMsg.replace(/[\u202f\u00a0]/g, " ");
  console.log("msgRaw: ", msgRaw);
  console.log("\n")

  //Looking for shop
  const shopRaw = msgRaw.match(/Shop:([^\s]+)/)
//   console.log("shopRaw: ",shopRaw)
  const shop = shopRaw?.[1] || null
  console.log("Shop: ",shop)

  //Looking for sender
  const msgFromRaw = msgRaw.match(/Sender:([^\s]+(?:\s[^\s]+)?)/)
//   console.log("msgFromRaw", msgFromRaw)
    const msgFrom = msgFromRaw?.[1] || null
  console.log("msgFrom: ",msgFrom)

  //Find Channel
  const channelRaw =  msgRaw.match(/บาท\s([^\s]+)\s*จาก/)
//   console.log("sendFromRaw: ",sendFromRaw)
  const channel = channelRaw?.[1] || null
//   console.log("\n")
  console.log("Channel: ",channel)

//   const msgFrom = msgRaw.includes("เข้าร้านค้า");
//   console.log("msgFrom: ", msgFrom);

  // ✅ 1. ดึง income
  const incomeMatch = msgRaw.match(/คุณได้รับเงิน\s([\d,.]+)\sบาท/);
  const income = incomeMatch
    ? parseFloat(incomeMatch[1].replace(/,/g, ""))
    : null;
  console.log("Income: ", income);  

  //✅ 2. ดูว่าส่งเข้า MaeManee (เข้าร้านค้า) or เข้าบัญชีปกติ  (ผ่านรายการพร้อมเพย์)

  if (channel === 'เข้าร้านค้า') {
    //Message from แม่มณี
    // console.log("This channel is Maemanee")
    const senderRaw = msgRaw.match(/จาก\s(\w+)/);
    const sender = senderRaw?.[1].trim() || null;
    console.log("Sender: ", sender);

  } else if(channel === 'ผ่านรายการพร้อมเพย์') {
    // console.log("This channel is SCB Promptpay")

    const senderRaw = msgRaw.match(/จาก\s+(.*?)\s+เข้าบัญชี/);
    // console.log("senderRaw: ", senderRaw)
    const sender = senderRaw?.[1].trim() || null;
    console.log("Sender: ", sender);    
  }

  //✅ 3. ลองจับ pattern วันเวลาแบบไทย
  const dateMatch = normalizedMsg.match(
    /เมื่อ\s+(\d{1,2})\s+(ม\.ค\.|ก\.พ\.|มี\.ค\.|เม\.ย\.|พ\.ค\.|มิ\.ย\.|ก\.ค\.|ส\.ค\.|ก\.ย\.|ต\.ค\.|พ\.ย\.|ธ\.ค\.)\s+(\d{4})\s*-\s*(\d{1,2}:\d{2})/
  );

  if (!dateMatch) {
    console.log("❌ ไม่ match");
  } 

  let dateRaw: string | null = null;
  let parsedDate: Date | null = null;

  if (dateMatch) {
    const [_, day, thaiMonth, yearThai, time] = dateMatch;

    const monthMap: Record<string, number> = {
      "ม.ค.": 0,
      "ก.พ.": 1,
      "มี.ค.": 2,
      "เม.ย.": 3,
      "พ.ค.": 4,
      "มิ.ย.": 5,
      "ก.ค.": 6,
      "ส.ค.": 7,
      "ก.ย.": 8,
      "ต.ค.": 9,
      "พ.ย.": 10,
      "ธ.ค.": 11,
    };

    const month = monthMap[thaiMonth];
    const year = parseInt(yearThai) - 543; // พ.ศ. → ค.ศ.
    const [hour, minute] = time.split(":").map(Number);

    parsedDate = new Date(year, month, parseInt(day), hour, minute);
    console.log("parseDate: ", parsedDate);
  }

  //✅ 4. เก็บลงฐานข้อมูล

  // return {
  //   status: true,
  //   message: "success",
  //     data: saveData,
  // };
  return query;
});

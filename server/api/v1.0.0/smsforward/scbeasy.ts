import { SMSFORWARD } from "~/types/smsforward";

export function handleScbEasy(msg: string): SMSFORWARD {
  let data: SMSFORWARD;
  let channel, amount, sender;
  let dateObj: Date | null = null;

  const msgRaw = msg;

  //Looking for shop
  const shopRaw = msgRaw.match(/Shop:([^\s]+)/);
  const shop = shopRaw?.[1] || null;

  //Looking for sender
  const msgFromRaw = msgRaw.match(/Sender:([^\s]+(?:\s[^\s]+)?)\sMsg/);
  const msgFrom = msgFromRaw?.[1] || null;

  if (msgFrom === "SCB Easy") {
    // App SCB Easy
    const channelRaw = msgRaw.match(/บาท\s([^\s]+)\s*จาก/);
    channel = channelRaw?.[1] || null;

    // ✅ 1. ดึง income
    const amountRaw = msgRaw.match(/คุณได้รับเงิน\s([\d,.]+)\sบาท/);
    amount = amountRaw ? parseFloat(amountRaw[1].replace(/,/g, "")) : null;

    //✅ 2. ดูว่าส่งเข้า MaeManee (เข้าร้านค้า) or เข้าบัญชีปกติ  (ผ่านรายการพร้อมเพย์)
    if (channel === "เข้าร้านค้า") {
      //Message from แม่มณี
      const senderRaw = msgRaw.match(/จาก\s(\w+)/);
      sender = senderRaw?.[1].trim() || null;
    } else if (channel === "ผ่านรายการพร้อมเพย์") {
      const senderRaw = msgRaw.match(/จาก\s+(.*?)\s+เข้าบัญชี/);
      sender = senderRaw?.[1].trim() || null;
    }

    //✅ 3. ลองจับ pattern วันเวลาแบบไทย
    const dateMatch = msgRaw.match(
      /เมื่อ\s+(\d{1,2})\s+(ม\.ค\.|ก\.พ\.|มี\.ค\.|เม\.ย\.|พ\.ค\.|มิ\.ย\.|ก\.ค\.|ส\.ค\.|ก\.ย\.|ต\.ค\.|พ\.ย\.|ธ\.ค\.)\s+(\d{4})\s*-\s*(\d{1,2}:\d{2})/
    );

    if (!dateMatch) {
      console.log("❌ ไม่ match");
    }

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

      dateObj = new Date(year, month, parseInt(day), hour, minute);
    }
  }

  data = {
    msgRaw: msg,
    shop: shop ?? "",
    channel: channel ?? "None",
    sender: sender ?? "",
    amount: amount,
    datetime: dateObj,
  };

  // Return a default or placeholder SMSFORWARD object to satisfy the return type
  return data;
}

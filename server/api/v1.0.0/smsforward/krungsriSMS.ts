import { SMSFORWARD } from "~/types/smsforward";

export function handleKrungsriSMS(msg: string): SMSFORWARD {
  let data: SMSFORWARD;
  const msgRaw = msg;
  //Getting Shop name
  const shopRaw = msgRaw.match(/Shop:([^\s]+)/);
  const shop = shopRaw?.[1] || null;

  //Getting Sender
  const msgFromRaw = msgRaw.match(/Sender:([^\s]+(?:\s[^\s]+)?)\sMsg/);
  const msgFrom = msgFromRaw?.[1] || null;

  //Getting Channel
  const channelRaw = msgRaw.match(/Deposit to (\w+)/);
  const channel = channelRaw?.[1] || null;

  //Getting Amount
  const amountRaw = msgRaw.match(/amount\s([\d,.]+)\sBaht/);
  const amount = amountRaw ? parseFloat(amountRaw[1].replace(/,/g, "")) : null;

  //Getting Time
  const timeRaw = msgRaw.match(
    /\((\d{1,2}\/\d{1,2}\/\d{2}),\s*(\d{1,2}:\d{2})hr\)/
  );
  // console.log("timeRaw: ", timeRaw);
  const datePart = timeRaw?.[1]; // "29/6/25"
  const timePart = timeRaw?.[2]; // "21:55"

  // // แยกส่วนของวัน เวลา
  let day: number | undefined,
    month: number | undefined,
    yearShort: number | undefined;
  if (datePart) {
    [day, month, yearShort] = datePart.split("/").map(Number);
  }

  let hour: number | undefined, minute: number | undefined;
  if (timePart) {
    [hour, minute] = timePart.split(":").map(Number);
  }

  // แปลงปี ค.ศ. (25 → 2025)
  let fullYear: number | undefined = undefined;
  if (typeof yearShort === "number" && !isNaN(yearShort)) {
    fullYear = yearShort + 2000;
  }

  // สร้าง Date object (เวลาท้องถิ่น)
  let dateObj: Date | undefined = undefined;

  if (
    typeof fullYear === "number" &&
    typeof month === "number" &&
    typeof day === "number" &&
    typeof hour === "number" &&
    typeof minute === "number"
  ) {
    dateObj = new Date(fullYear, month - 1, day, hour, minute);
  }

  data = {
    msgRaw: msg,
    shop: shop ?? "",
    channel: channel ?? "None",
    sender: msgFrom ?? "",
    amount: amount,
    datetime: dateObj,
  };

  // Return a default or placeholder SMSFORWARD object to satisfy the return type
  return data;
}

import { SMSFORWARD } from "~/types/smsforward";

export function handleMaemaneeMsg(msg: string): SMSFORWARD {
  let data: SMSFORWARD;

  const msgRaw = msg;
//   console.log("msg: ", msg);

  //Getting Shop name
  const shopRaw = msgRaw.match(/Shop:([^\s]+)/);
  const shop = shopRaw?.[1] || null;

  //Getting Channel
  const channel = null;

  //Getting sender
  const msgFromRaw = msgRaw.match(/Sender:([^\s]+(?:\s[^\s]+)?)\sMsg/);
  const msgFrom = msgFromRaw?.[1] || null;

  //Getting amount
  const amountRaw = msgRaw.match(/คุณได้รับเงิน\s([\d,.]+)\sบาท/);
  const amount = amountRaw ? parseFloat(amountRaw[1].replace(/,/g, "")) : null;

  //Getting datetime
  const timeRaw = msgRaw.match(
    /\((\d{1,2}\/\d{1,2}\/\d{2,4}),\s*(\d{1,2}:\d{2})hr\)/
  );
  //   console.log("timeRaw: ", timeRaw);
  const datePart = timeRaw?.[1]; // "29/6/25"
  const timePart = timeRaw?.[2]; // "21:55"

  // // แยกส่วนของวัน เวลา
  let day: number | undefined,
    month: number | undefined,
    fullYear: number | undefined;

  if (datePart) {
    [day, month, fullYear] = datePart.split("/").map(Number);
  }

  let hour: number | undefined, minute: number | undefined;
  if (timePart) {
    [hour, minute] = timePart.split(":").map(Number);
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

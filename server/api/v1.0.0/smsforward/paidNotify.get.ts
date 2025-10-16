import { errorMessages } from "vue/compiler-sfc";
import { PrismaClient } from "@prisma/client";
import Debug from "debug";
import { handleMaemaneeMsg } from "./maemanee";
import { handleKrungsriSMS } from "./krungsriSMS";
import { handleScbEasy } from "./scbeasy";

const prisma = new PrismaClient();
const debug = Debug("api:cyberpay:painNotify");
let data: any = undefined;

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  //หา no-break space และแทนทีช่องว่างแปลกๆ
  const normalizedMsg = query.payload as string;
  for (const char of normalizedMsg) {
    const code = char.charCodeAt(0).toString(16).padStart(4, "0").toUpperCase();
    console.log(`${char} → U+${code}`);
  }

  const msgRaw = normalizedMsg.replace(/[\u202f\u00a0\n\"]/g, " ");
  // console.log("\n")

  //Looking for sender
  const msgFromRaw = msgRaw.match(/Sender:([^\s]+(?:\s[^\s]+)?)\sMsg/);
  const msgFrom = msgFromRaw?.[1].trim() || null;


  if (msgFrom?.includes("SCB Easy")) {
    data = handleScbEasy(msgRaw);
  } else if (msgFrom?.includes("Krungsri")) {
    // SMS Krungsri
    data = handleKrungsriSMS(msgRaw);
  } else if (msgFrom?.includes("แม่มณี")) {

    //App SCB MaeManee
    data = handleMaemaneeMsg(msgRaw);
    console.log("3");
  }

  console.log("Data: ", data);
  console.log("\n");

  try {
    //Matching QRrequest here then save to DB


    const saveData = await prisma.notifyMsgLog.create({
      data: data,
    });

    return {
      success: true,
      data: data,
    };
  } catch (error:any) {
    let statusMessage = "Unknown error";
    if (
      typeof error === "object" &&
      error !== null &&
      "details" in error &&
      Array.isArray((error as any).details) &&
      (error as any).details[0]?.message
    ) {
      statusMessage = (error as any).details[0].message;
    } else if (error instanceof Error) {
      statusMessage = error.message;
    }

    throw createError({
      statusCode: 400,
      statusMessage,
    });
  }
});

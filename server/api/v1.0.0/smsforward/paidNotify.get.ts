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
  const msgRaw = normalizedMsg.replace(/[\u202f\u00a0\n\"]/g, " ");
  // console.log("msgRaw: ",msgRaw)
  // console.log("\n")

  //Looking for sender
  const msgFromRaw = msgRaw.match(/Sender:([^\s]+(?:\s[^\s]+)?)\sMsg/);
  const msgFrom = msgFromRaw?.[1] || null;

  if (msgFrom === "SCB Easy") {
    data = handleScbEasy(msgRaw);
  } else if (msgFrom === "Krungsri") {
    // SMS Krungsri
    data = handleKrungsriSMS(msgRaw);
  } else if (msgFrom === "แอปพลิเคชั่น แม่มณี") {
    //App SCB MaeManee
    data = handleMaemaneeMsg(msgRaw);
  }

  console.log("Data: ", data);
  console.log("\n");

  try {
    const saveData = await prisma.notifyMsgLog.create({
      data: data,
    });

    return {
      success: true,
      data: saveData,
    };
  } catch (error) {
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

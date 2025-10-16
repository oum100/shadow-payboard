import { PrismaClient } from '@prisma/client'
import Debug from 'debug'
import moment from 'moment-timezone'
import { createError } from 'h3'

const prisma = new PrismaClient()
const debug = Debug('api:transaction:groupByHour')

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const filter = String(query.filter || 'ALL')
  const sDate = query.startDate as string | undefined
  const eDate = query.endDate as string | undefined

  // ถ้าไม่มีวัน ให้ default เป็น "วันนี้" โซน Asia/Bangkok
  let startDateISO: string
  let endDateISO: string
  if (sDate && eDate) {
    startDateISO = moment.tz(String(sDate), 'Asia/Bangkok').toISOString()
    endDateISO = moment.tz(String(eDate), 'Asia/Bangkok').toISOString()
  } else {
    const start = moment.tz('Asia/Bangkok').startOf('day')
    const end = moment.tz('Asia/Bangkok').endOf('day')
    startDateISO = start.toISOString()
    endDateISO = end.toISOString()
  }

  try {
    // 1) ดึง transactions แบบ "ไม่ include device" เพื่อกัน error required-relation
    const txWhere: any = {
      createdAt: {
        gte: startDateISO,
        lt: endDateISO,
      },
      // กัน null เผื่อมีแถวไม่สมบูรณ์
    //   NOT: { deviceUuid: null },
    //   deviceUuid: { not: null },
    }

    // ถ้า filter เป็นชื่อสาขา ให้กรองทีหลังด้วย deviceMap (เพราะเราไม่ include device ตรง ๆ)
    const txSelect = {
      amount: true,
      paymentBy: true,
      createdAt: true,
      deviceUuid: true,
    } as const

    const trans = await prisma.transactions.findMany({
      where: txWhere,
      select: txSelect,
      orderBy: { createdAt: 'asc' },
    })

    // 2) สร้างชุด uuid แล้วไปดึง Devices + Branchs มาเอง
    const uuids = Array.from(
      new Set(trans.map((t) => t.deviceUuid).filter(Boolean))
    ) as string[]

    const devices = uuids.length
      ? await prisma.devices.findMany({
          where: { uuid: { in: uuids } },
          select: {
            uuid: true,
            type: true, // schema คุณเป็น String; ถ้าอยากใช้ enum ให้ปรับ schema ภายหลัง
            branch: {
              select: { branchName: true },
            },
          },
        })
      : []

    const deviceMap = new Map<string, (typeof devices)[number]>()
    devices.forEach((d) => deviceMap.set(d.uuid, d))

    // 3) 24 ช่องต่อชั่วโมง
    const zeros = () => Array(24).fill(0)

    const hourlyTotal = zeros()
    const hourlyTotalByQR = zeros()
    const hourlyTotalByCash = zeros()

    const hourlyWasher = zeros()
    const hourlyWasherByQR = zeros()
    const hourlyWasherByCash = zeros()

    const hourlyDryer = zeros()
    const hourlyDryerByQR = zeros()
    const hourlyDryerByCash = zeros()

    const hourlyBranch1 = zeros() // SkyView
    const hourlyBranch2 = zeros() // RGH-18

    // normalize ตัวพิมพ์ให้ตรง
    const isWasher = (t?: string | null) =>
      (t || '').toLowerCase() === 'washer'
    const isDryer = (t?: string | null) => (t || '').toLowerCase() === 'dryer'
    const isQR = (p?: string | null) => (p || '').toLowerCase() === 'qrcode'
    const isCash = (p?: string | null) => (p || '').toLowerCase() === 'cash'

    for (const item of trans) {
      const hour = moment(item.createdAt).tz('Asia/Bangkok').hour()
      const amt = Number(item.amount ?? 0)
      const dev = item.deviceUuid ? deviceMap.get(item.deviceUuid) : undefined
      const devType = dev?.type ?? null
      const branchName = dev?.branch?.branchName ?? null

      // ถ้า filter เป็นชื่อสาขา ให้กรองที่ชั้นนี้
      if (filter !== 'ALL') {
        if ((branchName || '') !== String(filter)) continue
      }

      // รวมทั้งหมด
      hourlyTotal[hour] += amt
      if (isQR(item.paymentBy)) hourlyTotalByQR[hour] += amt
      if (isCash(item.paymentBy)) hourlyTotalByCash[hour] += amt

      // แยกประเภทเครื่อง
      if (isWasher(devType)) {
        hourlyWasher[hour] += amt
        if (isQR(item.paymentBy)) hourlyWasherByQR[hour] += amt
        if (isCash(item.paymentBy)) hourlyWasherByCash[hour] += amt
      } else if (isDryer(devType)) {
        hourlyDryer[hour] += amt
        if (isQR(item.paymentBy)) hourlyDryerByQR[hour] += amt
        if (isCash(item.paymentBy)) hourlyDryerByCash[hour] += amt
      }

      // แยกสาขาที่ต้องการ
      if (branchName === 'SkyView') hourlyBranch1[hour] += amt
      else if (branchName === 'RGH-18') hourlyBranch2[hour] += amt
    }

    const buildSeries = (name: string, type: 'line' | 'column' | 'area', data: number[]) =>
      ({ name, type, data })

    const resultALL = {
      revenue: [
        buildSeries('Total', 'line', hourlyTotal),
        buildSeries('Washer', 'column', hourlyWasher),
        buildSeries('Dryer', 'column', hourlyDryer),
        buildSeries('SkyView', 'area', hourlyBranch1),
        buildSeries('RGH-18', 'area', hourlyBranch2),
      ],
      transaction: [
        buildSeries('Total (QR)', 'line', hourlyTotalByQR),
        buildSeries('Total (Cash)', 'line', hourlyTotalByCash),
        buildSeries('Washer (QR)', 'column', hourlyWasherByQR),
        buildSeries('Washer (Cash)', 'column', hourlyWasherByCash),
        buildSeries('Dryer (QR)', 'column', hourlyDryerByQR),
        buildSeries('Dryer (Cash)', 'column', hourlyDryerByCash),
      ],
    }

    // ถ้า filter != ALL เราก็กรองแล้วตั้งแต่ตอนรวมผล ดังนั้นใช้ชุดเดียวกันได้
    return { data: resultALL }
  } catch (err: any) {
    debug('groupByHour error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Server Error',
      message: err?.message || 'Unknown error',
    })
  }
})

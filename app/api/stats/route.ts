import os from "os";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function getCpuAverage() {
  const cpus = os.cpus();
  let totalIdle = 0;
  let totalTick = 0;

  cpus.forEach((core) => {
    for (const type in core.times) {
      totalTick += core.times[type];
    }
    totalIdle += core.times.idle;
  });

  return {
    idle: totalIdle / cpus.length,
    total: totalTick / cpus.length,
  };
}

async function getCpuUsage(delayMs = 100) {
  const startMeasure = getCpuAverage();

  await new Promise((resolve) => setTimeout(resolve, delayMs));

  const endMeasure = getCpuAverage();
  const idleDifference = endMeasure.idle - startMeasure.idle;
  const totalDifference = endMeasure.total - startMeasure.total;

  const percentageCpu =
    100 - Math.round((100 * idleDifference) / totalDifference);
  return percentageCpu;
}

export async function GET() {
  const cpuUsage = await getCpuUsage();
  const memoryTotal = os.totalmem();
  const memoryFree = os.freemem();
  const memoryUsed = memoryTotal - memoryFree;
  // console.log(memory);
  return NextResponse.json({
    cpuUsage,
    memory: { total: memoryTotal, used: memoryUsed, free: memoryFree },
  });
}

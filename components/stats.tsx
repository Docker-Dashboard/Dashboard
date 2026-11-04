'use client';
import { useState, useEffect } from 'react';

interface configProps {
  config: string[];
}

export function StatsData({ config }: configProps) {
  const [cpu, setCpu] = useState<string | number | readonly string[] | undefined>(0);
  const [mem, setMem] = useState<string | number | readonly string[] | undefined>(0);
  const [memUsedDisplayed, setMemUsedDisplayed] = useState<number | undefined>(0);
  const [memTotalDisplayed, setMemTotalDisplayed] = useState<number | undefined>(0);
  const [memTotal, setMemTotal] = useState<string | number | undefined>(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/stats');
      const data = await response.json();
      setCpu(data.cpuUsage);
      const memUsed = (data.memory.used/(1024 * 1024 * 1024));
      const memUsedDisplayed = Math.floor(memUsed *100)/100;
      setMemUsedDisplayed(memUsedDisplayed);
      const memTot = (data.memory.total/(1024 * 1024 * 1024));
      const memTotalDisplayed = Math.floor(memTot *100)/100;
      setMemTotalDisplayed(memTotalDisplayed);
      setMem(memUsed);
      setMemTotal(memTot);
      // console.log(data);
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  try {
    const processor = config.includes("cpu");
    const memory = config.includes("memory");

    const dataOut = (
      <div className="dashboardDataStatsContent">
        {processor ? (
          <div className="dashboardDataStatsBox">
            <p className="dashboardDataStatsCpu">CPU = {cpu}%</p>
            <progress className="progressBarCpu" value={cpu} max={100}></progress>
          </div>
        ) : null}
        {memory ? (
          <div className="dashboardDataStatsBox">
            <p className="dashboardDataStats">Memory = {memUsedDisplayed}GB / {memTotalDisplayed}GB</p>
            <progress className="progressBarMemory" value={mem} max={memTotal}></progress>
          </div>
        ) : null}
      </div>
    );
    return dataOut;
  } catch (err) {
    return (
      <div className="dashboardDataStatsContent">
        <p className="dashboardDataStats">{"" + err}</p>
      </div>
    );
  }
}


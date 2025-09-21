import React, { useEffect, useState } from 'react';
import { listSignals } from '../services/api';
import SignalChart from './SignalChart';

type Signal = {
  id: number;
  name?: string;
  device_id?: string;
  timestamp: string;
  value: number;
  status?: string;
};

export default function Dashboard(): JSX.Element {
  const [samples, setSamples] = useState<Signal[]>([]);

  const fetchSamples = async () => {
    try {
      const data: any[] = await listSignals();

      const normalized = data.map((d: any, i: number) => {
        // normalize different possible server shapes into our Signal type
        const id = d.id ?? i;
        const device_id = d.device_id ?? d.name ?? 'device';
        // Accept ISO timestamp, epoch millis, or created_at fallback
        let timestamp = d.timestamp ?? d.created_at ?? new Date().toISOString();
        if (typeof timestamp === 'number') {
          // assume epoch seconds or millis
          timestamp = timestamp > 1e12 ? new Date(timestamp).toISOString() : new Date(timestamp * 1000).toISOString();
        }
        const value =
          typeof d.value === 'number'
            ? d.value
            : typeof d.sampling_rate === 'number'
            ? d.sampling_rate
            : Number(d.value) || 0;

        return {
          id,
          device_id,
          timestamp,
          value,
          status: d.status ?? 'ok',
        } as Signal;
      });

      setSamples(normalized);
    } catch (err) {
      setSamples([]);
    }
  };

  useEffect(() => {
    fetchSamples();
    const i = setInterval(fetchSamples, 2000); // poll every 2s
    return () => clearInterval(i);
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Signal Processing Dashboard</h2>

      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Live Signal</h5>
          <SignalChart
            samples={samples.map((s) => ({ timestamp: s.timestamp, value: s.value }))}
          />
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5>Latest Samples</h5>
          <ul className="list-group list-group-flush">
            {samples.length ? (
              samples
                .slice()
                .reverse()
                .map((s) => (
                  <li
                    key={s.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      {s.device_id ?? 'device'} — {new Date(s.timestamp).toLocaleTimeString()}
                    </div>
                    <div className="badge text-bg-secondary">{s.value}</div>
                  </li>
                ))
            ) : (
              <li className="list-group-item">No samples yet</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
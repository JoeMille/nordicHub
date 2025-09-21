import React, { useEffect, useState } from 'react';
import { listSignals } from '../services/api';

type Signal = {
    id: number;
    name: string;
    sampling_rate: number;
    status: string;
};

const Dashboard: React.FC () => {
    const [signals, setSignals] = useState<Signal[]>([]);

    useEffect(() => {
        listSignals().then(setSignals).catch(() => setSignals([]));
    }, []);
    
    return (
        <div className="container py-4">
        <h2 className="mb-3">Signal Processing Dashboard</h2>
        <div className="card">
            <div className="card-body">
            <h5>Signals</h5>
            <ul className="list-group list-group-flush">
                {signals.map(s => (
                <li key={s.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{s.name}</span>
                    <span className="badge text-bg-secondary">SR: {s.sampling_rate} Hz</span>
                </li>
                ))}
                {signals.length === 0 && <li className="list-group-item">No signals yet</li>}
            </ul>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;
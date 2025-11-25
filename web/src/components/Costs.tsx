import { useState } from 'react';
import { DollarSign } from 'lucide-react';

interface CostItem {
    id: string;
    category: string;
    amount: number;
    date: string;
    status: 'approved' | 'pending' | 'rejected';
}

export function Costs() {
    const [costs] = useState<CostItem[]>([
        { id: '1', category: 'Materiais', amount: 125000, date: '2024-11-01', status: 'approved' },
        { id: '2', category: 'Mão de obra', amount: 85000, date: '2024-11-05', status: 'approved' },
        { id: '3', category: 'Equipamentos', amount: 42000, date: '2024-11-07', status: 'pending' },
        { id: '4', category: 'Serviços Terceirizados', amount: 31000, date: '2024-11-10', status: 'approved' },
        { id: '5', category: 'Despesas Gerais', amount: 15000, date: '2024-11-12', status: 'approved' }
    ]);

    const total = costs.reduce((sum, c) => sum + c.amount, 0);
    const approved = costs.filter(c => c.status === 'approved').reduce((s, c) => s + c.amount, 0);
    const pending = costs.filter(c => c.status === 'pending').reduce((s, c) => s + c.amount, 0);

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

    return (
        <div className="content-section">
            <div className="section-header">
                <div>
                    <h1>Custos</h1>
                    <p className="subtitle">Visão geral dos custos do projeto</p>
                </div>
                <button className="btn-primary">
                    <DollarSign size={18} />
                    Novo Registro de Custo
                </button>
            </div>

            {/* Summary Cards */}
            <div className="costs-summary">
                <div className="summary-card">
                    <h3>Total</h3>
                    <p className="summary-value">{formatCurrency(total)}</p>
                </div>
                <div className="summary-card">
                    <h3>Aprovado</h3>
                    <p className="summary-value">{formatCurrency(approved)}</p>
                </div>
                <div className="summary-card">
                    <h3>Pendente</h3>
                    <p className="summary-value">{formatCurrency(pending)}</p>
                </div>
            </div>

            {/* Costs Table */}
            <div className="costs-table-container">
                <table className="costs-table">
                    <thead>
                        <tr>
                            <th>Categoria</th>
                            <th>Valor</th>
                            <th>Data</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {costs.map(c => (
                            <tr key={c.id}>
                                <td>{c.category}</td>
                                <td>{formatCurrency(c.amount)}</td>
                                <td>{new Date(c.date).toLocaleDateString('pt-BR')}</td>
                                <td>
                                    <span className={`status-badge status-${c.status}`}>{c.status.charAt(0).toUpperCase() + c.status.slice(1)}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

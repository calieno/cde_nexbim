import { Calendar, Filter, FileText, Upload, Plus, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export function ProjectOverview() {
    const [selectedPeriod, setSelectedPeriod] = useState('Todos');
    const [selectedPhase, setSelectedPhase] = useState('Todas');

    // Dados de exemplo para o gráfico
    const progressData = [
        { month: 'JAN', value: 35 },
        { month: 'FEV', value: 45 },
        { month: 'MAR', value: 38 },
        { month: 'ABR', value: 52 },
        { month: 'MAI', value: 48 },
        { month: 'JUN', value: 55 },
        { month: 'JUL', value: 50 },
        { month: 'AGO', value: 60 },
        { month: 'SET', value: 52 },
        { month: 'OUT', value: 68 },
        { month: 'NOV', value: 72 },
        { month: 'DEZ', value: 76 }
    ];

    const attachments = [
        { name: 'Planta_Baixa_Terreo.pdf', type: 'PDF', date: '10/07/2024' },
        { name: 'Planta_Primeiro_Pavimento.pdf', type: 'PDF', date: '10/07/2024' },
        { name: 'Cortes_Longitudinais.dwg', type: 'DWG', date: '08/07/2024' },
    ];

    const maxValue = Math.max(...progressData.map(d => d.value));

    return (
        <div className="project-overview">
            <div className="overview-header">
                <div>
                    <h1>Visão Geral do Projeto Alpha</h1>
                    <p className="subtitle">Acompanhe o progresso, custos e comunicação em um só lugar.</p>
                </div>

                <div className="header-actions">
                    <div className="filter-group">
                        <button className="filter-btn">
                            <Filter size={16} />
                            Filtrar por Período
                        </button>
                        <button className="filter-btn">
                            <Calendar size={16} />
                            Fase do Projeto
                        </button>
                    </div>
                    <button className="btn-primary">
                        <FileText size={18} />
                        Gerar Relatório
                    </button>
                </div>
            </div>

            {/* Progress Chart Card */}
            <div className="card progress-card">
                <h3>Evolução do Projeto</h3>
                <div className="progress-stats">
                    <div className="main-stat">
                        <span className="stat-value">76%</span>
                        <span className="stat-label">Concluído</span>
                    </div>
                    <div className="stat-change positive">
                        <TrendingUp size={16} />
                        <span>+5.2% vs. último mês</span>
                    </div>
                </div>

                <div className="chart-container">
                    <svg className="progress-chart" viewBox="0 0 700 200" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#fb923c" stopOpacity="1" />
                            </linearGradient>
                        </defs>
                        <polyline
                            points={progressData.map((d, i) =>
                                `${i * (700 / (progressData.length - 1))},${200 - (d.value / maxValue * 160)}`
                            ).join(' ')}
                            fill="none"
                            stroke="url(#lineGradient)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        {progressData.map((d, i) => (
                            <circle
                                key={i}
                                cx={i * (700 / (progressData.length - 1))}
                                cy={200 - (d.value / maxValue * 160)}
                                r="4"
                                fill="#f97316"
                            />
                        ))}
                    </svg>
                    <div className="chart-labels">
                        {progressData.map((d, i) => (
                            <span key={i} className="chart-label">{d.month}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid for 3D Model and Attachments */}
            <div className="overview-grid">
                {/* 3D Model Card */}
                <div className="card model-card">
                    <h3>Modelo 3D (IFC)</h3>
                    <div className="model-info">
                        <p className="model-filename">Edificio_Alpha_v3.ifc</p>
                        <p className="model-date">Atualizado em 12/07/2024</p>
                    </div>
                    <button className="btn-upload">
                        <Upload size={18} />
                        Upload de Modelo
                    </button>
                </div>

                {/* Attachments Card */}
                <div className="card attachments-card">
                    <div className="card-header-row">
                        <h3>Anexos do Projeto</h3>
                        <button className="btn-add">
                            <Plus size={18} />
                            Adicionar Arquivo
                        </button>
                    </div>

                    <div className="attachments-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome do Arquivo</th>
                                    <th>Tipo</th>
                                    <th>Data de Upload</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attachments.map((file, i) => (
                                    <tr key={i}>
                                        <td>
                                            <div className="file-name">
                                                <FileText size={16} />
                                                {file.name}
                                            </div>
                                        </td>
                                        <td><span className="file-type-badge">{file.type}</span></td>
                                        <td>{file.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

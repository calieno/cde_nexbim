import {
    FileText,
    Download,
    TrendingUp,
    Clock,
    CheckCircle,
    BarChart3,
    PieChart,
    Calendar
} from 'lucide-react';

export function Reports() {
    const reports = [
        {
            id: '1',
            title: 'Relatório de Progresso Mensal',
            description: 'Resumo completo do andamento do projeto no mês atual',
            type: 'Progresso',
            date: '2024-11-15',
            size: '2.4 MB',
            icon: <TrendingUp size={24} />
        },
        {
            id: '2',
            title: 'Análise de Custos',
            description: 'Comparativo entre orçado e realizado por categoria',
            type: 'Financeiro',
            date: '2024-11-10',
            size: '1.8 MB',
            icon: <BarChart3 size={24} />
        },
        {
            id: '3',
            title: 'Relatório de Qualidade',
            description: 'Inspeções, não conformidades e ações corretivas',
            type: 'Qualidade',
            date: '2024-11-08',
            size: '3.2 MB',
            icon: <CheckCircle size={24} />
        },
        {
            id: '4',
            title: 'Cronograma Atualizado',
            description: 'Status das atividades e marcos do projeto',
            type: 'Planejamento',
            date: '2024-11-05',
            size: ' 1.5 MB',
            icon: <Clock size={24} />
        },
        {
            id: '5',
            title: 'Dashboard Executivo',
            description: 'Indicadores estratégicos e KPIs do projeto',
            type: 'Gestão',
            date: '2024-11-01',
            size: '2.1 MB',
            icon: <PieChart size={24} />
        }
    ];

    const stats = [
        { label: 'Relatórios Gerados', value: '127', trend: '+12%' },
        { label: 'Downloads', value: '342', trend: '+8%' },
        { label: 'Último Update', value: 'Hoje', trend: '' }
    ];

    return (
        <div className="content-section">
            <div className="section-header">
                <div>
                    <h1>Relatórios</h1>
                    <p className="subtitle">Acesse relatórios e documentação do projeto</p>
                </div>
                <button className="btn-primary">
                    <FileText size={18} />
                    Gerar Novo Relatório
                </button>
            </div>

            {/* Stats */}
            <div className="reports-stats">
                {stats.map((stat, i) => (
                    <div key={i} className="stat-box">
                        <span className="stat-label">{stat.label}</span>
                        <div className="stat-value-row">
                            <h3>{stat.value}</h3>
                            {stat.trend && (
                                <span className="stat-trend positive">{stat.trend}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Reports List */}
            <div className="reports-grid">
                {reports.map(report => (
                    <div key={report.id} className="report-card">
                        <div className="report-icon">
                            {report.icon}
                        </div>
                        <div className="report-content">
                            <span className="report-type">{report.type}</span>
                            <h3>{report.title}</h3>
                            <p>{report.description}</p>
                            <div className="report-meta">
                                <div className="meta-item">
                                    <Calendar size={14} />
                                    <span>{new Date(report.date).toLocaleDateString('pt-BR')}</span>
                                </div>
                                <span className="report-size">{report.size}</span>
                            </div>
                        </div>
                        <div className="report-actions">
                            <button className="report-action-btn primary">
                                <Download size={18} />
                                Download
                            </button>
                            <button className="report-action-btn">
                                Visualizar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

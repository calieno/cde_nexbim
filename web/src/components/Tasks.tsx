import { useState } from 'react';
import {
    Plus,
    CheckCircle2,
    Circle,
    Clock,
    AlertCircle,
    User,
    Calendar,
    Flag,
    Filter
} from 'lucide-react';

interface Task {
    id: string;
    title: string;
    description: string;
    assignedTo: string;
    dueDate: string;
    priority: 'high' | 'medium' | 'low';
    status: 'todo' | 'in-progress' | 'review' | 'completed';
    category: string;
}

export function Tasks() {
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [tasks] = useState<Task[]>([
        {
            id: '1',
            title: 'Revisar detalhamento estrutural',
            description: 'Verificar compatibilidade entre pilares e vigas',
            assignedTo: 'Ana Costa',
            dueDate: '2024-11-20',
            priority: 'high',
            status: 'in-progress',
            category: 'Estrutura'
        },
        {
            id: '2',
            title: 'Atualizar plantas arquitetônicas',
            description: 'Incluir modificações solicitadas pelo cliente',
            assignedTo: 'João Silva',
            dueDate: '2024-11-18',
            priority: 'high',
            status: 'todo',
            category: 'Arquitetura'
        },
        {
            id: '3',
            title: 'Coordenação MEP - Clash Detection',
            description: 'Executar clash detection entre hidráulica e elétrica',
            assignedTo: 'Pedro Oliveira',
            dueDate: '2024-11-22',
            priority: 'medium',
            status: 'review',
            category: 'Instalações'
        },
        {
            id: '4',
            title: 'Elaborar memorial descritivo',
            description: 'Documentar especificações técnicas do projeto',
            assignedTo: 'Maria Alves',
            dueDate: '2024-11-25',
            priority: 'medium',
            status: 'in-progress',
            category: 'Documentação'
        },
        {
            id: '5',
            title: 'Aprovação do cliente - Fachada',
            description: 'Aguardando feedback sobre renderizações',
            assignedTo: 'Lucas Mendes',
            dueDate: '2024-11-19',
            priority: 'low',
            status: 'review',
            category: 'Design'
        },
        {
            id: '6',
            title: 'Quantitativo de materiais',
            description: 'Extrair quantitativos do modelo BIM',
            assignedTo: 'Carlos Santos',
            dueDate: '2024-11-15',
            priority: 'high',
            status: 'completed',
            category: 'Orçamento'
        }
    ]);

    const statusConfig = {
        'all': { label: 'Todas', count: tasks.length },
        'todo': { label: 'A Fazer', count: tasks.filter(t => t.status === 'todo').length },
        'in-progress': { label: 'Em Andamento', count: tasks.filter(t => t.status === 'in-progress').length },
        'review': { label: 'Em Revisão', count: tasks.filter(t => t.status === 'review').length },
        'completed': { label: 'Concluídas', count: tasks.filter(t => t.status === 'completed').length }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return '#ef4444';
            case 'medium': return '#eab308';
            case 'low': return '#22c55e';
            default: return '#737373';
        }
    };

    const getPriorityLabel = (priority: string) => {
        const labels = { high: 'Alta', medium: 'Média', low: 'Baixa' };
        return labels[priority as keyof typeof labels];
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircle2 size={20} color="#22c55e" />;
            case 'in-progress':
                return <Clock size={20} color="#3b82f6" />;
            case 'review':
                return <AlertCircle size={20} color="#eab308" />;
            default:
                return <Circle size={20} color="#737373" />;
        }
    };

    const filteredTasks = selectedStatus === 'all'
        ? tasks
        : tasks.filter(t => t.status === selectedStatus);

    const isOverdue = (dueDate: string) => {
        return new Date(dueDate) < new Date();
    };

    return (
        <div className="content-section">
            <div className="section-header">
                <div>
                    <h1>Tarefas</h1>
                    <p className="subtitle">Gerencie e acompanhe as atividades do projeto</p>
                </div>
                <button className="btn-primary">
                    <Plus size={18} />
                    Nova Tarefa
                </button>
            </div>

            {/* Status Filter */}
            <div className="tasks-filter">
                {Object.entries(statusConfig).map(([key, config]) => (
                    <button
                        key={key}
                        className={`status-filter-btn ${selectedStatus === key ? 'active' : ''}`}
                        onClick={() => setSelectedStatus(key)}
                    >
                        {config.label}
                        <span className="filter-count">{config.count}</span>
                    </button>
                ))}
            </div>

            {/* Tasks Grid */}
            <div className="tasks-grid">
                {filteredTasks.map(task => (
                    <div key={task.id} className={`task-card ${task.status}`}>
                        <div className="task-header">
                            <div className="task-status-icon">
                                {getStatusIcon(task.status)}
                            </div>
                            <div className="task-priority">
                                <Flag size={16} color={getPriorityColor(task.priority)} fill={getPriorityColor(task.priority)} />
                                <span style={{ color: getPriorityColor(task.priority) }}>
                                    {getPriorityLabel(task.priority)}
                                </span>
                            </div>
                        </div>

                        <h3>{task.title}</h3>
                        <p className="task-description">{task.description}</p>

                        <div className="task-meta">
                            <div className="task-meta-item">
                                <User size={14} />
                                <span>{task.assignedTo}</span>
                            </div>
                            <div className={`task-meta-item ${isOverdue(task.dueDate) && task.status !== 'completed' ? 'overdue' : ''}`}>
                                <Calendar size={14} />
                                <span>{new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
                            </div>
                        </div>

                        <div className="task-footer">
                            <span className="task-category">{task.category}</span>
                            {task.status !== 'completed' && (
                                <button className="task-complete-btn">
                                    <CheckCircle2 size={16} />
                                    Concluir
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {filteredTasks.length === 0 && (
                <div className="empty-state">
                    <CheckCircle2 size={48} color="#a3a3a3" />
                    <p>Nenhuma tarefa encontrada</p>
                </div>
            )}
        </div>
    );
}

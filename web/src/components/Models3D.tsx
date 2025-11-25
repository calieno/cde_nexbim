import { useState } from 'react';
import { Upload, Eye, FileText, Box, CheckCircle, XCircle } from 'lucide-react';

interface ModelItem {
    id: string;
    name: string;
    version: string;
    uploadedBy: string;
    uploadDate: string;
    status: 'approved' | 'pending' | 'rejected';
}

export function Models3D() {
    const [models] = useState<ModelItem[]>([
        { id: '1', name: 'Edificio_Alpha_v1.ifc', version: 'v1', uploadedBy: 'Ana Costa', uploadDate: '2024-10-28', status: 'approved' },
        { id: '2', name: 'Edificio_Alpha_v2.ifc', version: 'v2', uploadedBy: 'Pedro Oliveira', uploadDate: '2024-11-02', status: 'pending' },
        { id: '3', name: 'Edificio_Alpha_v3.ifc', version: 'v3', uploadedBy: 'Lucas Mendes', uploadDate: '2024-11-10', status: 'approved' }
    ]);

    const getStatusBadge = (status: string) => {
        const colors = {
            approved: 'status-badge status-approved',
            pending: 'status-badge status-pending',
            rejected: 'status-badge status-rejected'
        };
        const labels = {
            approved: 'Aprovado',
            pending: 'Pendente',
            rejected: 'Rejeitado'
        };
        return <span className={colors[status as keyof typeof colors]}>{labels[status as keyof typeof labels]}</span>;
    };

    return (
        <div className="content-section">
            <div className="section-header">
                <div>
                    <h1>Modelos 3D (IFC)</h1>
                    <p className="subtitle">Gerencie versões dos modelos BIM do projeto</p>
                </div>
                <button className="btn-primary">
                    <Upload size={18} />
                    Upload de Modelo
                </button>
            </div>

            <div className="models-grid">
                {models.map(m => (
                    <div key={m.id} className="model-card">
                        <div className="model-icon">
                            <Box size={24} />
                        </div>
                        <div className="model-info">
                            <h3>{m.name}</h3>
                            <p>Versão: {m.version}</p>
                            <p>Por: {m.uploadedBy} • {new Date(m.uploadDate).toLocaleDateString('pt-BR')}</p>
                            {getStatusBadge(m.status)}
                        </div>
                        <div className="model-actions">
                            <button className="action-btn" title="Visualizar">
                                <Eye size={18} />
                            </button>
                            <button className="action-btn" title="Aprovar/Recusar">
                                <CheckCircle size={18} />
                                <XCircle size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

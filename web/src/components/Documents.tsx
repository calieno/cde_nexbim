import { useState } from 'react';
import {
    Search,
    Filter,
    FileText,
    Download,
    Eye,
    Trash2,
    Upload,
    Folder,
    File,
    Image,
    FileSpreadsheet
} from 'lucide-react';

interface Document {
    id: string;
    name: string;
    type: string;
    size: string;
    category: string;
    uploadDate: string;
    uploadedBy: string;
    status: 'approved' | 'pending' | 'rejected';
}

export function Documents() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [documents] = useState<Document[]>([
        {
            id: '1',
            name: 'Planta_Arquitetonica_Geral.pdf',
            type: 'PDF',
            size: '2.4 MB',
            category: 'Arquitetura',
            uploadDate: '12/11/2024',
            uploadedBy: 'João Silva',
            status: 'approved'
        },
        {
            id: '2',
            name: 'Memorial_Descritivo.docx',
            type: 'DOCX',
            size: '856 KB',
            category: 'Documentação',
            uploadDate: '10/11/2024',
            uploadedBy: 'Maria Alves',
            status: 'approved'
        },
        {
            id: '3',
            name: 'Planilha_Orcamento.xlsx',
            type: 'XLSX',
            size: '1.2 MB',
            category: 'Orçamento',
            uploadDate: '08/11/2024',
            uploadedBy: 'Carlos Santos',
            status: 'pending'
        },
        {
            id: '4',
            name: 'Detalhamento_Estrutural.pdf',
            type: 'PDF',
            size: '3.8 MB',
            category: 'Estrutura',
            uploadDate: '05/11/2024',
            uploadedBy: 'Ana Costa',
            status: 'approved'
        },
        {
            id: '5',
            name: 'Projeto_Hidraulico.dwg',
            type: 'DWG',
            size: '5.2 MB',
            category: 'Instalações',
            uploadDate: '03/11/2024',
            uploadedBy: 'Pedro Oliveira',
            status: 'approved'
        },
        {
            id: '6',
            name: 'Render_Fachada_Principal.png',
            type: 'PNG',
            size: '4.1 MB',
            category: 'Renders',
            uploadDate: '01/11/2024',
            uploadedBy: 'Lucas Mendes',
            status: 'approved'
        }
    ]);

    const categories = [
        { id: 'all', name: 'Todos', count: documents.length },
        { id: 'Arquitetura', name: 'Arquitetura', count: 1 },
        { id: 'Estrutura', name: 'Estrutura', count: 1 },
        { id: 'Instalações', name: 'Instalações', count: 1 },
        { id: 'Documentação', name: 'Documentação', count: 1 },
        { id: 'Orçamento', name: 'Orçamento', count: 1 },
        { id: 'Renders', name: 'Renders', count: 1 }
    ];

    const getFileIcon = (type: string) => {
        switch (type.toUpperCase()) {
            case 'PDF':
                return <FileText size={20} color="#ef4444" />;
            case 'XLSX':
            case 'XLS':
                return <FileSpreadsheet size={20} color="#22c55e" />;
            case 'PNG':
            case 'JPG':
            case 'JPEG':
                return <Image size={20} color="#3b82f6" />;
            default:
                return <File size={20} color="#737373" />;
        }
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            approved: 'status-badge status-approved',
            pending: 'status-badge status-pending',
            rejected: 'status-badge status-rejected'
        };
        const labels = {
            approved: 'Aprovado',
            pending: 'Pendente',
            rejected: 'Rejeitado'
        };
        return <span className={styles[status as keyof typeof styles]}>{labels[status as keyof typeof labels]}</span>;
    };

    const filteredDocs = documents.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="content-section">
            <div className="section-header">
                <div>
                    <h1>Documentos</h1>
                    <p className="subtitle">Gerencie e organize todos os documentos do projeto</p>
                </div>
                <button className="btn-primary">
                    <Upload size={18} />
                    Upload de Arquivo
                </button>
            </div>

            {/* Filters and Search */}
            <div className="documents-toolbar">
                <div className="search-container">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Buscar documentos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="categories-filter">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`category-chip ${selectedCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat.id)}
                        >
                            <Folder size={16} />
                            {cat.name} ({cat.count})
                        </button>
                    ))}
                </div>
            </div>

            {/* Documents Grid */}
            <div className="documents-grid">
                {filteredDocs.map(doc => (
                    <div key={doc.id} className="document-card">
                        <div className="doc-icon">
                            {getFileIcon(doc.type)}
                        </div>
                        <div className="doc-info">
                            <h4>{doc.name}</h4>
                            <div className="doc-meta">
                                <span className="doc-size">{doc.size}</span>
                                <span className="doc-date">{doc.uploadDate}</span>
                            </div>
                            <div className="doc-details">
                                <span className="doc-category">{doc.category}</span>
                                {getStatusBadge(doc.status)}
                            </div>
                            <p className="doc-uploader">Por: {doc.uploadedBy}</p>
                        </div>
                        <div className="doc-actions">
                            <button className="doc-action-btn" title="Visualizar">
                                <Eye size={18} />
                            </button>
                            <button className="doc-action-btn" title="Download">
                                <Download size={18} />
                            </button>
                            <button className="doc-action-btn doc-delete" title="Deletar">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredDocs.length === 0 && (
                <div className="empty-state">
                    <FileText size={48} color="#a3a3a3" />
                    <p>Nenhum documento encontrado</p>
                </div>
            )}
        </div>
    );
}

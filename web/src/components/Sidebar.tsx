import {
    LayoutDashboard,
    FileText,
    Box,
    ClipboardList,
    DollarSign,
    Users,
    BarChart3,
    Settings,
    HelpCircle
} from 'lucide-react';


interface SidebarProps {
    activeSection: string;
    onSectionChange: (section: string) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
    const menuItems = [
        { id: 'dashboard', label: 'Painel de Controle', icon: LayoutDashboard },
        { id: 'documentos', label: 'Documentos', icon: FileText },
        { id: 'modelos3d', label: 'Modelos 3D', icon: Box },
        { id: 'tarefas', label: 'Tarefas', icon: ClipboardList },
        { id: 'custos', label: 'Custos', icon: DollarSign },
        { id: 'equipe', label: 'Equipe', icon: Users },
        { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
    ];

    const bottomItems = [
        { id: 'configuracoes', label: 'Configurações', icon: Settings },
        { id: 'ajuda', label: 'Ajuda & Suporte', icon: HelpCircle },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <div className="logo-icon">
                        <Box size={24} strokeWidth={2.5} />
                    </div>
                    <span className="logo-text">BIM CDE</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                <ul className="menu-list">
                    {menuItems.map(item => (
                        <li key={item.id}>
                            <button
                                className={`menu-item ${activeSection === item.id ? 'active' : ''}`}
                                onClick={() => onSectionChange(item.id)}
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>

                <ul className="menu-list menu-bottom">
                    {bottomItems.map(item => (
                        <li key={item.id}>
                            <button
                                className={`menu-item ${activeSection === item.id ? 'active' : ''}`}
                                onClick={() => onSectionChange(item.id)}
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

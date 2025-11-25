import { Bell, Settings as SettingsIcon, ChevronDown, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    userName?: string;
    userAvatar?: string;
}

export function Header({ userName = 'Usuário', userAvatar }: HeaderProps) {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [selectedProject, setSelectedProject] = useState('Projeto Edifício Alpha');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshTokenId');
        navigate('/login');
    };

    return (
        <header className="main-header">
            <div className="header-left">
                <div className="project-selector">
                    <span className="project-name">{selectedProject}</span>
                    <ChevronDown size={18} />
                </div>
            </div>

            <div className="header-right">
                <button className="icon-btn" title="Notificações">
                    <Bell size={20} />
                    <span className="notification-badge">3</span>
                </button>

                <button className="icon-btn" title="Configurações">
                    <SettingsIcon size={20} />
                </button>

                <div className="user-menu">
                    <button
                        className="user-avatar-btn"
                        onClick={() => setShowUserMenu(!showUserMenu)}
                    >
                        {userAvatar ? (
                            <img src={userAvatar} alt={userName} />
                        ) : (
                            <div className="avatar-placeholder">
                                {userName.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </button>

                    {showUserMenu && (
                        <div className="dropdown-menu">
                            <div className="dropdown-item">
                                <span>{userName}</span>
                            </div>
                            <div className="dropdown-divider" />
                            <button className="dropdown-item" onClick={handleLogout}>
                                <LogOut size={16} />
                                <span>Sair</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

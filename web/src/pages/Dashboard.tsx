import { useEffect, useState } from 'react';
import { api } from '../api';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { TeamChat } from '../components/TeamChat';
import { ProjectOverview } from '../components/ProjectOverview';
import { Users, Trash2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface User {
    id: string;
    username: string;
    name: string;
    email: string;
    level: number;
}

interface DecodedToken {
    sub: string;
}

export function Dashboard() {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [users, setUsers] = useState<User[]>([]);
    const [myId, setMyId] = useState('');
    const [myLevel, setMyLevel] = useState(0);
    const [myName, setMyName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode<DecodedToken>(token);
            setMyId(decoded.sub);
            fetchUsers();
        }
    }, []);

    useEffect(() => {
        if (users.length > 0 && myId) {
            const me = users.find(u => u.id === myId);
            if (me) {
                setMyLevel(me.level);
                setMyName(me.name);
            }
        }
    }, [users, myId]);

    async function fetchUsers() {
        try {
            const response = await api.get('/listuser');
            setUsers(response.data);
        } catch (error) {
            console.error('Failed to fetch users', error);
        }
    }

    async function handleUpdateLevel(userId: string, newLevel: number) {
        try {
            await api.patch(`/users/${userId}/level`, { level: newLevel });
            fetchUsers();
        } catch (error: any) {
            alert(error.response?.data?.message || 'Operation failed');
        }
    }

    async function handleDelete(userId: string) {
        if (!confirm('Tem certeza que deseja deletar este usuário?')) return;
        try {
            await api.delete(`/users/${userId}`);
            fetchUsers();
        } catch (error: any) {
            alert(error.response?.data?.message || 'Delete failed');
        }
    }

    function getLevelName(level: number) {
        switch (level) {
            case 1: return 'Nível 1';
            case 2: return 'Nível 2';
            case 3: return 'Nível 3';
            case 4: return 'Administrador';
            default: return `Nível ${level}`;
        }
    }

    function canPromote(targetUser: User, toLevel: number) {
        if (myLevel === 4) return true;
        if (myLevel === 3) {
            return toLevel === 3 && targetUser.level < 3;
        }
        if (myLevel === 2) {
            return toLevel === 2 && targetUser.level === 1;
        }
        return false;
    }

    function canDemote(targetUser: User) {
        return myLevel === 4;
    }

    function canDelete() {
        return myLevel === 4;
    }

    function renderContent() {
        switch (activeSection) {
            case 'dashboard':
                return <ProjectOverview />;

            case 'equipe':
                return (
                    <div className="content-section">
                        <div className="section-header">
                            <div>
                                <h1>Gestão de Equipe</h1>
                                <p className="subtitle">Gerencie os membros e permissões da equipe do projeto</p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header-row">
                                <h3>
                                    <Users size={20} />
                                    Membros da Equipe
                                </h3>
                                <span className="team-count">{users.length} membros</span>
                            </div>

                            <div className="users-table-container">
                                <table className="users-table">
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>Usuário</th>
                                            <th>E-mail</th>
                                            <th>Nível de Acesso</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(user => (
                                            <tr key={user.id}>
                                                <td>
                                                    <div className="user-name-cell">
                                                        <div className="user-avatar-small">
                                                            {user.name.charAt(0)}
                                                        </div>
                                                        <span>
                                                            {user.name}
                                                            {user.id === myId && <span className="you-badge">Você</span>}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <span className={`level-badge level-${user.level}`}>
                                                        {getLevelName(user.level)}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="action-buttons">
                                                        {canPromote(user, user.level + 1) && (
                                                            <button
                                                                className="action-btn action-promote"
                                                                onClick={() => handleUpdateLevel(user.id, user.level + 1)}
                                                                title="Promover"
                                                            >
                                                                <ArrowUpCircle size={16} />
                                                            </button>
                                                        )}

                                                        {canDemote(user) && user.level > 1 && (
                                                            <button
                                                                className="action-btn action-demote"
                                                                onClick={() => handleUpdateLevel(user.id, user.level - 1)}
                                                                title="Rebaixar"
                                                            >
                                                                <ArrowDownCircle size={16} />
                                                            </button>
                                                        )}

                                                        {canDelete() && user.id !== myId && (
                                                            <button
                                                                className="action-btn action-delete"
                                                                onClick={() => handleDelete(user.id)}
                                                                title="Deletar"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="content-section">
                        <div className="section-header">
                            <h1>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h1>
                            <p className="subtitle">Funcionalidade em desenvolvimento</p>
                        </div>
                        <div className="card">
                            <div className="empty-state">
                                <p>Esta seção está em desenvolvimento e será implementada em breve.</p>
                            </div>
                        </div>
                    </div>
                );
        }
    }

    return (
        <div className="dashboard-layout">
            <Sidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
            />

            <div className="main-content">
                <Header userName={myName} />
                <main className="content-area">
                    {renderContent()}
                </main>
            </div>

            <TeamChat />
        </div>
    );
}

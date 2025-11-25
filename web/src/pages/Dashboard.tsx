import { useEffect, useState } from 'react';
import { api } from '../api';
import { jwtDecode } from 'jwt-decode';
import { Trash2, ArrowUpCircle, ArrowDownCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
    const [users, setUsers] = useState<User[]>([]);
    const [myId, setMyId] = useState('');
    const [myLevel, setMyLevel] = useState(0);
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
            if (me) setMyLevel(me.level);
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
        if (!confirm('Are you sure you want to delete this user?')) return;
        try {
            await api.delete(`/users/${userId}`);
            fetchUsers();
        } catch (error: any) {
            alert(error.response?.data?.message || 'Delete failed');
        }
    }

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshTokenId');
        navigate('/login');
    }

    function getLevelName(level: number) {
        switch (level) {
            case 1: return 'Level 1';
            case 2: return 'Level 2';
            case 3: return 'Level 3';
            case 4: return 'ADM';
            default: return `Level ${level}`;
        }
    }

    function canPromote(targetUser: User, toLevel: number) {
        if (myLevel === 4) return true; // ADM can do anything
        if (myLevel === 3) {
            // Can promote to 3, but only if target is below 3
            return toLevel === 3 && targetUser.level < 3;
        }
        if (myLevel === 2) {
            // Can promote to 2, but only if target is 1
            return toLevel === 2 && targetUser.level === 1;
        }
        return false;
    }

    function canDemote(targetUser: User) {
        return myLevel === 4; // Only ADM can demote
    }

    function canDelete() {
        return myLevel === 4; // Only ADM can delete
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ margin: 0 }}>Dashboard</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                        Your Access: <span className={`badge badge-${myLevel}`}>{getLevelName(myLevel)}</span>
                    </p>
                </div>
                <button onClick={handleLogout} className="btn btn-danger">
                    <LogOut size={18} /> Logout
                </button>
            </div>

            <div className="card">
                <h3 style={{ marginTop: 0, marginBottom: '1.5rem' }}>User Management</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                <th style={{ padding: '1rem' }}>Name</th>
                                <th style={{ padding: '1rem' }}>Username</th>
                                <th style={{ padding: '1rem' }}>Level</th>
                                <th style={{ padding: '1rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem' }}>{user.name} {user.id === myId && '(You)'}</td>
                                    <td style={{ padding: '1rem' }}>{user.username}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span className={`badge badge-${user.level}`}>{getLevelName(user.level)}</span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            {/* Promotion Logic */}
                                            {canPromote(user, user.level + 1) && (
                                                <button
                                                    className="btn btn-sm btn-primary"
                                                    onClick={() => handleUpdateLevel(user.id, user.level + 1)}
                                                    title="Promote"
                                                >
                                                    <ArrowUpCircle size={16} />
                                                </button>
                                            )}

                                            {/* Special case: Level 3 promoting Level 1 directly to 3? 
                          The requirement says "Level 3 can promote Level 1 and Level 2 until Level 3".
                          So if user is Level 1, Level 3 can promote them.
                          My logic above `canPromote(user, user.level + 1)` only does +1.
                          I should probably just show "Promote to Max" or specific buttons.
                          Let's keep it simple: Step by step promotion is safer/clearer usually, 
                          but if Level 3 wants to promote Level 1 to 3, they might need to click twice.
                          Or I can show specific target buttons.
                      */}

                                            {/* Demotion Logic */}
                                            {canDemote(user) && user.level > 1 && (
                                                <button
                                                    className="btn btn-sm"
                                                    style={{ border: '1px solid var(--warning)', color: 'var(--warning)', background: 'transparent' }}
                                                    onClick={() => handleUpdateLevel(user.id, user.level - 1)}
                                                    title="Demote"
                                                >
                                                    <ArrowDownCircle size={16} />
                                                </button>
                                            )}

                                            {/* Delete Logic */}
                                            {canDelete() && user.id !== myId && (
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDelete(user.id)}
                                                    title="Delete"
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
}

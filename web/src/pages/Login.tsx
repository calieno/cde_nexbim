import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { Lock, User } from 'lucide-react';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        try {
            const response = await api.post('/login', { username, password });
            const { vToken, vRefreshToken } = response.data;

            localStorage.setItem('token', vToken);
            localStorage.setItem('refreshTokenId', vRefreshToken.id);

            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        }
    }

    function fillCredentials(user: string, pass: string) {
        setUsername(user);
        setPassword(pass);
        setError('');
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '2rem' }}>
            <div style={{ width: '100%', maxWidth: '1200px' }}>
                {/* Test Credentials Section */}
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                        🧪 Usuários de Teste - Clique para Preencher
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                        {/* ADM Users */}
                        <div
                            className="card"
                            onClick={() => fillCredentials('admin', 'admin123')}
                            style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', border: '2px solid #f43f5e' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 8px 16px rgba(244, 63, 94, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '';
                            }}
                        >
                            <div className="badge badge-4" style={{ marginBottom: '0.75rem' }}>ADM</div>
                            <div style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Administrator</div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                <div>👤 <strong>admin</strong></div>
                                <div>🔑 admin123</div>
                            </div>
                        </div>

                        <div
                            className="card"
                            onClick={() => fillCredentials('superadmin', 'super123')}
                            style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', border: '2px solid #f43f5e' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 8px 16px rgba(244, 63, 94, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '';
                            }}
                        >
                            <div className="badge badge-4" style={{ marginBottom: '0.75rem' }}>ADM</div>
                            <div style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Super Administrator</div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                <div>👤 <strong>superadmin</strong></div>
                                <div>🔑 super123</div>
                            </div>
                        </div>

                        {/* Level 3 Users */}
                        <div
                            className="card"
                            onClick={() => fillCredentials('manager3', 'manager3')}
                            style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', border: '2px solid #8b5cf6' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 8px 16px rgba(139, 92, 246, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '';
                            }}
                        >
                            <div className="badge badge-3" style={{ marginBottom: '0.75rem' }}>Nível 3</div>
                            <div style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Manager Level 3</div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                <div>👤 <strong>manager3</strong></div>
                                <div>🔑 manager3</div>
                            </div>
                        </div>

                        <div
                            className="card"
                            onClick={() => fillCredentials('supervisor3', 'supervisor3')}
                            style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', border: '2px solid #8b5cf6' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 8px 16px rgba(139, 92, 246, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '';
                            }}
                        >
                            <div className="badge badge-3" style={{ marginBottom: '0.75rem' }}>Nível 3</div>
                            <div style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Supervisor Level 3</div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                <div>👤 <strong>supervisor3</strong></div>
                                <div>🔑 supervisor3</div>
                            </div>
                        </div>

                        {/* Level 2 Users */}
                        <div
                            className="card"
                            onClick={() => fillCredentials('user2', 'user2')}
                            style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', border: '2px solid #0ea5e9' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 8px 16px rgba(14, 165, 233, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '';
                            }}
                        >
                            <div className="badge badge-2" style={{ marginBottom: '0.75rem' }}>Nível 2</div>
                            <div style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>User Level 2</div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                <div>👤 <strong>user2</strong></div>
                                <div>🔑 user2</div>
                            </div>
                        </div>

                        <div
                            className="card"
                            onClick={() => fillCredentials('employee2', 'employee2')}
                            style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', border: '2px solid #0ea5e9' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 8px 16px rgba(14, 165, 233, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '';
                            }}
                        >
                            <div className="badge badge-2" style={{ marginBottom: '0.75rem' }}>Nível 2</div>
                            <div style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Employee Level 2</div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                <div>👤 <strong>employee2</strong></div>
                                <div>🔑 employee2</div>
                            </div>
                        </div>

                        {/* Level 1 Users */}
                        <div
                            className="card"
                            onClick={() => fillCredentials('user1', 'user1')}
                            style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', border: '2px solid #334155' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 8px 16px rgba(51, 65, 85, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '';
                            }}
                        >
                            <div className="badge badge-1" style={{ marginBottom: '0.75rem' }}>Nível 1</div>
                            <div style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>User Level 1</div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                <div>👤 <strong>user1</strong></div>
                                <div>🔑 user1</div>
                            </div>
                        </div>

                        <div
                            className="card"
                            onClick={() => fillCredentials('guest1', 'guest1')}
                            style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', border: '2px solid #334155' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 8px 16px rgba(51, 65, 85, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '';
                            }}
                        >
                            <div className="badge badge-1" style={{ marginBottom: '0.75rem' }}>Nível 1</div>
                            <div style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Guest Level 1</div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                <div>👤 <strong>guest1</strong></div>
                                <div>🔑 guest1</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Login Form */}
                <div className="card" style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Welcome Back</h2>

                    <form onSubmit={handleLogin}>
                        <div style={{ position: 'relative', marginBottom: '1rem' }}>
                            <User size={20} style={{ position: 'absolute', top: '12px', left: '12px', color: 'var(--text-secondary)' }} />
                            <input
                                className="input"
                                style={{ paddingLeft: '2.5rem' }}
                                placeholder="Username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>

                        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                            <Lock size={20} style={{ position: 'absolute', top: '12px', left: '12px', color: 'var(--text-secondary)' }} />
                            <input
                                className="input"
                                type="password"
                                style={{ paddingLeft: '2.5rem' }}
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

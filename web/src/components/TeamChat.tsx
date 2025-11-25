import { Send, Info } from 'lucide-react';
import { useState } from 'react';

interface Message {
    id: string;
    userName: string;
    userAvatar?: string;
    message: string;
    time: string;
    isInfo?: boolean;
}

export function TeamChat() {
    const [messages] = useState<Message[]>([
        {
            id: '1',
            userName: 'João Silva',
            message: 'Pessoal, o novo arquivo IFC da estrutura foi atualizado. Por favor, verifiquem.',
            time: '10:32 AM'
        },
        {
            id: '2',
            userName: 'Você',
            message: 'Recebido. Vou dar uma olhada agora mesmo.',
            time: '10:33 AM',
            isInfo: true
        },
        {
            id: '3',
            userName: 'Maria Alves',
            message: 'Ok, notei uma pequena divergência na viga V-102. Podemos discutir isso na reunião das 14h?',
            time: '10:35 AM'
        },
        {
            id: '4',
            userName: 'João Silva',
            message: 'Combinado, Maria.',
            time: '10:36 AM'
        }
    ]);

    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            // Lógica para enviar mensagem
            setNewMessage('');
        }
    };

    return (
        <aside className="team-chat">
            <div className="chat-header">
                <h3>Comunicação de Equipe</h3>
                <span className="online-badge">Online</span>
            </div>

            <div className="chat-messages">
                {messages.map(msg => (
                    <div
                        key={msg.id}
                        className={`chat-message ${msg.isInfo ? 'message-info' : ''}`}
                    >
                        <div className="message-avatar">
                            <div className="avatar-placeholder">
                                {msg.userName.charAt(0)}
                            </div>
                        </div>
                        <div className="message-content">
                            <div className="message-header">
                                <span className="message-user">{msg.userName}</span>
                                <span className="message-time">{msg.time}</span>
                            </div>
                            <p className="message-text">{msg.message}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="chat-input">
                <input
                    type="text"
                    placeholder="Digite sua mensagem..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                    className="send-btn"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                >
                    <Send size={18} />
                </button>
            </div>
        </aside>
    );
}

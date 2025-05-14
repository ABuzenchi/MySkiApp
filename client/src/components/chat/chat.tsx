import { useState } from 'react';

function ChatBox() {
    type Message = {
  role: 'user' | 'assistant';
  text: string;
  sources?: string[];
};

  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: question }]);
    setQuestion('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/chat/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: data.answer,
          sources: data.sources || [],
        },
      ]);
    } catch (err) {
      console.error('Eroare la trimiterea întrebării:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>💬 Chat AI despre pârtii</h2>
      <div style={{ border: '1px solid #ccc', padding: 10, minHeight: 200 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: 10 }}>
            <strong>{msg.role === 'user' ? 'Tu' : 'Asistent'}:</strong>
            <p>{msg.text}</p>
            {msg.sources && msg.sources.length > 0 && (
              <small>📄 Surse: {msg.sources.join(', ')}</small>
            )}
          </div>
        ))}
      </div>

      <input
        value={question}
        onChange={e => setQuestion(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && askQuestion()}
        placeholder="Pune o întrebare..."
        style={{ width: '100%', marginTop: 10 }}
      />
      <button onClick={askQuestion} disabled={loading}>
        {loading ? 'Se răspunde...' : 'Trimite'}
      </button>
    </div>
  );
}

export default ChatBox;

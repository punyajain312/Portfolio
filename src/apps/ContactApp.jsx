import { useState } from 'react'
import { Send, CheckCircle, Mail, Zap } from 'lucide-react'
import { OWNER } from '../config/portfolio'

const INPUT = {
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border)',
  color: 'var(--text-primary)',
  borderRadius: 10,
  padding: '10px 14px',
  fontSize: 13,
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.15s, box-shadow 0.15s',
  fontFamily: 'inherit',
}

export default function ContactApp() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    setTimeout(() => { setSending(false); setSent(true) }, 1000)
  }

  function focus(e) {
    e.target.style.borderColor = 'rgba(0,255,127,0.45)'
    e.target.style.boxShadow = '0 0 12px rgba(0,255,127,0.12)'
  }
  function blur(e) {
    e.target.style.borderColor = 'var(--border)'
    e.target.style.boxShadow = 'none'
  }

  return (
    <div className="h-full overflow-y-auto p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: 'rgba(52,211,153,0.1)',
            border: '1px solid rgba(52,211,153,0.25)',
            boxShadow: '0 0 12px rgba(52,211,153,0.1)',
          }}
        >
          <Mail size={18} style={{ color: '#34d399' }} />
        </div>
        <div>
          <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
            Get in Touch
          </h2>
          <a
            href={`mailto:${OWNER.email}`}
            className="text-xs font-mono hover:underline"
            style={{ color: '#34d399' }}
          >
            {OWNER.email}
          </a>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border)' }} />

      {sent ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
          <div style={{ filter: 'drop-shadow(0 0 16px rgba(0,255,127,0.5))' }}>
            <CheckCircle size={52} style={{ color: '#00ff7f' }} />
          </div>
          <div>
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              Message received!
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
              (Demo mode — nothing was actually sent.)
            </p>
          </div>
          <button
            onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }) }}
            className="text-xs px-4 py-2 rounded-lg transition-all hover:scale-105"
            style={{
              background: 'var(--bg-elevated)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
            }}
          >
            Send another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {[
            { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
            { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
          ].map(({ name, label, type, placeholder }) => (
            <div key={name} className="flex flex-col gap-1.5">
              <label className="text-xs font-medium flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                <Zap size={9} style={{ color: 'var(--accent)' }} />
                {label}
              </label>
              <input
                name={name}
                type={type}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                required
                style={INPUT}
                onFocus={focus}
                onBlur={blur}
              />
            </div>
          ))}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
              <Zap size={9} style={{ color: 'var(--accent)' }} />
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What's on your mind?"
              required
              rows={5}
              style={{ ...INPUT, resize: 'vertical', minHeight: 100 }}
              onFocus={focus}
              onBlur={blur}
            />
          </div>

          <p className="text-[10px] font-mono" style={{ color: 'var(--text-dim)' }}>
            ⚡ Demo form — submissions are not sent anywhere.
          </p>

          <button
            type="submit"
            disabled={sending}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            style={{
              background: 'var(--accent)',
              color: '#020c04',
              boxShadow: '0 0 20px rgba(0,255,127,0.3)',
            }}
            onMouseEnter={(e) => { if (!sending) e.currentTarget.style.boxShadow = '0 0 32px rgba(0,255,127,0.5)' }}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,127,0.3)')}
          >
            {sending ? (
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send size={14} />
            )}
            {sending ? 'Sending…' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  )
}

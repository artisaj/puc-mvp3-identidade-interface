import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ApiError, api } from '../services/api'

const errorMessage = (error: unknown) => error instanceof ApiError ? error.message : 'Não foi possível concluir a solicitação. Tente novamente.'

function Notice({ error, success }: { error?: string; success?: string }) {
  return error || success ? <p className={`notice ${error ? 'error' : 'success'}`} role={error ? 'alert' : 'status'}>{error || success}</p> : null
}

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [resetToken, setResetToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [requested, setRequested] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const requestReset = async (event: FormEvent) => {
    event.preventDefault()
    setBusy(true); setError(''); setSuccess('')
    try {
      const result = await api.forgotPassword(email)
      if (result.reset_token) setResetToken(result.reset_token)
      setRequested(true)
      setSuccess('Se existir uma conta com este e-mail, as instruções foram aceitas. Em desenvolvimento, o token foi preenchido abaixo.')
    } catch (reason) { setError(errorMessage(reason)) } finally { setBusy(false) }
  }

  const reset = async (event: FormEvent) => {
    event.preventDefault()
    setError(''); setSuccess('')
    if (newPassword !== confirmation) { setError('As senhas precisam ser iguais.'); return }
    setBusy(true)
    try {
      await api.resetPassword(resetToken, newPassword)
      setSuccess('Senha redefinida. Suas sessões anteriores foram encerradas; entre novamente para continuar.')
      setNewPassword(''); setConfirmation('')
    } catch (reason) { setError(errorMessage(reason)) } finally { setBusy(false) }
  }

  return <div className="auth"><section className="intro"><Link className="brand light" to="/entrar"><span>i</span> Identidade Local</Link><div><p>Recupere o acesso</p><h1>Redefina sua senha</h1><span>Use um token temporário para proteger novamente a sua conta.</span></div><small>Por segurança, nenhuma conta é confirmada nesta etapa.</small></section><section className="auth-panel">{!requested ? <form className="card compact" onSubmit={requestReset}><h2>Solicitar token</h2><p>Informe seu e-mail. A resposta é sempre a mesma para preservar sua privacidade.</p><label>E-mail <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" /></label><Notice error={error} success={success} /><button className="primary" disabled={busy}>{busy ? 'Solicitando…' : 'Continuar'}</button><p className="footer"><Link to="/entrar">Voltar para entrar</Link></p></form> : <form className="card compact" onSubmit={reset}><h2>Escolha uma nova senha</h2><p>O token expira rapidamente e só pode ser usado uma vez.</p><label>Token de redefinição <textarea required value={resetToken} onChange={(event) => setResetToken(event.target.value)} autoComplete="off" rows={4} /></label><label>Nova senha <input required type="password" minLength={8} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} autoComplete="new-password" /></label><label>Confirmar nova senha <input required type="password" minLength={8} value={confirmation} onChange={(event) => setConfirmation(event.target.value)} autoComplete="new-password" /></label><Notice error={error} success={success} /><button className="primary" disabled={busy}>{busy ? 'Redefinindo…' : 'Redefinir senha'}</button><p className="footer"><Link to="/entrar">Voltar para entrar</Link></p></form>}</section></div>
}
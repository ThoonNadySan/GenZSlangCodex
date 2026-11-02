const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options
  })
  if (!response.ok) throw new Error(`API request failed (${response.status})`)
  return response.json()
}

export const api = {
  getDestinations: () => request('/api/destinations'),
  submitAssembly: (payload) => request('/api/challenges/assembly', { method: 'POST', body: JSON.stringify(payload) }),
  sendGuardianReply: (payload) => request('/api/castle/reply', { method: 'POST', body: JSON.stringify(payload) }),
  getLeaderboard: () => request('/api/leaderboard'),
  getProfile: () => request('/api/profile'),
  downloadCertificate: async () => {
    const response = await fetch(`${API_URL}/api/certificate`, { headers: { Accept: 'application/pdf' } })
    if (!response.ok) throw new Error(`Certificate download failed (${response.status})`)
    return response.blob()
  }
}

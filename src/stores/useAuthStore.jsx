import {create} from 'zustand'

export const useAuthStore = create((set, get) => ({
token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
user: typeof window !== 'undefined' && localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
isAuthenticated: !!(typeof window !== 'undefined' && localStorage.getItem('token')),
setAuth: (token, user) => {
if (typeof window !== 'undefined') {
localStorage.setItem('token', token)
localStorage.setItem('user', JSON.stringify(user))
}
set({ token, user, isAuthenticated: true })
},
clearAuth: () => {
if (typeof window !== 'undefined') {
localStorage.removeItem('token')
localStorage.removeItem('user')
}
set({ token: null, user: null, isAuthenticated: false })
}
}))
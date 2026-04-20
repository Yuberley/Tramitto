const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000'

export const API_ROUTES = {
  base: `${API_BASE_URL}/api/v1`,
  auth: {
    login: `${API_BASE_URL}/api/v1/auth/login`,
    register: `${API_BASE_URL}/api/v1/auth/register`,
    refresh: `${API_BASE_URL}/api/v1/auth/refresh`,
  },
  tasks: {
    list: `${API_BASE_URL}/api/v1/tasks`,
    byId: (id: string) => `${API_BASE_URL}/api/v1/tasks/${id}`,
    create: `${API_BASE_URL}/api/v1/tasks`,
  },
  users: {
    me: `${API_BASE_URL}/api/v1/users/me`,
    byId: (id: string) => `${API_BASE_URL}/api/v1/users/${id}`,
  },
} as const

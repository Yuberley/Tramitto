import { NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  CreditCard,
  Settings,
  LogOut,
  Bell,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/shared/components/ui/avatar'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { Separator } from '@/shared/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip'
import { cn } from '@/shared/lib/cn'

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/users', icon: Users, label: 'Usuarios' },
  { to: '/admin/tasks', icon: ClipboardList, label: 'Tareas' },
  { to: '/admin/payments', icon: CreditCard, label: 'Pagos' },
  { to: '/admin/settings', icon: Settings, label: 'Configuración' },
]

export function AdminLayout() {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex h-screen bg-admin-page-bg">

        {/* ── Sidebar ─────────────────────────────────────────── */}
        <aside className="flex w-64 shrink-0 flex-col bg-admin-sidebar-bg text-white">

          {/* Logo */}
          <div
            className="flex h-16 items-center gap-2.5 px-5"
            style={{ borderBottom: '1px solid var(--color-admin-sidebar-border)' }}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-admin-accent text-white text-sm font-bold">
              T
            </div>
            <span className="text-base font-semibold tracking-tight">Tramitto</span>
            <Badge
              variant="secondary"
              className="ml-auto border-0 text-[10px] px-1.5 py-0"
              style={{
                background: 'var(--color-admin-accent-subtle)',
                color: 'var(--color-admin-accent-text)',
              }}
            >
              Admin
            </Badge>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-0.5 px-3 py-4">
            {navItems.map(({ to, icon: Icon, label }) => (
              <Tooltip key={to}>
                <TooltipTrigger className="w-full">
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                        isActive
                          ? 'text-white shadow-sm bg-admin-accent'
                          : 'text-admin-sidebar-item hover:bg-admin-sidebar-item-hover-bg hover:text-admin-sidebar-item-hover-text',
                      )
                    }
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {label}
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">{label}</TooltipContent>
              </Tooltip>
            ))}
          </nav>

          <Separator style={{ background: 'var(--color-admin-sidebar-border)' }} />

          {/* User footer */}
          <div className="flex items-center gap-3 px-4 py-4">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className="text-white text-xs font-bold bg-admin-accent">
                AD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">Administrador</p>
              <p className="text-[11px] truncate text-admin-user-email">admin@tramitto.co</p>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-admin-user-email hover:text-white hover:bg-admin-sidebar-item-hover-bg"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Cerrar sesión</TooltipContent>
            </Tooltip>
          </div>
        </aside>

        {/* ── Main ────────────────────────────────────────────── */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

          {/* Header */}
          <header
            className="flex h-16 shrink-0 items-center justify-between bg-white px-4 shadow-sm sm:px-6"
            style={{ borderBottom: '1px solid var(--color-admin-header-border)' }}
          >
            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold text-admin-header-title">
                Panel de Administración
              </h1>
              <p className="text-xs text-admin-header-subtitle">Cumaral, Meta — Colombia</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-8 w-8 text-slate-500">
                    <Bell className="h-4 w-4" />
                    <span
                      className="absolute top-1 right-1 h-2 w-2 rounded-full bg-admin-accent"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Notificaciones</TooltipContent>
              </Tooltip>
              <Separator orientation="vertical" className="mx-1 h-6" />
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarFallback className="text-white text-xs font-bold bg-admin-accent">
                  AD
                </AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-auto p-4 sm:p-6">
            <Outlet />
          </main>
        </div>

      </div>
    </TooltipProvider>
  )
}

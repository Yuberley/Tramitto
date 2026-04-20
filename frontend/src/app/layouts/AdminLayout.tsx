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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/components/ui/tooltip'
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
      <div className="flex h-screen bg-slate-100">
        {/* Sidebar */}
        <aside className="flex w-64 flex-col bg-slate-900 text-slate-300">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2.5 border-b border-slate-700/60 px-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
              T
            </div>
            <span className="text-base font-semibold text-white tracking-tight">
              Tramitto
            </span>
            <Badge
              variant="secondary"
              className="ml-auto bg-blue-700/30 text-blue-300 border-0 text-[10px] px-1.5 py-0"
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
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100',
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

          <Separator className="bg-slate-700/60" />

          {/* User footer */}
          <div className="flex items-center gap-3 px-4 py-4">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-blue-700 text-white text-xs font-bold">
                AD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-200 truncate">Administrador</p>
              <p className="text-[11px] text-slate-500 truncate">admin@tramitto.co</p>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-slate-500 hover:text-slate-200 hover:bg-slate-800"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Cerrar sesión</TooltipContent>
            </Tooltip>
          </div>
        </aside>

        {/* Main */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
            <div>
              <h1 className="text-base font-semibold text-slate-800">Panel de Administración</h1>
              <p className="text-xs text-slate-400">Cumaral, Meta — Colombia</p>
            </div>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-8 w-8 text-slate-500">
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Notificaciones</TooltipContent>
              </Tooltip>
              <Separator orientation="vertical" className="h-6 mx-1" />
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarFallback className="bg-blue-700 text-white text-xs font-bold">
                  AD
                </AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}

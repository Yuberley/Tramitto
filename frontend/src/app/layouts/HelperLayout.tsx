import { NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  ClipboardList,
  Wallet,
  UserCircle,
  LogOut,
  Bell,
  Star,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/shared/components/ui/avatar'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { Separator } from '@/shared/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/components/ui/tooltip'
import { cn } from '@/shared/lib/cn'

const navItems = [
  { to: '/helper/dashboard', icon: LayoutDashboard, label: 'Mi Panel' },
  { to: '/helper/tasks', icon: ClipboardList, label: 'Mis Tareas' },
  { to: '/helper/earnings', icon: Wallet, label: 'Mis Ganancias' },
  { to: '/helper/profile', icon: UserCircle, label: 'Mi Perfil' },
]

export function HelperLayout() {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex h-screen bg-green-50">
        {/* Sidebar */}
        <aside className="flex w-64 flex-col bg-green-950 text-green-200">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2.5 border-b border-green-800/60 px-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500 text-white font-bold text-sm">
              T
            </div>
            <span className="text-base font-semibold text-white tracking-tight">
              Tramitto
            </span>
            <Badge
              variant="secondary"
              className="ml-auto bg-green-700/40 text-green-300 border-0 text-[10px] px-1.5 py-0"
            >
              Helper
            </Badge>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-0.5 px-3 py-4">
            {navItems.map(({ to, icon: Icon, label }) => (
              <Tooltip key={to}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                        isActive
                          ? 'bg-green-600 text-white shadow-sm'
                          : 'text-green-400 hover:bg-green-900 hover:text-green-100',
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

          <Separator className="bg-green-800/60" />

          {/* Reputation badge */}
          <div className="px-4 py-3">
            <div className="flex items-center gap-2 rounded-lg bg-green-900/60 px-3 py-2.5">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-green-400">HealthScore</p>
                <p className="text-sm font-bold text-white">—</p>
              </div>
              <Badge className="bg-green-600 hover:bg-green-600 text-white text-[10px] border-0">
                Activo
              </Badge>
            </div>
          </div>

          {/* User footer */}
          <div className="flex items-center gap-3 px-4 pb-4">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-green-600 text-white text-xs font-bold">
                HP
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-green-100 truncate">Helper</p>
              <p className="text-[11px] text-green-600 truncate">helper@tramitto.co</p>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-green-600 hover:text-green-200 hover:bg-green-900"
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
          <header className="flex h-16 items-center justify-between border-b border-green-100 bg-white px-6 shadow-sm">
            <div>
              <h1 className="text-base font-semibold text-green-900">Portal del Helper</h1>
              <p className="text-xs text-green-500">Cumaral, Meta — Colombia</p>
            </div>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-8 w-8 text-slate-500">
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-green-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Notificaciones</TooltipContent>
              </Tooltip>
              <Separator orientation="vertical" className="h-6 mx-1" />
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarFallback className="bg-green-600 text-white text-xs font-bold">
                  HP
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

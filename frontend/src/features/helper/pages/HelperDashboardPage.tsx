import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'
import { ClipboardList, Wallet, Star } from 'lucide-react'

const stats = [
  { label: 'Tareas completadas hoy', value: '—', icon: ClipboardList, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Ganancias del día', value: '—', icon: Wallet, color: 'text-violet-600', bg: 'bg-violet-50' },
  { label: 'Calificación promedio', value: '—', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
]

export function HelperDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Mi Panel</h2>
          <p className="text-sm text-slate-500 mt-0.5">Resumen de tu actividad</p>
        </div>
        <Badge variant="outline" className="text-slate-500">
          Disponible
        </Badge>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className="border-slate-200 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-500">
                  {label}
                </CardTitle>
                <div className={`rounded-lg p-2 ${bg}`}>
                  <Icon className={`h-4 w-4 ${color}`} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-slate-800">{value}</p>
              <p className="text-xs text-slate-400 mt-1">Sin datos aún</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

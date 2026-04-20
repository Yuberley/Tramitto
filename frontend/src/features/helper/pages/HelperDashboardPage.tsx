import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'
import { ClipboardList, Wallet, Star } from 'lucide-react'

const stats = [
  { label: 'Tareas completadas hoy', value: '—', icon: ClipboardList, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Ganancias del día', value: '—', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Calificación promedio', value: '—', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
]

export function HelperDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-green-900">Mi Panel</h2>
          <p className="text-sm text-green-600 mt-0.5">Resumen de tu actividad</p>
        </div>
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
          Disponible
        </Badge>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className="border-green-100 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-green-700">
                  {label}
                </CardTitle>
                <div className={`rounded-lg p-2 ${bg}`}>
                  <Icon className={`h-4 w-4 ${color}`} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-900">{value}</p>
              <p className="text-xs text-green-400 mt-1">Sin datos aún</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

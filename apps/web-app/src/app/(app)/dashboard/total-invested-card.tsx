import { DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function TotalInvestedCard(){
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between  space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
        Saldo investido
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">R$ 20.340,60</span>
        <p className="text-xs text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">+20%</span> de 
          variação
        </p>
      </CardContent>
    </Card>
  )
}


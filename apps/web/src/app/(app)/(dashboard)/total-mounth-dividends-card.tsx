import { PiggyBank } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function TotalMounthDividendsCard(){
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between  space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Proventos (mês)
        </CardTitle>
        <PiggyBank className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">R$ 139,37</span>
        <p className="text-xs text-muted-foreground">
          <span className="text-red-500 dark:text-red-400">-13,8%</span> de 
          variação em relação ao mês anterior
        </p>
      </CardContent>
    </Card>
  )
}


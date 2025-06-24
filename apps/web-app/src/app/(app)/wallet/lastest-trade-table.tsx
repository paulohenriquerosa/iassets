import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
import { LastestTradeTableRow } from "./lastest-trade-table-row";


export function LastestTradeTable() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
      <div className="grid flex-1 gap-1 text-center sm:text-left">
        <CardTitle className="text-base text-foreground font-semibold">Últimas movimentações</CardTitle>
        <CardDescription className="text-xs text-muted-foreground font-medium">Últimas ordens executadas</CardDescription>
      </div>
        <p className="text-xs text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">+2%</span> de
          variação em 24h
        </p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <LastestTradeTableRow />
            <LastestTradeTableRow />
            <LastestTradeTableRow />
            <LastestTradeTableRow />
            <LastestTradeTableRow />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

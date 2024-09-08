import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LastestTradeTableRow } from "./lastest-trade-table-row";
import { AssetsTableRow } from "./assets-table-row";


export function AssetsTable() {
  return (
      <div className="space-y-3">

      <div className="grid flex-1 gap-1 text-center sm:text-left">
        <h2 className="text-base text-foreground font-semibold">Ativos</h2>
        <p className="text-xs text-muted-foreground font-medium">Todos os seus ativos em carteira</p>
      </div>

      <div>
        <Card>
          <CardContent className="py-4">
            <Table>
              <TableHeader>
                <TableRow>
                <TableHead></TableHead>
                  <TableHead>
                    Produto
                  </TableHead>
                  <TableHead>
                    Preço Médio
                  </TableHead>
                  <TableHead>
                    Preço atual
                  </TableHead>
                  <TableHead>
                    Quantidade
                  </TableHead>
                  <TableHead>
                    Total
                  </TableHead>
                  <TableHead>
                    Variação
                  </TableHead>
                  <TableHead>
                    Total de dividendos
                  </TableHead>
                  <TableHead>
                    D.Y (12 meses)
                  </TableHead>
                  <TableHead>
                    P/VP
                  </TableHead>
                  <TableHead>
                    Tipo
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AssetsTableRow />
                <AssetsTableRow />
                <AssetsTableRow />
                <AssetsTableRow />
                <AssetsTableRow />
                <AssetsTableRow />
                <AssetsTableRow />
                <AssetsTableRow />
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        </div>
      </div>
  )
}

import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { TableCell, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"

export function AssetsTableRow() {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do ativo</span>
            </Button>
          </DialogTrigger>
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
      VALE3 - VALE S.A.
      </TableCell>
      <TableCell className="font-medium text-xs text-muted-foreground text-center"> R$ 63,90</TableCell>
      <TableCell className="font-medium text-xs text-muted-foreground text-center"> R$ 93,00</TableCell>
      <TableCell className="font-medium text-xs text-muted-foreground text-center"> 100 </TableCell>
      <TableCell className="font-medium text-xs text-muted-foreground text-center"> R$ 9.300,00</TableCell>
      <TableCell className="text-center">
          <span className="text-emerald-500 dark:text-emerald-400">+2%</span>
      </TableCell>
      <TableCell className="font-medium text-xs text-muted-foreground text-center"> R$ 9240,45</TableCell>
      <TableCell className="font-medium text-xs text-muted-foreground text-center"> 9,8%</TableCell>
      <TableCell className="font-medium text-xs text-muted-foreground text-center"> 1.88</TableCell>
      <TableCell className="font-medium text-xs text-muted-foreground text-center">ações</TableCell>
    </TableRow>
  )
}

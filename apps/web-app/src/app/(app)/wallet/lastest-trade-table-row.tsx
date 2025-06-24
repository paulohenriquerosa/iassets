import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { TableCell, TableRow } from "@/components/ui/table"
import { ArrowRight, Search, X } from "lucide-react"


export function LastestTradeTableRow() {
  return (
<TableRow>
      <TableCell className="font-mono text-xs font-medium">
      VALE
      </TableCell>
      <TableCell className="font-medium text-xs text-muted-foreground"> R$ 149,90</TableCell>
      <TableCell className="font-medium text-xs text-muted-foreground"> 10 </TableCell>
      <TableCell className="font-medium text-xs text-muted-foreground"> R$ 1499,00</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
          <span className="font-medium">Entrada</span>
        </div>
      </TableCell>
      <TableCell className="font-medium text-xs text-muted-foreground">12/08/2024</TableCell>
    </TableRow>
  )
}

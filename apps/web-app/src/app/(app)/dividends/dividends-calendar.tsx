'use client'

import { Calendar } from "@/components/ui/calendar"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"

export function DividendsCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-col lg:flex-row w-full gap-4">
      <div className="lg:w-auto">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border w-full"
        />
      </div>
      <div className="border rounded-lg border-border w-full overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Ativo</TableHead>
              <TableHead className="w-[100px]">Data</TableHead>
              <TableHead className="text-right w-[80px]">Valor</TableHead>
              <TableHead className="text-right w-[60px]">Qtd</TableHead>
              <TableHead className="text-right w-[80px]">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">VALE3</TableCell>
              <TableCell>10/08/2024</TableCell>
              <TableCell className="text-right">R$ 3,00</TableCell>
              <TableCell className="text-right">10</TableCell>
              <TableCell className="text-right">R$ 30,00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">VALE3</TableCell>
              <TableCell>10/08/2024</TableCell>
              <TableCell className="text-right">R$ 3,00</TableCell>
              <TableCell className="text-right">10</TableCell>
              <TableCell className="text-right">R$ 30,00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">VALE3</TableCell>
              <TableCell>10/08/2024</TableCell>
              <TableCell className="text-right">R$ 3,00</TableCell>
              <TableCell className="text-right">10</TableCell>
              <TableCell className="text-right">R$ 30,00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">VALE3</TableCell>
              <TableCell>10/08/2024</TableCell>
              <TableCell className="text-right">R$ 3,00</TableCell>
              <TableCell className="text-right">10</TableCell>
              <TableCell className="text-right">R$ 30,00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">VALE3</TableCell>
              <TableCell>10/08/2024</TableCell>
              <TableCell className="text-right">R$ 3,00</TableCell>
              <TableCell className="text-right">10</TableCell>
              <TableCell className="text-right">R$ 30,00</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right font-medium">R$ 139,90</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  )
}

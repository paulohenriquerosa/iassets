'use client'

import { Calendar } from "@/components/ui/calendar"
import { Table, TableBody, TableCell, TableFooter, TableRow } from "@/components/ui/table"
import { useState } from "react"


export function DividendsCalendar() {


const [date, setDate] = useState<Date | undefined>(new Date())

return (
    <div className="flex w-full">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg rounded-r-none border-t border-b border-l"
      />
      <div className="border rounded-lg rounded-l-none border-border w-full">
        <Table className="table-auto">
          <TableBody>
            <TableRow>
              <TableCell>
                VALE3
              </TableCell>
              <TableCell>
                10/08/2024
              </TableCell>
              <TableCell>
                R$ 3,00
              </TableCell>
              <TableCell>
                10
              </TableCell>
              <TableCell>
                R$ 30,00
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                VALE3
              </TableCell>
              <TableCell>
                10/08/2024
              </TableCell>
              <TableCell>
                R$ 3,00
              </TableCell>
              <TableCell>
                10
              </TableCell>
              <TableCell>
                R$ 30,00
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                VALE3
              </TableCell>
              <TableCell>
                10/08/2024
              </TableCell>
              <TableCell>
                R$ 3,00
              </TableCell>
              <TableCell>
                10
              </TableCell>
              <TableCell>
                R$ 30,00
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                VALE3
              </TableCell>
              <TableCell>
                10/08/2024
              </TableCell>
              <TableCell>
                R$ 3,00
              </TableCell>
              <TableCell>
                10
              </TableCell>
              <TableCell>
                R$ 30,00
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                VALE3
              </TableCell>
              <TableCell>
                10/08/2024
              </TableCell>
              <TableCell>
                R$ 3,00
              </TableCell>
              <TableCell>
                10
              </TableCell>
              <TableCell>
                R$ 30,00
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="font-medium">R$ 139,90</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  )

}

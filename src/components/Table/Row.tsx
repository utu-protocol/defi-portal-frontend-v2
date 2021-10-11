import { ReactElement } from 'react'
// import {
//   Link
// } from "react-router-dom";

export default function Row({ row, role }: { row: any, role?: string }): ReactElement {
  return (
    <tr className="relative" role={role}>
      {row.cells.map((cell: any) => {
        return (
          <td className={`${cell?.column?.highlight ? 'bg-yellow-50 border-b border-yellow-200 border-b-yellow-200' : 'text-gray-900'} px-6 py-4 max-w-xl text-sm`} {...cell.getCellProps()}>{cell.render('Cell')}</td>
        )
      })}
    </tr>
  );
}

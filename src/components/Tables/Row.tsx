import { ReactElement } from 'react'
// import {
//   Link
// } from "react-router-dom";

export default function Row({ row }: { row: any }): ReactElement {
  return (
    <tr className="relative" {...row.getRowProps()}>
      {row.cells.map((cell: any) => {
        return (
          <td className="px-6 py-4 max-w-xl" {...cell.getCellProps()}>{cell.render('Cell')}</td>
        )
      })}
    </tr>
  );
}

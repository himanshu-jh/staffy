"use client"

import styles from "@/app/page.module.css"

import {
    ColumnDef,
    // ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    // getFilteredRowModel,
    // getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { dataColumns } from '@/components/dataTable/columns';
import { Payment } from './columns';

type DataTableProps = {
  user: string;
};


export const DataTable: React.FC<DataTableProps> = ({ user }) => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [data, setData] = useState<Payment[]>([]);
    const columns = dataColumns;
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Use the fetch API for client-side data fetching
          const response = await fetch(`http://localhost:5100/api/transactions/${user}`); // Update the API endpoint
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [user]); // Empty dependency array ensures it runs only once on mount

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // onColumnFiltersChange: setColumnFilters,
    // getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
    //   columnFilters,
    },
  })

  return (
    <div className="w-full h-lvh flex glex-grow rounded-md border overflow-auto">
      <Table >
        <TableHeader className="sticky">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

"use client"

import React from "react"
import { useGetUsersQuery } from "@/state/api"
import { useAppSelector } from "@/lib/redux"
import Image from "next/image"
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid"
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils"
import Header from "@/components/globals/header"

const CustomToolbar = () => (
  <GridToolbarContainer className="toolbar flex gap-2">
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
)

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 100 },
  { field: "username", headerName: "Username", width: 150 },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 100,
    renderCell: (params) => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-9 w-9">
          <Image
            src={`/${params.value}`}
            alt={params.row.username}
            width={100}
            height={50}
            className="h-full rounded-full object-cover"
          />
        </div>
      </div>
    ),
  },
]

export default function Users() {
  const { data: users, isLoading, isError } = useGetUsersQuery()
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mb-4 h-12 w-12 animate-spin rounded-full border-4 border-solid border-t-transparent"></div>
          <p className="text-lg font-semibold">Loading users...</p>
        </div>
      </div>
    );
  }

  if (isError || !users) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-lg bg-red-100 p-6 text-center">
          <h2 className="mb-2 text-xl font-bold text-red-800">Error</h2>
          <p className="text-red-600">
            An error occurred while fetching users. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Users"/>
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={users || []}
          columns={columns}
          getRowId={(row) => row.userId}
          pagination
          slots={{
            toolbar: CustomToolbar,
          }}
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  )
}
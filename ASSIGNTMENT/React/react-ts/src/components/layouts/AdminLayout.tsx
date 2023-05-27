import React from 'react'
import Nav from '../admin/Nav'
import { Outlet } from "react-router-dom";

type Props = {}

function AdminLayout({ }: Props) {
  return (
    <div>
      {Nav()}
      <main><Outlet /></main>
    </div>

  )
}

export default AdminLayout
import React from 'react'
import Nav from '../views/Nav'
import { Outlet } from "react-router-dom";
import Footer from '../views/Footer';

type Props = {}

const BaseLayout = (props: Props) => {
  return (
    <div>
      {Nav()}
      <main><Outlet /></main>
      {Footer()}
    </div>
  )
}

export default BaseLayout
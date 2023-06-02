import React from "react";
import Header from "./Header";
import { Route } from "react-router-dom";

export default function Layout ({ children }) {
  return (
    <> 
      <Header />
      <main className="Container">{children}</main>
    </>
  );
}

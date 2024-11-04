import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
// import Middleware from "./middleware"

export const metadata: Metadata = {
  title:
    "Lawmer",
    description: "Shopify of LawFirms",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        {/* <Middleware /> */}
        <ECommerce />
      </DefaultLayout>
    </>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import Signin from "@/components/Auth/Signin";

// export const metadata: Metadata = {
//   title: "Next.js Login Page | NextAdmin - Next.js Dashboard Kit",
//   description: "This is Next.js Login Page NextAdmin Dashboard Kit",
// };

const SignIn: React.FC = () => {
  return (
    <div className="flex justify-center items-center">    

      <div className="w-[75%] lg:w-[50%] mt-[10%] rounded-[10px] bg-white shadow-1 flex flex-wrap items-center dark:bg-gray-dark dark:shadow-card">
        
          
            <div className="w-full p-4 sm:p-12.5 xl:p-15">
              <Signin />
            </div>
          

      </div>
    </div>
  );
};

export default SignIn;

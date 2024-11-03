"use client";

import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React, { useEffect, useState } from "react";

// export const metadata: Metadata = {
//   title: "Lawmer",
//   description: "Shopify of LawFirms",
// };

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // -------------------------------------------   Fetches all users   -------------------------------------------

  // useEffect(() => {
  //   fetch("http://localhost:3000/users/") // Replace with your backend endpoint
  //     .then((response) => {
  //       console.log("Response recieved: ", response);
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setData(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("There was a problem fetching the data: ", error);
  //       setError(error);
  //       setLoading(false);
  //     });
  // }, []);

  // useEffect(() => {
  //   console.log("Data fetched", data);
  // }, [data]);

  useEffect(() => {
    console.log("Fetching data...");
    // Simulate fetching data with a timeout
    setTimeout(() => {
      const sampleData = [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
      ];
      console.log("Data received:", sampleData);
      setData(sampleData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    console.log("Data state updated:", data);
  }, [data]);

  const sendSampleData = () => {
    console.log("Sending sample data...");
    const sampleData = { username: "user1", password: "user1" };

    fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sampleData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Sample data sent successfully:", data);
        // Update the state with the new data
        setData((prevData) => [...prevData, data]);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
        setError(error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <DefaultLayout>
      <button className="w-60 h-60 p-10 bg-black font-white text-4xl" onClick={sendSampleData}> Click ME</button>
      <ECommerce data={data} />
    </DefaultLayout>
  );
}
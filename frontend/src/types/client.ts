// src/types/Client.ts
export interface Client {
    id: number;
    name: string;
    fatherName: string;
    address: string;
    occupation: string;
    cast?: string;
    notes?: string;
    contactNumber: string;
    email: string;
    status: "Active" | "Inactive";
  }
  
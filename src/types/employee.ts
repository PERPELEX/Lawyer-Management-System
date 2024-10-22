// src/types/Employee.ts
export interface Employee {
    id: number;
    name: string;
    password: string;
    rank: string;
    role: "Admin" | "User";
    status: "Active" | "Inactive";
  }
  
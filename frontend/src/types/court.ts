// src/types/Court.ts
export interface Court {
    courtId: number;
    courtName: string;
    type: string;
    province: string;
    division: string;
    district: string;
    tehsil: string;
    status: "Active" | "Inactive";
  }
  
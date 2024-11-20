// src/types/Case.ts
export interface Tenant {
    tenantId: number;
    tenantName: string;
    lisenceNo: string;
    officeAdress: string;
    status: "Active" | "Inactive";
  }
  
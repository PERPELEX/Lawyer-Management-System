// src/types/Case.ts
export interface Case {
    caseId: number;
    clientName: string;
    clientId: number;
    lawyerName: string;
    lawyerId: number;
    offense: string;
    courtName: string;
    courtRoom: string;
    judge: string;
    status: "Active" | "Inactive";
    hearingDate: string;
  }
  
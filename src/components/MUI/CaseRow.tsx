import React from 'react';
import { TableRow, TableCell, Collapse, Box } from '@mui/material';
import Case from '@/types/Case';
import Link from "next/link";
import './ClientTable.css'

interface CaseRowProps {
  caseData: Case;
  visibleColumns: { [key: string]: boolean };
  expandedRow: number | null;
  handleExpandClick: (id: number) => void;
}

const CaseRow: React.FC<CaseRowProps> = ({ caseData, visibleColumns, expandedRow, handleExpandClick }) => (
  <>
    <TableRow onClick={() => handleExpandClick(caseData.caseId)} style={{ cursor: 'pointer' }}>
      {visibleColumns.clientName && <TableCell>{caseData.clientName}</TableCell>}
      {visibleColumns.lawyerName && <TableCell>{caseData.lawyerName}</TableCell>}
      {visibleColumns.offense && <TableCell>{caseData.offense}</TableCell>}
      {visibleColumns.courtName && <TableCell>{caseData.courtName}</TableCell>}
      {visibleColumns.status && <TableCell>{caseData.status}</TableCell>}
    </TableRow>
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={expandedRow === caseData.caseId} timeout="auto" unmountOnExit>
          <Box>
            <div className='py-4 flex flex-row justify-between items-start'>
              <div className='flex flex-col justify-start items-start '>
                <div><strong>Case ID:</strong> {caseData.caseId}</div>
                <div><strong>Client ID:</strong> {caseData.clientId}</div>
                <div><strong>Lawyer ID:</strong> {caseData.lawyerId}</div>
                <div><strong>Court Room:</strong> {caseData.courtRoom}</div>
                <div><strong>Judge:</strong> {caseData.judge}</div>
                <div><strong>Hearing Date:</strong> {caseData.hearingDate}</div>
              </div>
              <div className=' flex flex-row justify-center items-center'>
                <Link href="/case/addProceeding" className='flex justify-center items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-plus-circle iconIn"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                </Link>
                <Link href="/case/updateCase" className='flex justify-center items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-edit iconIn"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </Link>
                <Link href="/case/deleteCase" className='flex justify-center items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-trash-2 iconIn"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </Link>
              </div>
            </div>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  </>
);

export default CaseRow;

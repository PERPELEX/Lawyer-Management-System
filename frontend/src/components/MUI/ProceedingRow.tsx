import React from 'react';
import { TableRow, TableCell, Collapse, Box } from '@mui/material';
import Proceeding from '@/types/Proceeding';
import Link from "next/link";
import './ClientTable.css'

interface ProceedingRowProps {
  proceeding: Proceeding;
  visibleColumns: { [key: string]: boolean };
  expandedRow: number | null;
  handleExpandClick: (id: number) => void;
}

const ProceedingRow: React.FC<ProceedingRowProps> = ({ proceeding, visibleColumns, expandedRow, handleExpandClick }) => (
  <>
    <TableRow onClick={() => handleExpandClick(proceeding.proceedingId)} style={{ cursor: 'pointer' }}>
      {visibleColumns.proceedingId && <TableCell>{proceeding.proceedingId}</TableCell>}
      {visibleColumns.caseId && <TableCell>{proceeding.caseId}</TableCell>}
      {visibleColumns.date && <TableCell>{proceeding.date}</TableCell>}
      {visibleColumns.description && <TableCell>{proceeding.description}</TableCell>}
    </TableRow>
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={expandedRow === proceeding.proceedingId} timeout="auto" unmountOnExit>
          <Box>
            <div className='py-4 flex flex-row justify-between items-start'>
              <div className='flex flex-col justify-start items-start '>
                <div><strong>Proceeding ID:</strong> {proceeding.proceedingId}</div>
                <div><strong>Case ID:</strong> {proceeding.caseId}</div>
                <div><strong>Date:</strong> {proceeding.date}</div>
                <div><strong>Description:</strong> {proceeding.description}</div>
              </div>
              <div className=' flex flex-row justify-center items-center'>
                <Link href="/proceeding/updateProceeding" className='flex justify-center items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit iconIn"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </Link>
                <Link href="/proceeding/deleteProceeding" className='flex justify-center items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2 iconIn"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </Link>
              </div>
            </div>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  </>
);

export default ProceedingRow;
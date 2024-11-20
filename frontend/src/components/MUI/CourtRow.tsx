// CourtRow.tsx
import React from 'react';
import { TableRow, TableCell, Collapse, Box } from '@mui/material';
import { Court } from '@/types/Court';
import Link from "next/link";
import './ClientTable.css'

interface CourtRowProps {
  court: Court;
  visibleColumns: { [key: string]: boolean };
  expandedRow: number | null;
  handleExpandClick: (id: number) => void;
}

const CourtRow: React.FC<CourtRowProps> = ({ court, visibleColumns, expandedRow, handleExpandClick }) => (
  <>
    <TableRow onClick={() => handleExpandClick(court.courtId)} style={{ cursor: 'pointer' }}>
      {visibleColumns.courtName && <TableCell>{court.courtName}</TableCell>}
      {visibleColumns.type && <TableCell>{court.type}</TableCell>}
      {visibleColumns.province && <TableCell>{court.province}</TableCell>}
      {visibleColumns.division && <TableCell>{court.division}</TableCell>}
      {visibleColumns.district && <TableCell>{court.district}</TableCell>}
      {visibleColumns.tehsil && <TableCell>{court.tehsil}</TableCell>}
      {visibleColumns.status && <TableCell>{court.status}</TableCell>}
    </TableRow>
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
        <Collapse in={expandedRow === court.courtId} timeout="auto" unmountOnExit>
          <Box>
            <div className='py-4 flex flex-row justify-between items-start'>
              <div className='flex flex-col justify-start items-start '>
                <div><strong>ID:</strong> {court.courtId}</div>
                <div><strong>Name:</strong> {court.courtName}</div>
                <div><strong>Type:</strong> {court.type}</div>
                <div><strong>Province:</strong> {court.province}</div>
                <div><strong>Division:</strong> {court.division}</div>
                <div><strong>District:</strong> {court.district}</div>
                <div><strong>Tehsil:</strong> {court.tehsil}</div>
                <div><strong>Status:</strong> {court.status}</div>
              </div>
              <div className=' flex flex-row justify-center items-center'>
                <Link href="/court/deleteCourt" className='flex justify-center items-center'>
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

export default CourtRow;
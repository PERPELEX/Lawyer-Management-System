import React, { useState, useEffect } from 'react';
import { TableRow, TableCell, Collapse, Box, Button } from '@mui/material';
import { Case } from '@/types/Case';
import Link from "next/link";
import './ClientTable.css';

interface CaseRowProps {
  caseData: Case;
  visibleColumns: { [key: string]: boolean };
  expandedRow: number | null;
  handleExpandClick: (id: number) => void;
}

interface Proceeding {
  proceedingId: number;
  caseId: number;
  date: string;
  description: string;
}

// Sample proceedings data
const sampleProceedings: Proceeding[] = [
  {
    proceedingId: 1,
    caseId: 1,
    date: '2025-10-01',
    description: 'Initial hearing',
  },
  {
    proceedingId: 2,
    caseId: 1,
    date: '2025-10-15',
    description: 'Witness testimony',
  },
  {
    proceedingId: 3,
    caseId: 1,
    date: '2025-10-15',
    description: 'Witness testimony',
  },
  {
    proceedingId: 4,
    caseId: 1,
    date: '2025-10-15',
    description: 'Witness testimony',
  },
  {
    proceedingId: 5,
    caseId: 1,
    date: '2023-11-01',
    description: 'Evidence presentation',
  },
  {
    proceedingId: 6,
    caseId: 2,
    date: '2023-11-01',
    description: 'Evidence presentation',
  },
  {
    proceedingId: 7,
    caseId: 2,
    date: '2023-11-01',
    description: 'Evidence presentation',
  },
];

const CaseRow: React.FC<CaseRowProps> = ({ caseData, visibleColumns, expandedRow, handleExpandClick }) => {
  const [proceedings, setProceedings] = useState<Proceeding[]>([]);

  useEffect(() => {
    if (expandedRow === caseData.caseId) {
      // Use sample data instead of fetching
      const caseProceedings = sampleProceedings.filter(p => p.caseId === caseData.caseId);
      const futureProceedings = caseProceedings.filter(p => new Date(p.date) > new Date());
      setProceedings(futureProceedings);
    }
  }, [expandedRow, caseData.caseId]);

  const displayedProceedings = proceedings.slice(0, 3);

  return (
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
                  <Link href="/proceeding/addProceeding" className='flex justify-center items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle iconIn"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                  </Link>
                  <Link href="/case/updateCase" className='flex justify-center items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit iconIn"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  </Link>
                  <Link href="/case/deleteCase" className='flex justify-center items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2 iconIn"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                  </Link>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Proceedings:</h4>
                {proceedings.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {displayedProceedings.map((proceeding) => (
                      <div
                        key={proceeding.proceedingId}
                        className="bg-blue-300 p-4 rounded-lg shadow-md mb-6 flex flex-col"
                      >
                        <div className='flex flex-row w-[100%] justify-between mb-4'>
                          <h4 className='font-bold text-lg'>Proceeding {proceeding.proceedingId}</h4>
                          <div className='flex flex-row'>
                            <Link href="/proceeding/updateProceeding" className='flex justify-center items-center'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit iconInIn"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            </Link>
                            <Link href="/case/deleteCase" className='flex justify-center items-center'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2 iconInIn"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                            </Link>
                          </div>
                        </div>
                        <div>
                          <p><strong>Date:</strong> {proceeding.date}</p>
                          <p><strong>Description:</strong> {proceeding.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No proceedings available for this case.</p>
                )}
                {proceedings.length > 3 && (
                  <div className='mb-8 w-[100%] flex justify-end '>
                    <Link href={{
                      pathname: "/proceeding/allProceeding",
                      query: { proceedings: JSON.stringify(proceedings) }
                    }}>
                      <button className='mr-4 bg-[#5750F1] px-4 py-2 rounded-lg text-white text-lg transition-all ease-in-out duration-200 hover:bg-[#1d18aa]'>
                        View All
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CaseRow;
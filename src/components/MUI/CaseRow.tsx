import React from 'react';
import { TableRow, TableCell, Collapse, Box } from '@mui/material';
import Case from '@/types/Case';

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
            <div className='py-4'>
              <div><strong>Case ID:</strong> {caseData.caseId}</div>
              <div><strong>Client ID:</strong> {caseData.clientId}</div>
              <div><strong>Lawyer ID:</strong> {caseData.lawyerId}</div>
              <div><strong>Court Room:</strong> {caseData.courtRoom}</div>
              <div><strong>Judge:</strong> {caseData.judge}</div>
              <div><strong>Hearing Date:</strong> {caseData.hearingDate}</div>
            </div>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  </>
);

export default CaseRow;

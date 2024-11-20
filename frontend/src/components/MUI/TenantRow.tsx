// TenantRow.tsx
import React from 'react';
import { TableRow, TableCell, Collapse, Box } from '@mui/material';
import { Tenant } from '@/types/Tenant';
import Link from "next/link";
import './ClientTable.css'

interface TenantRowProps {
  tenant: Tenant;
  visibleColumns: { [key: string]: boolean };
  expandedRow: number | null;
  handleExpandClick: (id: number) => void;
}

const TenantRow: React.FC<TenantRowProps> = ({ tenant, visibleColumns, expandedRow, handleExpandClick }) => (
  <>
    <TableRow onClick={() => handleExpandClick(tenant.tenantId)} style={{ cursor: 'pointer' }}>
      {visibleColumns.tenantName && <TableCell>{tenant.tenantName}</TableCell>}
      {visibleColumns.lisenceNo && <TableCell>{tenant.lisenceNo}</TableCell>}
      {visibleColumns.officeAdress && <TableCell>{tenant.officeAdress}</TableCell>}
      {visibleColumns.status && <TableCell>{tenant.status}</TableCell>}
    </TableRow>
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={expandedRow === tenant.tenantId} timeout="auto" unmountOnExit>
          <Box>
            <div className='py-4 flex flex-row justify-between items-start'>
              <div className='flex flex-col justify-start items-start '>
                <div><strong>ID:</strong> {tenant.tenantId}</div>
                <div><strong>Name:</strong> {tenant.tenantName}</div>
                <div><strong>License No:</strong> {tenant.lisenceNo}</div>
                <div><strong>Office Address:</strong> {tenant.officeAdress}</div>
                <div><strong>Status:</strong> {tenant.status}</div>
              </div>
              <div className=' flex flex-row justify-center items-center'>
                <Link href="/tenant/deleteTenant" className='flex justify-center items-center'>
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

export default TenantRow;
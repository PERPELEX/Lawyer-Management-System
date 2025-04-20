// ClientRow.tsx
import React from 'react';
import { TableRow, TableCell, Collapse, Box } from '@mui/material';
import Client from '@/types/Client';
import Link from "next/link";
import './ClientTable.css'

interface ClientRowProps {
  client: Client;
  visibleColumns: { [key: string]: boolean };
  expandedRow: number | null;
  handleExpandClick: (id: number) => void;
}

const ClientRow: React.FC<ClientRowProps> = ({ client, visibleColumns, expandedRow, handleExpandClick }) => (
  <>
    <TableRow onClick={() => handleExpandClick(client.id)} style={{ cursor: 'pointer' }}>
      {visibleColumns.name && <TableCell>{client.name}</TableCell>}
      {visibleColumns.fatherName && <TableCell>{client.fatherName}</TableCell>}
      {visibleColumns.contactNumber && <TableCell>{client.contactNumber}</TableCell>}
      {visibleColumns.email && <TableCell>{client.email}</TableCell>}
      {visibleColumns.status && <TableCell>{client.status}</TableCell>}
    </TableRow>
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={expandedRow === client.id} timeout="auto" unmountOnExit>
          <Box >
            <div className='py-4 flex flex-row justify-between items-start'>
              <div className='flex flex-col justify-start items-start '>
                <div><strong>ID:</strong> {client.id}</div>
                <div><strong>Address:</strong> {client.address}</div>
                <div><strong>Occupation:</strong> {client.occupation}</div>
                {client.cast && <div><strong>Cast:</strong> {client.cast}</div>}
                {client.notes && <div><strong>Notes:</strong> {client.notes}</div>}
              </div>
              <div className=' flex flex-row justify-center items-center'>
                <Link href="/client/updateClient" className='flex justify-center items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit iconIn"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </Link>
                <Link href="/client/deleteClient" className='flex justify-center items-center'>
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

export default ClientRow;

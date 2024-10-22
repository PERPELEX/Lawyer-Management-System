// ClientRow.tsx
import React from 'react';
import { TableRow, TableCell, Collapse, Box } from '@mui/material';
import Client from '@/types/Client';

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
            <div className='py-4'>
              <div><strong>ID:</strong> {client.id}</div>
              <div><strong>Address:</strong> {client.address}</div>
              <div><strong>Occupation:</strong> {client.occupation}</div>
              {client.cast && <div><strong>Cast:</strong> {client.cast}</div>}
              {client.notes && <div><strong>Notes:</strong> {client.notes}</div>}
            </div>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  </>
);

export default ClientRow;

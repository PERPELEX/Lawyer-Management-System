import React from 'react';
import { TableRow, TableCell, Collapse, Box } from '@mui/material';
import { Employee } from '@/types/Employee'; // Import Employee type

interface EmployeeRowProps {
  employeeData: Employee;
  visibleColumns: { [key: string]: boolean };
  expandedRow: number | null;
  handleExpandClick: (id: number) => void;
}

const EmployeeRow: React.FC<EmployeeRowProps> = ({ employeeData, visibleColumns, expandedRow, handleExpandClick }) => (
  <>
    <TableRow onClick={() => handleExpandClick(employeeData.id)} style={{ cursor: 'pointer' }}>
      {visibleColumns.id && <TableCell>{employeeData.id}</TableCell>}
      {visibleColumns.name && <TableCell>{employeeData.name}</TableCell>}
      {visibleColumns.rank && <TableCell>{employeeData.rank}</TableCell>}
      {visibleColumns.role && <TableCell>{employeeData.role}</TableCell>}
      {visibleColumns.status && <TableCell>{employeeData.status}</TableCell>}
    </TableRow>
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={expandedRow === employeeData.id} timeout="auto" unmountOnExit>
          <Box>
            <div className="py-4">
              <div><strong>Employee ID:</strong> {employeeData.id}</div>
              <div><strong>Name:</strong> {employeeData.name}</div>
              <div><strong>Rank:</strong> {employeeData.rank}</div>
              <div><strong>Role:</strong> {employeeData.role}</div>
              <div><strong>Status:</strong> {employeeData.status}</div>
              <div><strong>Password:</strong> {employeeData.password}</div> {/* Note: Sensitive data */}
            </div>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  </>
);

export default EmployeeRow;

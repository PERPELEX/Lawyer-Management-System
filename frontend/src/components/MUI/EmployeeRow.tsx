import React from 'react';
import { TableRow, TableCell, Collapse, Box } from '@mui/material';
import { Employee } from '@/types/Employee'; // Import Employee type
import Link from "next/link";
import './ClientTable.css'

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
            <div className='py-4 flex flex-row justify-between items-start'>
              <div className='flex flex-col justify-start items-start '>
                <div><strong>Employee ID:</strong> {employeeData.id}</div>
                <div><strong>Name:</strong> {employeeData.name}</div>
                <div><strong>Rank:</strong> {employeeData.rank}</div>
                <div><strong>Role:</strong> {employeeData.role}</div>
                <div><strong>Status:</strong> {employeeData.status}</div>
                <div><strong>Password:</strong> {employeeData.password}</div> {/* Note: Sensitive data */}
              </div>
              <div className=' flex flex-row justify-center items-center'>
                <Link href="/employee/updateEmployee" className='flex justify-center items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-edit iconIn"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </Link>
                <Link href="/employee/deleteEmployee" className='flex justify-center items-center'>
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

export default EmployeeRow;

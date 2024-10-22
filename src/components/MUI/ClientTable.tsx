"use client";

// ClientTable.tsx
import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Toolbar, TableSortLabel
} from '@mui/material';
import Client from '@/types/Client';
import SearchBar from './SearchTable';
import FilterMenu from './FilterMenu';
import ColumnVisibilityMenu from './ColumnVisibilityMenu';
import ClientRow from './ClientRow';

const ClientTable: React.FC = () => {
  const initialClients: Client[] = [
    {
      id: 1,
      name: "Arslan Ahmed",
      fatherName: "Khalid Ahmed",
      address: "15 Shalimar Bagh, Lahore",
      occupation: "Software Engineer",
      cast: "Ahmed",
      notes: "Prefers weekend meetings",
      contactNumber: "0300-1234567",
      email: "arslan.ahmed@example.com",
      status: "Active"
    },
    {
      id: 2,
      name: "Fatima Hassan",
      fatherName: "Usman Hassan",
      address: "78 Clifton, Karachi",
      occupation: "Teacher",
      contactNumber: "0321-6543210",
      email: "fatima.hassan@example.com",
      status: "Inactive"
    },
    {
      id: 3,
      name: "Bilal Siddiqui",
      fatherName: "Tahir Siddiqui",
      address: "12 F-10, Islamabad",
      occupation: "Businessman",
      cast: "Siddiqui",
      notes: "Frequent overseas travel",
      contactNumber: "0333-9876543",
      email: "bilal.siddiqui@example.com",
      status: "Active"
    },
    {
      id: 4,
      name: "Sara Khan",
      fatherName: "Imran Khan",
      address: "22 G-11, Islamabad",
      occupation: "Doctor",
      cast: "Khan",
      contactNumber: "0345-9871234",
      email: "sara.khan@example.com",
      status: "Inactive"
    },
    {
      id: 5,
      name: "Yasir Qureshi",
      fatherName: "Zafar Qureshi",
      address: "34 Gulberg, Lahore",
      occupation: "Lawyer",
      notes: "Prefers in-person meetings",
      contactNumber: "0301-5678901",
      email: "yasir.qureshi@example.com",
      status: "Active"
    },
    {
      id: 6,
      name: "Ayesha Iqbal",
      fatherName: "Raza Iqbal",
      address: "45 Iqbal Town, Lahore",
      occupation: "Graphic Designer",
      contactNumber: "0312-8765432",
      email: "ayesha.iqbal@example.com",
      status: "Active"
    },
    {
      id: 7,
      name: "Zain Raza",
      fatherName: "Tariq Raza",
      address: "12 Blue Area, Islamabad",
      occupation: "Architect",
      contactNumber: "0320-1234321",
      email: "zain.raza@example.com",
      status: "Inactive"
    },
    {
      id: 8,
      name: "Mariam Ali",
      fatherName: "Hassan Ali",
      address: "20 DHA, Karachi",
      occupation: "Financial Analyst",
      cast: "Ali",
      notes: "Prefers early morning meetings",
      contactNumber: "0340-9876542",
      email: "mariam.ali@example.com",
      status: "Active"
    },
    {
      id: 9,
      name: "Omar Farooq",
      fatherName: "Akram Farooq",
      address: "67 University Town, Peshawar",
      occupation: "Lecturer",
      cast: "Farooq",
      contactNumber: "0305-1239876",
      email: "omar.farooq@example.com",
      status: "Active"
    },
    {
      id: 10,
      name: "Nadia Sheikh",
      fatherName: "Mohammad Sheikh",
      address: "11 Bahria Town, Rawalpindi",
      occupation: "Accountant",
      contactNumber: "0311-5674321",
      email: "nadia.sheikh@example.com",
      status: "Inactive"
    },
    {
      id: 11,
      name: "Omar Farooq",
      fatherName: "Akram Farooq",
      address: "67 University Town, Peshawar",
      occupation: "Lecturer",
      cast: "Farooq",
      contactNumber: "0305-1239876",
      email: "omar.farooq@example.com",
      status: "Active"
    },
    {
      id: 12,
      name: "Nadia Sheikh",
      fatherName: "Mohammad Sheikh",
      address: "11 Bahria Town, Rawalpindi",
      occupation: "Accountant",
      contactNumber: "0311-5674321",
      email: "nadia.sheikh@example.com",
      status: "Inactive"
    },
  ];

  const [clients, setClients] = useState<Client[]>(initialClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Client, direction: 'asc' | 'desc' } | null>(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [showAnchorEl, setShowAnchorEl] = useState<null | HTMLElement>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    fatherName: true,
    contactNumber: true,
    email: true,
    status: true
  });
  const [filters, setFilters] = useState({ active: true, inactive: true });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSort = (key: keyof Client) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedClients = sortConfig
    ? [...clients].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    })
    : clients;

  const filteredClients = sortedClients.filter(
    (client) =>
      (client.name.toLowerCase().includes(searchTerm) ||
        client.fatherName.toLowerCase().includes(searchTerm) ||
        client.contactNumber.includes(searchTerm) ||
        client.email.toLowerCase().includes(searchTerm) ||
        client.status.toLowerCase().includes(searchTerm) ||
        client.address.toLowerCase().includes(searchTerm) ||
        client.occupation.toLowerCase().includes(searchTerm) ||
        (client.cast && client.cast.toLowerCase().includes(searchTerm)) ||
        (client.notes && client.notes.toLowerCase().includes(searchTerm))) &&
      ((filters.active && client.status === 'Active') || (filters.inactive && client.status === 'Inactive'))
  );

  const handleExpandClick = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <Paper sx={{ borderRadius: '22px' }}>
      <Toolbar className='bg-[#5750F1] rounded-t-xl'>
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        <div className='ml-auto flex justify-between w-[12%]'>
          <FilterMenu
            anchorEl={filterAnchorEl}
            filters={filters}
            handleFilterClick={(e) => setFilterAnchorEl(e.currentTarget)}
            handleFilterClose={() => setFilterAnchorEl(null)}
            toggleFilter={(filter) =>
              setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }))
            }
          />
          <ColumnVisibilityMenu
            anchorEl={showAnchorEl}
            visibleColumns={visibleColumns}
            handleShowClick={(e) => setShowAnchorEl(e.currentTarget)}
            handleShowClose={() => setShowAnchorEl(null)}
            toggleColumnVisibility={(column) =>
              setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }))
            }
          />
        </div>
      </Toolbar>

      <TableContainer component={Paper} sx={{ maxHeight: 500, overflow: 'auto', '&::-webkit-scrollbar': { display: 'none' }, '-ms-overflow-style': 'none', 'scrollbar-width': 'none' }}>
        <Table stickyHeader>
        <TableHead sx={{ backgroundColor: 'blue' }}>
            <TableRow sx={{ backgroundColor: 'blue' }}>
              {visibleColumns.name && (
                <TableCell sx={{ fontSize: '1.15rem', fontWeight: "550", color: "#666" }}>
                  <TableSortLabel
                    active={sortConfig?.key === 'name'}
                    direction={sortConfig?.direction || 'asc'}
                    onClick={() => handleSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
              )}
              {visibleColumns.fatherName && (
                <TableCell sx={{ fontSize: '1.15rem', fontWeight: "550", color: "#666" }}>
                  <TableSortLabel
                    active={sortConfig?.key === 'fatherName'}
                    direction={sortConfig?.direction || 'asc'}
                    onClick={() => handleSort('fatherName')}
                  >
                    Father Name
                  </TableSortLabel>
                </TableCell>
              )}
              {visibleColumns.contactNumber && (
                <TableCell sx={{ fontSize: '1.15rem', fontWeight: "550", color: "#666" }}>
                  <TableSortLabel
                    active={sortConfig?.key === 'contactNumber'}
                    direction={sortConfig?.direction || 'asc'}
                    onClick={() => handleSort('contactNumber')}
                  >
                    Contact Number
                  </TableSortLabel>
                </TableCell>
              )}
              {visibleColumns.email && (
                <TableCell sx={{ fontSize: '1.15rem', fontWeight: "550", color: "#666" }}>
                  <TableSortLabel
                    active={sortConfig?.key === 'email'}
                    direction={sortConfig?.direction || 'asc'}
                    onClick={() => handleSort('email')}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
              )}
              {visibleColumns.status && (
                <TableCell sx={{ fontSize: '1.15rem', fontWeight: "550", color: "#666" }}>
                  <TableSortLabel
                    active={sortConfig?.key === 'status'}
                    direction={sortConfig?.direction || 'asc'}
                    onClick={() => handleSort('status')}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClients.map((client) => (
              <ClientRow
                key={client.id}
                client={client}
                visibleColumns={visibleColumns}
                expandedRow={expandedRow}
                handleExpandClick={handleExpandClick}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ClientTable;

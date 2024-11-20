"use client";

// TenantTable.tsx
import React, { useState } from 'react';
import Link from "next/link";
import './ClientTable.css'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Toolbar, TableSortLabel
} from '@mui/material';
import { Tenant } from '@/types/Tenant';
import SearchBar from './SearchTable';
import ColumnVisibilityMenu from './ColumnVisibilityMenu';
import TenantRow from './TenantRow';

const TenantTable: React.FC = () => {
  const initialTenants: Tenant[] = [
    {
      tenantId: 1,
      tenantName: "Arslan Ahmed",
      lisenceNo: "L123456",
      officeAdress: "15 Shalimar Bagh, Lahore",
      status: "Active"
    },
    {
      tenantId: 2,
      tenantName: "Fatima Hassan",
      lisenceNo: "L654321",
      officeAdress: "78 Clifton, Karachi",
      status: "Inactive"
    },
    {
      tenantId: 3,
      tenantName: "Bilal Siddiqui",
      lisenceNo: "L987654",
      officeAdress: "12 F-10, Islamabad",
      status: "Active"
    },
    {
      tenantId: 4,
      tenantName: "Sara Khan",
      lisenceNo: "L321987",
      officeAdress: "22 G-11, Islamabad",
      status: "Inactive"
    },
    {
      tenantId: 5,
      tenantName: "Yasir Qureshi",
      lisenceNo: "L567890",
      officeAdress: "34 Gulberg, Lahore",
      status: "Active"
    },
    {
      tenantId: 6,
      tenantName: "Ayesha Iqbal",
      lisenceNo: "L876543",
      officeAdress: "45 Iqbal Town, Lahore",
      status: "Active"
    },
    {
      tenantId: 7,
      tenantName: "Zain Raza",
      lisenceNo: "L123432",
      officeAdress: "12 Blue Area, Islamabad",
      status: "Inactive"
    },
    {
      tenantId: 8,
      tenantName: "Mariam Ali",
      lisenceNo: "L987654",
      officeAdress: "20 DHA, Karachi",
      status: "Active"
    },
    {
      tenantId: 9,
      tenantName: "Omar Farooq",
      lisenceNo: "L123987",
      officeAdress: "67 University Town, Peshawar",
      status: "Active"
    },
    {
      tenantId: 10,
      tenantName: "Nadia Sheikh",
      lisenceNo: "L567432",
      officeAdress: "11 Bahria Town, Rawalpindi",
      status: "Inactive"
    },
  ];

  const [tenants, setTenants] = useState<Tenant[]>(initialTenants);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Tenant, direction: 'asc' | 'desc' } | null>(null);
  const [showAnchorEl, setShowAnchorEl] = useState<null | HTMLElement>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [visibleColumns, setVisibleColumns] = useState({
    tenantName: true,
    lisenceNo: true,
    officeAdress: true,
    status: true
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSort = (key: keyof Tenant) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedTenants = sortConfig
    ? [...tenants].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    })
    : tenants;

  const filteredTenants = sortedTenants.filter(
    (tenant) =>
      tenant.tenantName.toLowerCase().includes(searchTerm) ||
      tenant.lisenceNo.toLowerCase().includes(searchTerm) ||
      tenant.officeAdress.toLowerCase().includes(searchTerm) ||
      tenant.status.toLowerCase().includes(searchTerm)
  );

  const handleExpandClick = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <Paper sx={{ borderRadius: '22px' }}>
      <Toolbar className='bg-[#5750F1] rounded-t-xl flex flex-wrap'>
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        <div className='ml-auto mr-4 flex justify-between w-full sm:w-auto'>

          <Link href="/root/tenant/addTenant" className='flex justify-center items-center'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-user-plus icon" // Added class here
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
          </Link>

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

      <TableContainer component={Paper} className="table-container">
        <div className="overflow-x-auto">
          <Table stickyHeader>
            <TableHead sx={{ backgroundColor: 'blue' }}>
              <TableRow sx={{ backgroundColor: 'blue' }}>
                {visibleColumns.tenantName && (
                  <TableCell sx={{ fontSize: '1.15rem', fontWeight: "550", color: "#666" }}>
                    <TableSortLabel
                      active={sortConfig?.key === 'tenantName'}
                      direction={sortConfig?.direction || 'asc'}
                      onClick={() => handleSort('tenantName')}
                    >
                      Tenant Name
                    </TableSortLabel>
                  </TableCell>
                )}
                {visibleColumns.lisenceNo && (
                  <TableCell sx={{ fontSize: '1.15rem', fontWeight: "550", color: "#666" }}>
                    <TableSortLabel
                      active={sortConfig?.key === 'lisenceNo'}
                      direction={sortConfig?.direction || 'asc'}
                      onClick={() => handleSort('lisenceNo')}
                    >
                      License No
                    </TableSortLabel>
                  </TableCell>
                )}
                {visibleColumns.officeAdress && (
                  <TableCell sx={{ fontSize: '1.15rem', fontWeight: "550", color: "#666" }}>
                    <TableSortLabel
                      active={sortConfig?.key === 'officeAdress'}
                      direction={sortConfig?.direction || 'asc'}
                      onClick={() => handleSort('officeAdress')}
                    >
                      Office Address
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
              {filteredTenants.map((tenant) => (
                <TenantRow
                  key={tenant.tenantId}
                  tenant={tenant}
                  visibleColumns={visibleColumns}
                  expandedRow={expandedRow}
                  handleExpandClick={handleExpandClick}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </TableContainer>
    </Paper>
  );
};

export default TenantTable;
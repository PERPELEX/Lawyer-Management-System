"use client";

// CourtTable.tsx
import React, { useState } from 'react';
import Link from "next/link";
import './ClientTable.css'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Toolbar, TableSortLabel
} from '@mui/material';
import { Court } from '@/types/Court';
import SearchBar from './SearchTable';
import ColumnVisibilityMenu from './ColumnVisibilityMenu';
import CourtRow from './CourtRow';

const CourtTable: React.FC = () => {
  const initialCourts: Court[] = [
    {
      courtId: 1,
      courtName: "Supreme Court",
      type: "Federal",
      province: "Islamabad",
      division: "Capital",
      district: "Islamabad",
      tehsil: "Islamabad",
      status: "Active"
    },
    {
      courtId: 2,
      courtName: "High Court",
      type: "Provincial",
      province: "Punjab",
      division: "Lahore",
      district: "Lahore",
      tehsil: "Lahore",
      status: "Inactive"
    },
    {
      courtId: 3,
      courtName: "District Court",
      type: "District",
      province: "Sindh",
      division: "Karachi",
      district: "Karachi",
      tehsil: "Karachi",
      status: "Active"
    },
    {
      courtId: 4,
      courtName: "Civil Court",
      type: "Civil",
      province: "Khyber Pakhtunkhwa",
      division: "Peshawar",
      district: "Peshawar",
      tehsil: "Peshawar",
      status: "Inactive"
    },
    {
      courtId: 5,
      courtName: "Family Court",
      type: "Family",
      province: "Balochistan",
      division: "Quetta",
      district: "Quetta",
      tehsil: "Quetta",
      status: "Active"
    },
  ];

  const [courts, setCourts] = useState<Court[]>(initialCourts);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Court, direction: 'asc' | 'desc' } | null>(null);
  const [showAnchorEl, setShowAnchorEl] = useState<null | HTMLElement>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [visibleColumns, setVisibleColumns] = useState({
    courtName: true,
    type: true,
    province: true,
    division: true,
    district: true,
    tehsil: true,
    status: true
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSort = (key: keyof Court) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedCourts = sortConfig
    ? [...courts].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    })
    : courts;

  const filteredCourts = sortedCourts.filter(
    (court) =>
      court.courtName.toLowerCase().includes(searchTerm) ||
      court.type.toLowerCase().includes(searchTerm) ||
      court.province.toLowerCase().includes(searchTerm) ||
      court.division.toLowerCase().includes(searchTerm) ||
      court.district.toLowerCase().includes(searchTerm) ||
      court.tehsil.toLowerCase().includes(searchTerm) ||
      court.status.toLowerCase().includes(searchTerm)
  );

  const handleExpandClick = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <Paper sx={{ borderRadius: '22px' }}>
      <Toolbar className='bg-[#5750F1] rounded-t-xl flex flex-wrap'>
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        <div className='ml-auto mr-4 flex justify-between w-full sm:w-auto'>

          <Link href="/root/court/addCourt" className='flex justify-center items-center'>
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
              className="feather feather-plus-circle icon" // Added class here
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
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
                {visibleColumns.courtName && (
                  <TableCell sx={{ fontSize: '1.15rem', fontWeight: "550", color: "#666" }}>
                    <TableSortLabel
                      active={sortConfig?.key === 'courtName'}
                      direction={sortConfig?.direction || 'asc'}
                      onClick={() => handleSort('courtName')}
                    >
                      Court Name
                    </TableSortLabel>
                  </TableCell>
                )}
                {visibleColumns.type && (
                  <TableCell sx={{ fontSize: '1.15rem', fontWeight: "550", color: "#666" }}>
                    <TableSortLabel
                      active={sortConfig?.key === 'type'}
                      direction={sortConfig?.direction || 'asc'}
                      onClick={() => handleSort('type')}
                    >
                      Type
                    </TableSortLabel>
                  </TableCell>
                )}
                {visibleColumns.province && (
                  <TableCell sx={{ fontSize: '1.15rem', fontWeight: "550", color: "#666" }}>
                    <TableSortLabel
                      active={sortConfig?.key === 'province'}
                      direction={sortConfig?.direction || 'asc'}
                      onClick={() => handleSort('province')}
                    >
                      Province
                    </TableSortLabel>
                  </TableCell>
                )}
                {visibleColumns.division && (
                  <TableCell sx={{ fontSize: '1.15rem', fontWeight: "550", color: "#666" }}>
                    <TableSortLabel
                      active={sortConfig?.key === 'division'}
                      direction={sortConfig?.direction || 'asc'}
                      onClick={() => handleSort('division')}
                    >
                      Division
                    </TableSortLabel>
                  </TableCell>
                )}
                {visibleColumns.district && (
                  <TableCell sx={{ fontSize: '1.15rem', fontWeight: "550", color: "#666" }}>
                    <TableSortLabel
                      active={sortConfig?.key === 'district'}
                      direction={sortConfig?.direction || 'asc'}
                      onClick={() => handleSort('district')}
                    >
                      District
                    </TableSortLabel>
                  </TableCell>
                )}
                {visibleColumns.tehsil && (
                  <TableCell sx={{ fontSize: '1.15rem', fontWeight: "550", color: "#666" }}>
                    <TableSortLabel
                      active={sortConfig?.key === 'tehsil'}
                      direction={sortConfig?.direction || 'asc'}
                      onClick={() => handleSort('tehsil')}
                    >
                      Tehsil
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
              {filteredCourts.map((court) => (
                <CourtRow
                  key={court.courtId}
                  court={court}
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

export default CourtTable;
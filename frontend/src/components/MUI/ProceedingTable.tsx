"use client";

// ProceedingTable.tsx
import React, { useState } from 'react';
import Link from "next/link";
import './ClientTable.css'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Toolbar, TableSortLabel
} from '@mui/material';
import Proceeding from '@/types/Proceeding';
import SearchBar from './SearchTable';
import ColumnVisibilityMenu from './ColumnVisibilityMenu';
import ProceedingRow from './ProceedingRow';

const ProceedingTable: React.FC = () => {
  const initialProceedings: Proceeding[] = [
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

  const [proceedings, setProceedings] = useState<Proceeding[]>(initialProceedings);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Proceeding, direction: 'asc' | 'desc' } | null>(null);
  const [showAnchorEl, setShowAnchorEl] = useState<null | HTMLElement>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [visibleColumns, setVisibleColumns] = useState({
    proceedingId: true,
    caseId: true,
    date: true,
    description: true,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSort = (key: keyof Proceeding) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedProceedings = sortConfig
    ? [...proceedings].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    })
    : proceedings;

  const filteredProceedings = sortedProceedings.filter(
    (proceeding) =>
      proceeding.proceedingId.toString().includes(searchTerm) ||
      proceeding.caseId.toString().includes(searchTerm) ||
      proceeding.date.toLowerCase().includes(searchTerm) ||
      proceeding.description.toLowerCase().includes(searchTerm)
  );

  const handleExpandClick = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <Paper sx={{ borderRadius: '22px' }}>
      <Toolbar className='bg-[#5750F1] rounded-t-xl flex flex-wrap'>
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        <div className='ml-auto mr-4 flex justify-between w-full sm:w-auto'>

          <Link href="/proceeding/addProceeding" className='flex justify-center items-center'>
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
                {visibleColumns.proceedingId && (
                  <TableCell sx={{ fontSize: '1.15rem', fontWeight: "550", color: "#666" }}>
                    <TableSortLabel
                      active={sortConfig?.key === 'proceedingId'}
                      direction={sortConfig?.direction || 'asc'}
                      onClick={() => handleSort('proceedingId')}
                    >
                      Proceeding ID
                    </TableSortLabel>
                  </TableCell>
                )}
                {visibleColumns.caseId && (
                  <TableCell sx={{ fontSize: '1.15rem', fontWeight: "550", color: "#666" }}>
                    <TableSortLabel
                      active={sortConfig?.key === 'caseId'}
                      direction={sortConfig?.direction || 'asc'}
                      onClick={() => handleSort('caseId')}
                    >
                      Case ID
                    </TableSortLabel>
                  </TableCell>
                )}
                {visibleColumns.date && (
                  <TableCell sx={{ fontSize: '1.15rem', fontWeight: "550", color: "#666" }}>
                    <TableSortLabel
                      active={sortConfig?.key === 'date'}
                      direction={sortConfig?.direction || 'asc'}
                      onClick={() => handleSort('date')}
                    >
                      Date
                    </TableSortLabel>
                  </TableCell>
                )}
                {visibleColumns.description && (
                  <TableCell sx={{ fontSize: '1.15rem', fontWeight: "550", color: "#666" }}>
                    <TableSortLabel
                      active={sortConfig?.key === 'description'}
                      direction={sortConfig?.direction || 'asc'}
                      onClick={() => handleSort('description')}
                    >
                      Description
                    </TableSortLabel>
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProceedings.map((proceeding) => (
                <ProceedingRow
                  key={proceeding.proceedingId}
                  proceeding={proceeding}
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

export default ProceedingTable;
"use client";

// JudgeTable.tsx
import React, { useState } from 'react';
import Link from "next/link";
import './ClientTable.css'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Toolbar, TableSortLabel
} from '@mui/material';
import { Judge } from '@/types/Judge';
import SearchBar from './SearchTable';
import ColumnVisibilityMenu from './ColumnVisibilityMenu';
import JudgeRow from './JudgeRow';

const JudgeTable: React.FC = () => {
  const initialJudges: Judge[] = [
    {
      judgeId: 1,
      judgeName: "John Doe",
      designation: "Chief Justice",
      status: "Active"
    },
    {
      judgeId: 2,
      judgeName: "Jane Smith",
      designation: "Associate Justice",
      status: "Inactive"
    },
    {
      judgeId: 3,
      judgeName: "Robert Brown",
      designation: "Senior Judge",
      status: "Active"
    },
    {
      judgeId: 4,
      judgeName: "Emily Davis",
      designation: "Junior Judge",
      status: "Inactive"
    },
    {
      judgeId: 5,
      judgeName: "Michael Wilson",
      designation: "Circuit Judge",
      status: "Active"
    },
  ];

  const [judges, setJudges] = useState<Judge[]>(initialJudges);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Judge, direction: 'asc' | 'desc' } | null>(null);
  const [showAnchorEl, setShowAnchorEl] = useState<null | HTMLElement>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [visibleColumns, setVisibleColumns] = useState({
    judgeName: true,
    designation: true,
    status: true
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSort = (key: keyof Judge) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedJudges = sortConfig
    ? [...judges].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    })
    : judges;

  const filteredJudges = sortedJudges.filter(
    (judge) =>
      judge.judgeName.toLowerCase().includes(searchTerm) ||
      judge.designation.toLowerCase().includes(searchTerm) ||
      judge.status.toLowerCase().includes(searchTerm)
  );

  const handleExpandClick = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <Paper sx={{ borderRadius: '22px' }}>
      <Toolbar className='bg-[#5750F1] rounded-t-xl flex flex-wrap'>
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        <div className='ml-auto mr-4 flex justify-between w-full sm:w-auto'>

          <Link href="/root/judge/addJudge" className='flex justify-center items-center'>
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
                {visibleColumns.judgeName && (
                  <TableCell sx={{ fontSize: '1.15rem', fontWeight: "550", color: "#666" }}>
                    <TableSortLabel
                      active={sortConfig?.key === 'judgeName'}
                      direction={sortConfig?.direction || 'asc'}
                      onClick={() => handleSort('judgeName')}
                    >
                      Judge Name
                    </TableSortLabel>
                  </TableCell>
                )}
                {visibleColumns.designation && (
                  <TableCell sx={{ fontSize: '1.15rem', fontWeight: "550", color: "#666" }}>
                    <TableSortLabel
                      active={sortConfig?.key === 'designation'}
                      direction={sortConfig?.direction || 'asc'}
                      onClick={() => handleSort('designation')}
                    >
                      Designation
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
              {filteredJudges.map((judge) => (
                <JudgeRow
                  key={judge.judgeId}
                  judge={judge}
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

export default JudgeTable;
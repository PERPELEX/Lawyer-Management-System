"use client";

// CaseTable.tsx
import React, { useState } from 'react';
import Link from "next/link";
import './ClientTable.css'
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Toolbar, TableSortLabel
} from '@mui/material';
import Case from '@/types/Case';  // Import the Case interface
import SearchBar from './SearchTable';  // Keep your custom SearchBar component
import FilterMenu from './FilterMenu';  // Keep your FilterMenu
import ColumnVisibilityMenu from './ColumnVisibilityMenu';  // Keep your ColumnVisibilityMenu
import CaseRow from './CaseRow';  // Assuming you have or will create a CaseRow component similar to ClientRow

const CaseTable: React.FC = () => {
    const initialCases: Case[] = [
        {
            caseId: 1,
            clientName: "John Doe",
            clientId: 101,
            lawyerName: "Sarah Smith",
            lawyerId: 201,
            offense: "Theft",
            courtName: "Supreme Court",
            courtRoom: "Room A",
            judge: "Judge Robert Jones",
            status: "Active",
            hearingDate: "2024-11-15",
        },
        {
            caseId: 2,
            clientName: "Jane Davis",
            clientId: 102,
            lawyerName: "David Green",
            lawyerId: 202,
            offense: "Fraud",
            courtName: "District Court",
            courtRoom: "Room B",
            judge: "Judge Emily Clark",
            status: "Inactive",
            hearingDate: "2023-05-22",
        },
        {
            caseId: 3,
            clientName: "Michael Brown",
            clientId: 103,
            lawyerName: "Rachel Adams",
            lawyerId: 203,
            offense: "Assault",
            courtName: "Circuit Court",
            courtRoom: "Room C",
            judge: "Judge William Harris",
            status: "Active",
            hearingDate: "2024-12-05",
        },
        {
            caseId: 4,
            clientName: "Lisa White",
            clientId: 104,
            lawyerName: "John Phillips",
            lawyerId: 204,
            offense: "Embezzlement",
            courtName: "Superior Court",
            courtRoom: "Room D",
            judge: "Judge Olivia King",
            status: "Inactive",
            hearingDate: "2022-08-10",
        },
        {
            caseId: 5,
            clientName: "Robert Taylor",
            clientId: 105,
            lawyerName: "Jennifer Wilson",
            lawyerId: 205,
            offense: "Burglary",
            courtName: "Family Court",
            courtRoom: "Room E",
            judge: "Judge Charles Thompson",
            status: "Active",
            hearingDate: "2024-10-25",
        },
        {
            caseId: 6,
            clientName: "Emily Johnson",
            clientId: 106,
            lawyerName: "Samuel Baker",
            lawyerId: 206,
            offense: "Vandalism",
            courtName: "Municipal Court",
            courtRoom: "Room F",
            judge: "Judge Grace Williams",
            status: "Inactive",
            hearingDate: "2023-02-19",
        },
        {
            caseId: 7,
            clientName: "Daniel Clark",
            clientId: 107,
            lawyerName: "Jessica Lee",
            lawyerId: 207,
            offense: "Drug Possession",
            courtName: "Criminal Court",
            courtRoom: "Room G",
            judge: "Judge Michael Martinez",
            status: "Active",
            hearingDate: "2024-09-30",
        },
        {
            caseId: 8,
            clientName: "Sophia Martinez",
            clientId: 108,
            lawyerName: "Peter Robinson",
            lawyerId: 208,
            offense: "DUI",
            courtName: "Traffic Court",
            courtRoom: "Room H",
            judge: "Judge Barbara Young",
            status: "Inactive",
            hearingDate: "2023-06-18",
        },
        {
            caseId: 9,
            clientName: "Matthew Gonzalez",
            clientId: 109,
            lawyerName: "Nancy Scott",
            lawyerId: 209,
            offense: "Forgery",
            courtName: "Civil Court",
            courtRoom: "Room I",
            judge: "Judge Anthony Brooks",
            status: "Active",
            hearingDate: "2024-11-10",
        },
        {
            caseId: 10,
            clientName: "Laura King",
            clientId: 110,
            lawyerName: "Andrew Turner",
            lawyerId: 210,
            offense: "Arson",
            courtName: "Juvenile Court",
            courtRoom: "Room J",
            judge: "Judge Patricia Evans",
            status: "Active",
            hearingDate: "2024-12-20",
        },
        // Add more case data as needed
    ];

    const [cases, setCases] = useState<Case[]>(initialCases);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof Case, direction: 'asc' | 'desc' } | null>(null);
    const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
    const [showAnchorEl, setShowAnchorEl] = useState<null | HTMLElement>(null);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const [visibleColumns, setVisibleColumns] = useState({
        clientName: true,
        lawyerName: true,
        offense: true,
        courtName: true,
        status: true
    });
    const [filters, setFilters] = useState({ active: true, inactive: true });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleSort = (key: keyof Case) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedCases = sortConfig
        ? [...cases].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        })
        : cases;

    const filteredCases = sortedCases.filter((caseData) => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            (caseData.caseId.toString().includes(searchTermLower) ||
                caseData.clientName.toLowerCase().includes(searchTermLower) ||
                caseData.clientId.toString().includes(searchTermLower) ||
                caseData.lawyerName.toLowerCase().includes(searchTermLower) ||
                caseData.lawyerId.toString().includes(searchTermLower) ||
                caseData.offense.toLowerCase().includes(searchTermLower) ||
                caseData.courtName.toLowerCase().includes(searchTermLower) ||
                caseData.courtRoom.toLowerCase().includes(searchTermLower) ||
                caseData.status.toLowerCase().includes(searchTermLower) ||
                caseData.hearingDate.toLowerCase().includes(searchTermLower) ||
                caseData.judge.toLowerCase().includes(searchTermLower)) &&
            ((filters.active && caseData.status === 'Active') || (filters.inactive && caseData.status === 'Inactive'))
        );
    });

    const handleExpandClick = (id: number) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    return (
        <Paper sx={{ borderRadius: '22px' }}>
            <Toolbar className='bg-[#5750F1] rounded-t-xl flex flex-wrap'>
                <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
                <div className='ml-auto mr-4 flex justify-between w-full sm:w-auto'>
                    <Link href="/case/addCase" className='flex justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-plus icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
                    </Link>
                    <FilterMenu
                        anchorEl={filterAnchorEl}
                        filters={filters}
                        handleFilterClick={(e) => setFilterAnchorEl(e.currentTarget)}
                        handleFilterClose={() => setFilterAnchorEl(null)}
                        toggleFilter={(filter) =>
                            setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }))} />
                    <ColumnVisibilityMenu
                        anchorEl={showAnchorEl}
                        visibleColumns={visibleColumns}
                        handleShowClick={(e) => setShowAnchorEl(e.currentTarget)}
                        handleShowClose={() => setShowAnchorEl(null)}
                        toggleColumnVisibility={(column) =>
                            setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }))} />
                </div>
            </Toolbar>

            <TableContainer component={Paper} className="table-container">
                <div className="overflow-x-auto">
                    <Table stickyHeader>
                        <TableHead sx={{ backgroundColor: 'blue' }}>
                            <TableRow sx={{ backgroundColor: 'blue' }}>
                                {visibleColumns.clientName && (
                                    <TableCell sx={{ fontSize: '1.15rem', fontWeight: "550", color: "#666" }}>
                                        <TableSortLabel
                                            active={sortConfig?.key === 'clientName'}
                                            direction={sortConfig?.direction || 'asc'}
                                            onClick={() => handleSort('clientName')}
                                        >
                                            Client Name
                                        </TableSortLabel>
                                    </TableCell>
                                )}
                                {visibleColumns.lawyerName && (
                                    <TableCell sx={{ fontSize: '1.15rem', fontWeight: "550", color: "#666" }}>
                                        <TableSortLabel
                                            active={sortConfig?.key === 'lawyerName'}
                                            direction={sortConfig?.direction || 'asc'}
                                            onClick={() => handleSort('lawyerName')}
                                        >
                                            Lawyer Name
                                        </TableSortLabel>
                                    </TableCell>
                                )}
                                {visibleColumns.offense && (
                                    <TableCell sx={{ fontSize: '1.15rem', fontWeight: "550", color: "#666" }}>
                                        <TableSortLabel
                                            active={sortConfig?.key === 'offense'}
                                            direction={sortConfig?.direction || 'asc'}
                                            onClick={() => handleSort('offense')}
                                        >
                                            Offense
                                        </TableSortLabel>
                                    </TableCell>
                                )}
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
                            {filteredCases.map((caseData) => (
                                <CaseRow
                                    key={caseData.caseId}
                                    caseData={caseData}
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

export default CaseTable;
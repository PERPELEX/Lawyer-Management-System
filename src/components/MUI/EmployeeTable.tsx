"use client";

import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Toolbar, TableSortLabel
} from '@mui/material';
import { Employee } from '@/types/Employee';  // Import the Employee interface
import SearchBar from './SearchTable';  // Keep your custom SearchBar component
import FilterMenu from './FilterMenu';  // Keep your FilterMenu
import ColumnVisibilityMenu from './ColumnVisibilityMenu';  // Keep your ColumnVisibilityMenu
import EmployeeRow from './EmployeeRow';  // Assuming you will create a component similar to CaseRow for Employees

const EmployeeTable: React.FC = () => {
    const initialEmployees: Employee[] = [
        {
            id: 1,
            name: "John Doe",
            password: "password123",
            rank: "Manager",
            role: "Admin",
            status: "Active"
        },
        {
            id: 2,
            name: "Jane Smith",
            password: "passw0rd",
            rank: "Supervisor",
            role: "User",
            status: "Active"
        },
        {
            id: 3,
            name: "Mike Johnson",
            password: "abc123",
            rank: "Team Lead",
            role: "Admin",
            status: "Inactive"
        },
        {
            id: 4,
            name: "Emily Davis",
            password: "emilydavis2023",
            rank: "Coordinator",
            role: "User",
            status: "Active"
        },
        {
            id: 5,
            name: "Chris Lee",
            password: "chrispass",
            rank: "Analyst",
            role: "User",
            status: "Active"
        },
        {
            id: 6,
            name: "Sarah Brown",
            password: "secureSarah",
            rank: "HR Specialist",
            role: "Admin",
            status: "Inactive"
        },
        {
            id: 7,
            name: "Robert Taylor",
            password: "r0bTayl0r",
            rank: "Consultant",
            role: "User",
            status: "Active"
        },
        {
            id: 8,
            name: "Jessica Williams",
            password: "jess2024",
            rank: "Project Manager",
            role: "Admin",
            status: "Active"
        },
        {
            id: 9,
            name: "David Wilson",
            password: "davey123",
            rank: "Coordinator",
            role: "User",
            status: "Inactive"
        },
        {
            id: 10,
            name: "Sophia Martinez",
            password: "martinez@321",
            rank: "Assistant Manager",
            role: "User",
            status: "Active"
        },
    ];

    const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof Employee, direction: 'asc' | 'desc' } | null>(null);
    const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
    const [showAnchorEl, setShowAnchorEl] = useState<null | HTMLElement>(null);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const [visibleColumns, setVisibleColumns] = useState({
        id: true,
        name: true,
        rank: true,
        role: true,
        status: true
    });
    const [filters, setFilters] = useState({ active: true, inactive: true });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleSort = (key: keyof Employee) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedEmployees = sortConfig
        ? [...employees].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        })
        : employees;

    const filteredEmployees = sortedEmployees.filter((employee) => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            (employee.id.toString().includes(searchTermLower) ||
                employee.name.toLowerCase().includes(searchTermLower) ||
                employee.rank.toLowerCase().includes(searchTermLower) ||
                employee.role.toLowerCase().includes(searchTermLower) ||
                employee.password.toLowerCase().includes(searchTermLower)) &&
            ((filters.active && employee.status === 'Active') || (filters.inactive && employee.status === 'Inactive'))
        );
    });

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

            <TableContainer component={Paper} sx={{ maxHeight: 500, overflow: 'auto', '&::-webkit-scrollbar': { display: 'none' }, '-ms-overflow-style': 'none', 'scrollbar-width': 'none' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {visibleColumns.id && (
                                <TableCell sx={{ fontSize: '1.15rem', fontWeight: "550", color: "#666" }}>
                                    <TableSortLabel
                                        active={sortConfig?.key === 'name'}
                                        direction={sortConfig?.direction || 'asc'}
                                        onClick={() => handleSort('name')}
                                    >
                                        ID
                                    </TableSortLabel>
                                </TableCell>
                            )}
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
                            {visibleColumns.rank && (
                                <TableCell sx={{ fontSize: '1.15rem', fontWeight: "550", color: "#666" }}>
                                    <TableSortLabel
                                        active={sortConfig?.key === 'rank'}
                                        direction={sortConfig?.direction || 'asc'}
                                        onClick={() => handleSort('rank')}
                                    >
                                        Rank
                                    </TableSortLabel>
                                </TableCell>
                            )}
                            {visibleColumns.role && (
                                <TableCell sx={{ fontSize: '1.15rem', fontWeight: "550", color: "#666" }}>
                                    <TableSortLabel
                                        active={sortConfig?.key === 'role'}
                                        direction={sortConfig?.direction || 'asc'}
                                        onClick={() => handleSort('role')}
                                    >
                                        Role
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
                        {filteredEmployees.map((employee) => (
                            <EmployeeRow
                                key={employee.id}
                                employeeData={employee}
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

export default EmployeeTable;

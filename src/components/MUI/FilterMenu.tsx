// FilterMenu.tsx
import React from 'react';
import { IconButton, MenuItem, FormControlLabel, Checkbox, Tooltip, Fade, Popper, Paper, ClickAwayListener } from '@mui/material';
import { FilterList as FilterListIcon } from '@mui/icons-material';

interface FilterMenuProps {
  anchorEl: HTMLElement | null;
  filters: { active: boolean; inactive: boolean };
  handleFilterClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterClose: () => void;
  toggleFilter: (filter: keyof typeof filters) => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({
  anchorEl,
  filters,
  handleFilterClick,
  handleFilterClose,
  toggleFilter,
}) => (
  <>
    <Tooltip title="Filter" disableHoverListener>
      <IconButton onClick={handleFilterClick}>
        <FilterListIcon fontSize='large' className='text-white rounded-3xl p-[2px] hover:text-[#1d18aa] hover:bg-white ' />
      </IconButton>
    </Tooltip>
    <Popper
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      transition
      disablePortal
      style={{ zIndex: 1300 }}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper>
            <ClickAwayListener onClickAway={handleFilterClose}>
              <div>
                <MenuItem>
                  <FormControlLabel
                    control={<Checkbox checked={filters.active} onChange={() => toggleFilter('active')} />}
                    label="Active Clients"
                  />
                </MenuItem>
                <MenuItem>
                  <FormControlLabel
                    control={<Checkbox checked={filters.inactive} onChange={() => toggleFilter('inactive')} />}
                    label="Inactive Clients"
                  />
                </MenuItem>
              </div>
            </ClickAwayListener>
          </Paper>
        </Fade>
      )}
    </Popper>
  </>
);

export default FilterMenu;
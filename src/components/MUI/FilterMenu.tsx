// FilterMenu.tsx
import React from 'react';
import { IconButton, MenuItem, FormControlLabel, Checkbox, Tooltip, Fade, Popper, Paper, ClickAwayListener } from '@mui/material';

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
      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-filter icon"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
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
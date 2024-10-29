// ColumnVisibilityMenu.tsx
import React from 'react';
import { IconButton, MenuItem, FormControlLabel, Checkbox, Tooltip, Grow, Popper, Paper, ClickAwayListener } from '@mui/material';

interface ColumnVisibilityMenuProps {
  anchorEl: HTMLElement | null;
  visibleColumns: { [key: string]: boolean };
  handleShowClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleShowClose: () => void;
  toggleColumnVisibility: (column: string) => void;
}

const ColumnVisibilityMenu: React.FC<ColumnVisibilityMenuProps> = ({
  anchorEl,
  visibleColumns,
  handleShowClick,
  handleShowClose,
  toggleColumnVisibility,
}) => (
  <>
    <Tooltip title="Show" disableHoverListener>
      <IconButton onClick={handleShowClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather- icon"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
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
        <Grow {...TransitionProps} timeout={350}>
          <Paper>
            <ClickAwayListener onClickAway={handleShowClose}>
              <div>
                {Object.keys(visibleColumns).map((column) => (
                  <MenuItem key={column}>
                    <FormControlLabel
                      control={<Checkbox checked={visibleColumns[column]} onChange={() => toggleColumnVisibility(column)} />}
                      label={column.charAt(0).toUpperCase() + column.slice(1)}
                    />
                  </MenuItem>
                ))}
              </div>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  </>
);

export default ColumnVisibilityMenu;
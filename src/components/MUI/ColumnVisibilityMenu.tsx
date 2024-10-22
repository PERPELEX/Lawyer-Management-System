// ColumnVisibilityMenu.tsx
import React from 'react';
import { IconButton, MenuItem, FormControlLabel, Checkbox, Tooltip, Grow, Popper, Paper, ClickAwayListener } from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';

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
        <SettingsIcon
          fontSize='large'
          className='text-white rounded-3xl p-[4px] transition-all ease-in-out duration-300 hover:text-[#1d18aa] hover:bg-white'
        />
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
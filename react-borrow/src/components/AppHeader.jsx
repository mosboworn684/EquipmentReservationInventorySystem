import { AppBar, Box, IconButton, Toolbar } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings'
import { useProSidebar } from "react-pro-sidebar"
import { useState } from "react"
const AppHeader = () => {

    // useProSidebar hook
    const { collapseSidebar, toggleSidebar, broken } = useProSidebar()

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('token')
        window.location ='/'
        // Perform logout action
        // Example: clear authentication token, redirect to login page, etc.
    };
    return (
        <AppBar position="sticky" sx={styles.appBar}>
            <Toolbar>
                <IconButton onClick={() => broken ? toggleSidebar() : collapseSidebar()}
                   color="inherit"
                   >
                    <MenuIcon />
                </IconButton>
                {/* <Box
                    component={'img'}
                    sx={styles.appLogo}
                    src="/assets/logo_round.png" /> */}
                <Box sx={{ ml: '20px', fontSize: '20px' }}>Equipment Reservation/Inventory System</Box>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton
                    size="large"
                    aria-controls="menu"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleMenuOpen}
                >
                    <SettingsIcon />
                </IconButton>
                <Menu
                    id="menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleMenuClose} sx={{ px: '30px' }}>
                        <Settings sx={{ fontSize: '16px', mr: '20px' }} /> Settings
                    </MenuItem>
                    <MenuItem onClick={handleLogout} sx={{ px: '30px' }}>
                            {/* <Logout fontSize="small" /> */}
                        <Logout sx={{ fontSize: '16px', mr: '20px' }} /> Logout
                    </MenuItem>
                </Menu>

            </Toolbar>
        </AppBar>
    )
}

const styles = {
    appBar: {
        bgcolor: 'teal'
    },
    appLogo: {
        borderRadius: 2,
        width: 40,
        marginLeft: 2,
        cursor: 'pointer'
    }
}

export default AppHeader
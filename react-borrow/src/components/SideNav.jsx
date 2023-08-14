import { Avatar, Box, Typography } from "@mui/material"
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar"

import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined'
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom"
import { USER_PATH, BORROW_LIST_PATH,EQUIPMENT_PATH } from "../configs/constants"
import { useState } from "react"
const SideNav = () => {
    const isCollapsed = useProSidebar()
    const [activeMenuItem, setActiveMenuItem] = useState('Dashboard')
    const user_token = localStorage.getItem('user')
    const user = JSON.parse(user_token)
    const handleMenuClick = (menu) => {
        setActiveMenuItem(menu)
        isCollapsed.toggleSidebar()
    }
    return (
        <Sidebar
            style={{ height: "100%", top: 'auto' }}
            breakPoint="md"
            backgroundColor={'white'}
        >
            <Box sx={styles.avatarContainer}>
                <Avatar sx={styles.avatar} alt="Masoud" src="/assets/test.jpg" />
                {isCollapsed.collapsed != true ? <Typography variant="body2" sx={styles.yourChannel}>{user.first_name} {user.last_name}</Typography> : null}
            </Box>

            <Menu
                menuItemStyles={{
                    button: ({ active }) => {
                        return {
                            backgroundColor: active ? '#EEEEEE' : 'transparent',
                        }
                    }
                }}>
                <MenuItem
                    active={activeMenuItem === USER_PATH}
                    component={<Link to={USER_PATH} />}
                    icon={<PersonIcon />}
                    onClick={() => handleMenuClick(USER_PATH)}>
                    <Typography variant="body2">ผู้ใช้</Typography>
                </MenuItem>
                <MenuItem
                    active={activeMenuItem === BORROW_LIST_PATH}
                    component={<Link to={BORROW_LIST_PATH} />}
                    icon={<PeopleIcon />}
                    onClick={() => handleMenuClick(BORROW_LIST_PATH)}>
                    <Typography variant="body2">ยืม-อุปกรณ์ </Typography>
                </MenuItem>
                <MenuItem
                    active={activeMenuItem === EQUIPMENT_PATH}
                    component={<Link to={EQUIPMENT_PATH} />}
                    icon={<AnalyticsOutlinedIcon />}
                    onClick={() => handleMenuClick(EQUIPMENT_PATH)}>
                    <Typography variant="body2">อุปกรณ์ </Typography>
                </MenuItem>
            </Menu >
        </Sidebar >
    )
}

const styles = {
    avatarContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: 'column',
        my: 5
    },
    avatar: {
        width: '40%',
        height: 'auto'
    },
    yourChannel: {
        mt: 1
    }
}

export default SideNav
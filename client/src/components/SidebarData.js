import React from 'react'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
import * as DiIcons from "react-icons/di"

export const SidebarData = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: <AiIcons.AiOutlineDashboard/>,
        cName: "nav-text"
    },
    {
        title: "Repository",
        path: "/user/repository",
        icon: <DiIcons.DiGitBranch/>,
        cName: "nav-text"
    },
    {
        title: "Settings",
        path: "/user/settings",
        icon: <AiIcons.AiFillSetting/>,
        cName: "nav-text"
    },
    {
        title: "Support",
        path: "/user/support",
        icon: <IoIcons.IoIosHelpCircleOutline/>,
        cName: "nav-text"
    },

]
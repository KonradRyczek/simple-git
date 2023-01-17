import React from 'react'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
import * as DiIcons from "react-icons/di"

const username = localStorage.getItem('username')
const reponame = localStorage.getItem('reponame')
export const SidebarData = [
    
    {
        title: "Dashboard",
        path: "/"+username,
        icon: <AiIcons.AiOutlineDashboard/>,
        cName: "nav-text"
    },
    {
        title: "Branches",
        path: "/"+username+"/"+reponame+"/branches",
        icon: <DiIcons.DiGitBranch/>,
        cName: "nav-text"
    },
    {
        title: "Repository",
        path: "/"+username+"/"+reponame,
        icon: <DiIcons.DiGitBranch/>,
        cName: "nav-text"
    },
    {
        title: "Settings",
        path: "/"+username+"/settings",
        icon: <AiIcons.AiFillSetting/>,
        cName: "nav-text"
    },
    {
        title: "Support",
        path: "/"+username+"/support",
        icon: <IoIcons.IoIosHelpCircleOutline/>,
        cName: "nav-text"
    },

]
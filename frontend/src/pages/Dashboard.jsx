import React, { useState, useEffect } from "react";
import { DashboardContainerFlex, ContentContainerFlex } from "../global/Style";
import SummaryTab from "../components/Summery";
import InventoryTab from "../components/AddInventory";
import ReportsTab from "../components/Reports";
import CreateEmployees from "../components/CreateEmployees";
import Profile from "../components/Profile";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authslices";
import AllUsers from "../components/AllUsers";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenuItem,
  SidebarFooter,
  LogoutButton,
} from "../global/Style";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("summary");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || (user.role !== "manager" && user.role !== "admin")) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <DashboardContainerFlex>
      <Sidebar>
        <SidebarHeader>
          {user.role === "admin" ? "Admin Dashboard" : "Manager Dashboard"}
        </SidebarHeader>
        <SidebarMenuItem
          $active={activeTab === "summary"}
          onClick={() => setActiveTab("summary")}
        >
          Summary
        </SidebarMenuItem>

        
        {user.role === "manager" && (
          <SidebarMenuItem
            $active={activeTab === "inventory"}
            onClick={() => setActiveTab("inventory")}
          >
            Add Inventory
          </SidebarMenuItem>
        )}

        <SidebarMenuItem
          $active={activeTab === "reports"}
          onClick={() => setActiveTab("reports")}
        >
          Reports
        </SidebarMenuItem>
        <SidebarMenuItem
          $active={activeTab === "profile"}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </SidebarMenuItem>

        {/* Corrected: Wrap the OR condition in parentheses */}
        {user.role === "admin" && (
          <>
            <SidebarMenuItem
              $active={activeTab === "createEmployee"}
              onClick={() => setActiveTab("createEmployee")}
            >
              Create New Employee
            </SidebarMenuItem>
            <SidebarMenuItem
              $active={activeTab === "allusers"}
              onClick={() => setActiveTab("allusers")}
            >
              All Employees
            </SidebarMenuItem>
          </>
        )}

        <SidebarFooter>
          <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
        </SidebarFooter>
      </Sidebar>

      <ContentContainerFlex>
        {activeTab === "summary" && <SummaryTab />}
        {activeTab === "inventory" && <InventoryTab />}
        {activeTab === "reports" && <ReportsTab />}
        {activeTab === "profile" && <Profile />}
        {activeTab === "createEmployee" && <CreateEmployees />}
        {activeTab === "allusers" && <AllUsers />}
      </ContentContainerFlex>
    </DashboardContainerFlex>
  );
}

export default Dashboard;

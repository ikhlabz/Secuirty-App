// import React from "react";
import { Routes, Route } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Dashboard } from "../components/Dashboard";
import Supervisor from "./Supervisor";
import Shift from "./Shift";
import Patrolling from "./Patrolling";
import Guards from "./Guards";
import Location from "./Location";
import SingleSupervisor from "./SingleSupervisor";
import SingleLocation from "./SingleLocation";
import SingleGuard from "./SingleGuard";
import SingleShift from "./SingleShift";
import SingleIncidentField from "./SingleIncidentField";
import SendMessage from "./SendMessage";
import SinglePatrolling from "./SinglePatrolling";
import { PatrollingDetails } from "./PatrollingDetails";
import BriefingBox from "./BriefingBox";
import IncidentReporting from "./IncidentReporting";
import { GuardDetails } from "./GuardDetails";
import { SupervisorDetails } from "./SupervisorDetails";
import { ShiftDetails } from "./ShiftDetails";
import { LocationDetails } from "./LocationDetails";

export const Home = () => {
  return (
    <div className="flex relative">
      <div className="w-72 fixed sidebar bg-primary1">
        <Sidebar />
      </div>
      <div className="ml-72 p-4 w-full min-h-screen bg-slate-100">
        <Routes>
          <Route path="/" element={<Dashboard />} />

          {/* Pages */}
          <Route path="/supervisor" element={<Supervisor />} />
          <Route path="/shifts" element={<Shift />} />
          <Route path="/guards" element={<Guards />} />
          <Route path="/locations" element={<Location />} />
          <Route path="/send-message" element={<SendMessage />} />
          <Route path="/patrolling" element={<Patrolling />} />
          <Route path="/Security" element={<Dashboard />} />
          <Route path="/Briefing" element={<BriefingBox />} />
          <Route path="/incidents" element={<IncidentReporting />} />
          <Route
            path="/supervisor/create-supervisor"
            element={<SingleSupervisor />}
          />
          <Route
            path="/location/create-location"
            element={<SingleLocation />}
          />
          <Route path="/guards/create-guard" element={<SingleGuard />} />
          <Route path="/shifts/create-shift" element={<SingleShift />} />
          <Route
            path="/incidents/create-field"
            element={<SingleIncidentField />}
          />
          <Route
            path="/patrolling/create-patrolling"
            element={<SinglePatrolling />}
          />
          <Route path="/guard/:id" element={<GuardDetails />} />
          <Route path="/patrolling/:id" element={<PatrollingDetails />} />
          <Route path="/supervisor/:id" element={<SupervisorDetails />} />
          <Route path="/shift/:id" element={<ShiftDetails />} />
          <Route path="/location/:id" element={<LocationDetails />} />
        </Routes>
      </div>
    </div>
  );
};

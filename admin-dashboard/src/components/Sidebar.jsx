import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { links } from "../helper";
import { useAuthContext } from "../context/user-context";

export const Sidebar = () => {
  const { isAdmin } = useAuthContext();
  const [currentRoute, setCurrentRoute] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-slate-100 font-bold  text-md m-2 mb-0";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-slate-100 font-bold text-md text-gray-700 hover:bg-light-gray m-2 mb-0";

  const location = useLocation();

  return (
    <>
      <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight text-slate-100"
          >
            <span>Admin Dashboard</span>
          </Link>
        </div>
        <div className="mt-10 z-50">
          {links.map((link) => (
            <div key={link.title}>
              <p className="text-slate-100 font-bold m-3 mt-4 uppercase">
                {link.title}
              </p>
              {link?.links?.map((sublink) => (
                <div key={sublink.name}>
                  {sublink.name === "supervisor" && !isAdmin ? null : ( // Check if user is admin before rendering "Create Supervisor"
                    <div
                      onClick={() => {
                        setCurrentRoute(sublink.name);
                      }}
                      className="cursor-pointer"
                    >
                      <NavLink
                        to={`/${sublink.name}`}
                        key={sublink.name}
                        className={({ isActive }) =>
                          isActive ? activeLink : normalLink
                        }
                        style={{
                          backgroundColor: `${
                            location.pathname === `/${sublink.name}`
                              ? "#c8982d"
                              : ""
                          }`,
                        }}
                      >
                        {sublink.icon}
                        <span className="ml-2 text-slate-100 font-bold uppercase">
                          {sublink.name}
                        </span>
                      </NavLink>
                      {sublink.name === currentRoute && (
                        <ul
                          className="pl-5 rounded-lg m-2"
                          style={{
                            backgroundColor: `${
                              location.pathname === `${activeSubMenu}`
                                ? "#c8982d"
                                : ""
                            }`,
                          }}
                        >
                          {sublink?.subMenu?.map((submenuItem, i) => (
                            <li
                              key={i}
                              onClick={() => setActiveSubMenu(submenuItem.link)}
                            >
                              <Link
                                key={submenuItem.name}
                                className="flex items-center gap-4 pl-2 pt-3 pb-2.5 rounded-lg text-slate-100 font-bold text-md    hover:bg-light-gray m-2 mt-0"
                                to={submenuItem.link}
                              >
                                {submenuItem.icon}
                                {submenuItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

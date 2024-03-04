import React from "react";
import { Link } from "react-router-dom";
import { securityGuardDataArray } from "../../data";
import SupervisorModal from "../components/Modals/SuperVisorModal";
import { useDataContext } from "../context/fetch-context";
import { usePostContext } from "../context/send-context";

const Supervisor = () => {
  const { supervisor } = useDataContext();
  const { DeleteSupervisorData } = usePostContext();

  return (
    <div className="flex flex-col">
      <div className="flex justify-between text-center text-gray-700 items-center rounded-lg h-16 bg-primary1 mb-5 px-10">
        <h2 className="text-xl antialiased font-bold uppercase">Supervisor</h2>
      </div>
      <div className="overflow-x-auto flex px-2 justify-center transition-opacity ease-in-out duration-500 ">
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-sm  text-gray-700 uppercase bg-primary1  ">
              <tr>
                <th scope="col" className="px-3 py-3 text-start">
                  First Name
                </th>
                <th scope="col" className="px-3 py-3 text-start text-nowrap">
                  Last Name
                </th>
                <th scope="col" className="px-3 py-3 text-start">
                  Email
                </th>
                <th scope="col" className="px-3 py-3 text-start text-nowrap">
                  Phone Number
                </th>
                <th scope="col" className="px-3 py-3 text-center">
                  Details
                </th>
                <th scope="col" className="px-3 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {supervisor.map((item, index) => (
                <tr className="bg-white border-b  " key={index}>
                  <td
                    scope="row"
                    className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap "
                  >
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.userImage ? item.userImage.url : null}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.firstName}</div>
                      </div>
                    </div>
                  </td>
                  <td
                    scope="row"
                    className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {item.lastName}
                  </td>
                  <td
                    scope="row"
                    className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {item.email}
                  </td>
                  <td
                    scope="row"
                    className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {item.phoneNumber}
                  </td>
                  <td
                    scope="row"
                    className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap "
                  >
                    <Link to={"/supervisor/" + item._id}>
                      <button className="px-3 py-2 rounded-md text-slate-100 font-bold bg-primary1">
                        View
                      </button>
                    </Link>
                  </td>
                  <th
                    scope="row"
                    className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <SupervisorModal
                      title={"Update"}
                      q1={"First Name"}
                      q2={"Last Name"}
                      q3={"Email"}
                      q4={"Phone Number"}
                      q5={"User Role"}
                      q6={"User Status"}
                      q7={"Image"}
                      value={item}
                      id={item._id}
                    />
                    <button
                      onClick={() => DeleteSupervisorData(item._id)}
                      className="px-3 py-2 rounded-md text-slate-100 font-bold bg-red-500 ml-4"
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Supervisor;

{
  /* You can open the modal using document.getElementById('ID').showModal() method */
}
{
  /* <AddModal
title={"Add Guard"}
q1={"First Name"}
q2={"Last Name"}
q3={"Email"}
q4={"Password"}
q5={"Image"}
/> */
}

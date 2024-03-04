/* eslint-disable */

import { FiShoppingBag } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoMdContacts } from "react-icons/io";
import { RiContactsLine } from "react-icons/ri";
import { MdOutlineSecurity } from "react-icons/md";
import { GiGuards } from "react-icons/gi";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaHardHat } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { RiPoliceCarFill } from "react-icons/ri";
import { FaRegClock } from "react-icons/fa6";
import { MdLocalPolice } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa6";
import { GoAlertFill } from "react-icons/go";
import { FaMessage } from "react-icons/fa6";

export const links = [
  {
    title: "Pages",
    links: [
      {
        name: "supervisor",
        icon: <FaHardHat color="white" />,
        subMenu: [
          {
            name: "Create Supervisor",
            icon: <FaPencilAlt color="white" />,
            link: "/supervisor/create-supervisor",
          },
        ],
      },
      {
        name: "shifts",
        icon: <FaRegClock color="white" />,
        subMenu: [
          {
            name: "Create Shift",
            icon: <FaPencilAlt color="white" />,
            link: "/shifts/create-shift",
          },
        ],
      },
      {
        name: "guards",
        icon: <MdLocalPolice color="white" />,
        subMenu: [
          {
            name: "Create Guard",
            icon: <FaPencilAlt color="white" />,
            link: "/guards/create-guard",
          },
        ],
      },
      {
        name: "locations",
        icon: <FaMapLocationDot color="white" />,
        subMenu: [
          {
            name: "Create Location",
            icon: <FaPencilAlt color="white" />,
            link: "/location/create-location",
          },
        ],
      },
      {
        name: "patrolling",
        icon: <RiPoliceCarFill color="white" />,
        subMenu: [
          {
            name: "Create Patrolling",
            icon: <FaPencilAlt color="white" />,
            link: "/patrolling/create-patrolling",
          },
        ],
      },
      {
        name: "briefing",
        icon: <FaClipboardList color="white" />,
      },
      {
        name: "incidents",
        icon: <GoAlertFill color="white" />,
        subMenu: [
          {
            name: "Incident Fields",
            icon: <FaPencilAlt color="white" />,
            link: "/incidents/create-field",
          },
        ],
      },
      {
        name: "send-message",
        icon: <FaMessage color="white" />,
      },
    ],
  },
];

export function getCharactersTillFirstComma(text) {
  const commaIndex = text.indexOf(",");

  const extractedCharacters = text.substring(0, Math.min(commaIndex));

  return extractedCharacters;
}

import { io } from "socket.io-client";

const URL = "http://147.182.235.79:5000";

export const socket = io(URL);

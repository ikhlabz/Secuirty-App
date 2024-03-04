import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import { useAuthContext } from "./context/user-context";
import { useEffect, useState } from "react";
import { socket } from "./socket";
function App() {
  const [panic, setPanic] = useState(false);
  const [panicData, setPanicData] = useState(false);
  const [outOfRange, setOutOfRange] = useState(false);
  const [modal, setModal] = useState(false);
  const [guardLocation, setGuardLocation] = useState(false);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
  }, []);

  useEffect(() => {
    socket.on("panic button", (data) => {
      console.log(data);
      setPanicData(data);

      setPanic(true);
      document.getElementById("panic").showModal();
    });

    socket.on("guard location update", (data) => {
      console.log(data);
      setGuardLocation(true);
    });
  }, [panic, guardLocation]);
  useEffect(() => {
    socket.on("out of range", (data) => {
      console.log(data);
      setOutOfRange(true);
      document.getElementById("panic").showModal();
    });
  }, [outOfRange]);
  const { user } = useAuthContext();
  return (
    <>
      {panic === true && (
        <dialog
          id="panic"
          className="absolute top-1/2 left-1/2 p-10 rounded-md -translate-x-1/2 -translate-y-1/2"
        >
          <div className="flex flex-col">
            <h2 className="font-bold text-lg py-2">Panic Button</h2>
            <p className="font-bold text-sm ">
              <strong>Alert!</strong> Panic button has been pressed.
            </p>
            <div className="flex mt-2 flex-col gap-2">
              <p>
                {" "}
                <strong>User: </strong> {panicData.firstName}{" "}
                {panicData.lastName}
              </p>
              <p>
                <strong>Location: </strong> {panicData.location}
              </p>
            </div>
            <button
              onClick={() => document.getElementById("panic").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-1 top-1"
            >
              ✕
            </button>
          </div>
        </dialog>
      )}
      {outOfRange === true && (
        <dialog id="outofrange" className="outofrange">
          <div className="dialog">
            <h2>Out of Range</h2>
            <p>
              <strong>Alert!</strong> The device is out of range.
            </p>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </dialog>
      )}
      <Router>
        <Routes>
          {user !== null ? (
            <Route path="/*" element={<Home />} />
          ) : (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/*" element={<Home />} />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;

import React, { useState } from "react";
import Chat from "./components/Chat";
import NameInput from "./components/NameInput";

const App: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const botname = "Botswana";

  return (
    <div className="bg-red-400 flex justify-center items-center w-screen h-screen">
      {username ? (
        <Chat username={username} botname={botname} />
      ) : (
        <NameInput setUsername={setUsername} />
      )}
    </div>
  );
};

export default App;

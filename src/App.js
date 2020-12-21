import { useState } from 'react';
import RegisterFrame from "./RegisterFrame"
import query from "./api";
import Chat from "./Chat";
import { useEffect } from 'react/cjs/react.development';

function App() {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    return () => {
      query({ type: "unregister", name: userName });
    }
  })

  return (
    <div>
      {!userName && <RegisterFrame setUserName={setUserName} />}
      {userName && <Chat user={userName} />}
    </div>
  );
}

export default App;

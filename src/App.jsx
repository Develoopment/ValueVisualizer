import React from "react"
import InputEssays from "./components/InputEssays"

function App() {

  return (
    <div>

      <div className="text-center p-10 space-y-5">
        <h1 className="text-5xl font-lato 
        bg-gradient-to-b from-black to-accent inline-block text-transparent bg-clip-text">Scan your essays for free!</h1>
        <h2 className="text-lg">Copy Paste your essays into the boxes and get a pulse of the values your essays are conveying</h2>

      </div>
      
      <InputEssays />
    </div>
  )
}

export default App

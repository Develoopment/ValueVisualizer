import React, {useState} from 'react'

function InputEssays() {

  // for displaying the value
  const [value, setValue] = useState("");

  // submits the form, talks to the server to get the value of the essay
  const handleSubmit = async (e) => {
    
    e.preventDefault();

    // gets the form data, converts to JSON
    const form = e.target;
    const formData = new FormData(form);
    const formJson = JSON.stringify(Object.fromEntries(formData.entries()));


    try{

      // sends the POST request (the content type header is important)
      // sends a JSON value
      const response = await fetch("http://localhost:9000/valuescan",{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
		    body: formJson,
      })

      // recieves the server's response (the value) and sets it to be displayed
      const value = await response.json();
      setValue(value.valueOutput) //the DOM automatically renders when the value is set
    }
    catch(error) {
      console.log(error)
    }

  }

  return (
    <div>
        
      <form onSubmit={handleSubmit}>
        <textarea className="border-2 border-black m-4" type="text" name="essay"/>
        <button type="submit" className="bg-gray-500 rounded-lg p-2">Scan</button>
      </form>

      <hr />
        <h1>{value}</h1>
      <hr />
      
    </div>
  )
}

export default InputEssays
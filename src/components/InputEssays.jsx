import React, {useState} from 'react'

function InputEssays() {

  const [value, setValue] = useState("");

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = JSON.stringify(Object.fromEntries(formData.entries()));


    try{
      const response = await fetch("http://localhost:9000/valuescan",{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
		    body: formJson,
      })

      const value = await response.json();
      setValue(value.valueOutput)
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
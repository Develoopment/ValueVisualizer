import React, {useState} from 'react'

function InputEssays() {

  // for displaying the value
  const [value, setValue] = useState("");
  const [essayInputs, setEssayInputs] = useState([""])

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


  // this function handles changes to input,
  // this is needed to ensure that the text continues to remain in the textboxes even when the Virtual DOM rerolads when a textbox is removed
  const handleChange = (index, e) => {
    let newFormValues = [...essayInputs];

    // console.log("newFormValues before");
    // console.log(newFormValues);

    // console.log("index: " + index)

    newFormValues[index] = e.target.value;
    
    // console.log("newFormValues after");
    // console.log(newFormValues);

    setEssayInputs(newFormValues);
  }

  // adds textboxes
  const addTextBox = () => {
    setEssayInputs([...essayInputs, ""]);
  }

  // removes textboxes
  const removeTextBox = (index) => {
    let newFormValues = [...essayInputs];
    newFormValues.splice(index, 1);
    setEssayInputs(newFormValues)
  }

  return (
    <div>
        
      <form onSubmit={handleSubmit} className='p-8'>
        {/* iterating over the number of textareas, if the below button is clicked, the essayInputs state is incremented and this component is rerended to show that many textareas */}
        {essayInputs.map((item, index) => (
          <div key={"container-"+index}>

          <textarea 
          className="border-2 border-black resize" 
          type="text" 
          name="essay" 
          rows={10} 
          cols={50} 
          key={index}
          onChange={e => handleChange(index, e)}

          value={item}
          />


          <button 
          type="button"
          key={"btn-" + index} 
          className='w-8 h-8 block bg-red-400 border-2 border-black' 
          onClick={() => removeTextBox(index)}>-</button>

          </div>
        ))}

        
        {/*buttons for adding extra textboxes */}
        {/* need to add the type="button" so that React doesn't trigger a form submit when this button is clicked */}
        <button type="button" onClick={addTextBox} className='w-8 h-8 block bg-green-400 border-2 border-black'>+</button>
        
        <button type="submit" className="block mt-4 bg-gray-500 rounded-lg p-2">Scan</button>
      </form>

      <hr />
        <h1>{value}</h1>
      <hr />
      
    </div>
  )
}

export default InputEssays
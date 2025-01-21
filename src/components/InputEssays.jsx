import React, {useState} from 'react'

function InputEssays() {

  // for displaying the value
  const [values, setValues] = useState(["Paste in your essay in the textbox and press Scan to see the value here"]);
  const [essayInputs, setEssayInputs] = useState([""])

  // submits the form, talks to the server to get the value of the essay
  const handleSubmit = async (e) => {
    
    e.preventDefault();

    // gets the form data, converts to JSON
    const formJson = JSON.stringify(essayInputs);

    console.log(formJson);

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
      setValues(value) //the DOM automatically renders when the value is set
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
    <div className='p-10 md:px-60'>

      {/*buttons for adding extra textboxes */}
      {/* need to add the type="button" so that React doesn't trigger a form submit when this button is clicked */}
      <button type="button" onClick={addTextBox} className='p-2 rounded-lg bg-green-400 border-2 hover:bg-opacity-80 transition-colors border-accent'>+ Add New Essay</button>
        
        
      <form onSubmit={handleSubmit} className='my-5 md:my-20 space-y-10'>
        {/* iterating over the number of textareas, if the below button is clicked, the essayInputs state is incremented and this component is rerended to show that many textareas */}
        {essayInputs.map((item, index) => (
          
          <div key={"container-"+index} className=' space-y-5'>
          
          <button 
            type="button"
            key={"btn-" + index} 
            className='w-8 h-8 block float-right bg-red-400 border-2 border-black mb-5' 
            onClick={() => removeTextBox(index)}>-</button>

          <div className='md:flex space-x-10'>
            
            <textarea 
            className="border-2 border-black resize" 
            type="text" 
            name="essay" 
            rows={10} 
            cols={49} 
            key={index}
            onChange={e => handleChange(index, e)}

            value={item}
            />


            <div className='w-auto md:my-auto'>

              <h1 className='text-2xl font-medium'>{values[index]}</h1>

            </div>
          </div>
          

          <hr className='border border-accent '/>

          </div>
        ))}

        
        <button type="submit" className="block mt-4 min-w-20 bg-gray-500 rounded-lg p-2 border-2 hover:bg-opacity-80 transition-colors border-accent">Scan</button>
      </form>
      
    </div>
  )
}

export default InputEssays
import React from 'react'

function InputEssays() {

    const onSubmit = (essay) => {
        console.log(`your essay is: ${essay}`)
    }

  return (
    <div>
        <form action={onSubmit}>
            <input className="border-2 border-black m-4" type="text" name="essay"/>
            <button className="bg-gray-500 rounded-lg p-2" type="submit">Scan</button>
        </form>
    </div>
  )
}

export default InputEssays
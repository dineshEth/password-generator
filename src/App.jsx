import { useEffect, useRef } from "react";
import { useCallback } from "react";
import { useState } from "react"

function App() {

  const passwordRef = useRef(null);
  const [length, setLength] = useState(8)
  const [password , setPassword] = useState('1234rftg%');
  const [number, setNumber] = useState(false);
  const [Character, setCharacter] = useState(false);

  const handleCopy =()=>{
    // console.log(passwordRef)
    passwordRef.current?.select();   // select the targeted text;
    window.navigator.clipboard.writeText(passwordRef.current?.value);
  }

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = 'AzByCxDwEvFuGtHsIrJqKpLoMnNmOlPkQjRiShTgUfVeWdXcYbZa';
    if(number) str += '0123456789';
    if(Character) str += '!@#$%^&*()+{}';
    for(let ch= 1; ch<=length;ch++){
      let index = Math.floor(Math.random()*str.length + 1);
      pass += str.charAt(index);
    }
    setPassword(pass);
  },[length, number, Character]);

  useEffect(()=>{
    passwordGenerator();
  },[length, number, Character, passwordGenerator])


  return (
    <div className="bg-[#0e012f] px-1 w-full h-screen text-center text-white py-4 text-xl">
      <div className="w-full h-full flex flex-col justify-start items-center">
        <h1 className="text-[#e0166a] text-5xl font-extrabold mb-8">Password Generator</h1>
        <div className="bg-[#23034e] rounded-xl p-4 justify-center items-center flex-col gap-y-4">
          <div className="flex justify-center ">
            <input 
            type="text"
            value={password} 
            onChange={passwordGenerator}
            ref={passwordRef}
            readOnly
            className="text-[#e0166a] px-1 w-full text-3xl  py-0 outline-none rounded-tl-md rounded-bl-md"
            placeholder="password"
            />
            <button
            onClick={handleCopy}
            className="bg-[#e0166a]  px-4 py-2 text-xl rounded-tr-md rounded-br-md">Copy</button>
          </div>
          <div className="flex flex-wrap mt-4 justify-between items-center gap-4">
            <div className="inline-flex justify-center items-center gap-1">
              <input 
                className="accent-[#e0166a]"
                type="range" 
                min={6}
                max={24}
                value={length}
                onChange={(e)=>setLength(e.target.value)}
                />
              <label className="text-[#e0166a]">Length [{length}]</label>
            </div>
            <div className="inline-flex justify-center items-center gap-1">
              <input 
              type="checkbox"
              className="accent-[#e0166a] w-4 h-4  border-blue-600" 
              onChange={()=>setNumber(!number)}
              />
              <label className="text-[#e0166a]" >Number</label>
            </div>
            <div className="inline-flex justify-center items-center gap-1">
              <input type="checkbox"
              className=" accent-[#e0166a] border-blue-600 w-4 h-4" 
              onChange={()=>setCharacter(!Character)}  />
              <label className="text-[#e0166a]" >Characters</label>
            </div>
          </div>
        </div>
      </div>
    </div>  
  )
}

export default App

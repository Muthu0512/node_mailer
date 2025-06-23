import { useState } from "react";
import axios from "axios"
import * as XLSX from "xlsx"

function App() {
  const [msg,setMsg]=useState()
  const [status,setStatus]=useState(false)
  const [emailList,setEmailList]=useState([])


  const handleMsg=(e)=>{
    setMsg(e.target.value)

  }

  function sendMail(){
    setStatus(true)
    axios.post("http://localhost:5000/sendmail",{msg:msg,emailList:emailList}).then(function(data){
      if(data.data===true){
        alert("Message sent successfullly")
         setStatus(false)
      }
      else{
        alert("Error , try again")
        setStatus(false)
      }
    })
    setMsg('')
    
    
  }

  function handlemail(e){
    const file= e.target.files[0]

    const reader=new FileReader()

     reader.onload =function(e){
      const data=e.target.result
      const workbook =XLSX.read(data,{type:"binary"})
      const sheetName =workbook.SheetNames[0]
      const workSheet =workbook.Sheets[sheetName]
      const emaillist=XLSX.utils.sheet_to_json(workSheet,{header:"A"})
      const totalemail=emaillist.map(function(item){return item.A})
      console.log(totalemail)
      setEmailList(totalemail)
     }
     reader.readAsBinaryString(file)
  }
  return (
    <div className="bg-emerald-200 p-1 h-screen">
      <section className="bg-emerald-950 text-center text-white py-5 mt-2">
        <h1 className="font-medium text-2xl py-2">Bulk Mail App</h1>
      </section>
      <section className="bg-emerald-800 text-center text-white py-5 ">
        <h1 className="font-medium text-1xl py-2">
          We help you to send multiple Emails whitin a short time
        </h1>
      </section>
      <section className="bg-emerald-600 text-center text-white py-5 ">
        <h1 className="font-medium text-1xl py-2">Drag and Drop below</h1>
      </section>
      <section className="bg-emerald-400 flex flex-col items-center text-black gap-5  py-8">
        <textarea onChange={handleMsg} value={msg} className="w-[60%] h-28 border-emerald-800 border-2"></textarea>
        <input onChange={handlemail}
          type="file"
          className="border-4 border-black border-dotted px-4   py-2"
        />
        <p> Total Emails in the file is : {emailList.length}</p>
        <button onClick={sendMail} className="bg-emerald-600 px-6 py-2 border-2 border-emerald-200 rounded-lg text-white">{status? "sending.." :"send"}</button>
      </section>
      <section className="bg-emerald-300 text-center py-5 "></section>
      <section className="bg-emerald-200 text-center py-5 "></section>
    </div>
  );
}

export default App;

import { useState ,useEffect} from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";



function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString=localStorage.getItem("todos")
    if(todoString){
      let todos=JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])  
  
  
  const toggleFinished =(e)=>{
   setshowFinished(!showFinished)
  }

  // const saveToLS=()=>{
  //   localStorage.setItem("todos".JSON.Stringify(todos))
  // }

  const saveToLS = () => {
  if (todos && todos.length > 0) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};


  const handleEdit=(e,id)=>{
   let t=todos.filter(i=>i.id===id)
   setTodo(t[0].todo)
   setTodos(prev => prev.filter(item => item.id !== id));
   saveToLS();

  }

  //  const handleDelete=(e,id)=>{
  //   let newTodos=todos.filter(item=>{
  //     return item.id!==id
  //   })  
  //   setTodo(newTodos)
  // } 

  const handleDelete = (e, id) => {
  setTodos(prev => prev.filter(item => item.id !== id));
  saveToLS();
};


  const handleAdd=()=>{
    setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    setTodo("")
    saveToLS();
  }

  const handleChnage=(e)=>{
    setTodo(e.target.value)
  }

  const handleCheckbox=(e)=>{
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    let newTodos=[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS();
  }

  return (
    <>
    <Navbar/>
      <div className="md:container md:mx-auto bg-violet-100 rounded-xl my-5 p-5 min-h-[80vh] md:w-1/2">
      <h1 className='text-center font-bold text-xl'>iTask-Manage your todo at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='font-bold text-lg'>Add a Todo</h2>
          <div className="flex">
          <input onChange={handleChnage} value={todo} type="text" className='w-full rounded-lg px-2 py-1'/>
          <button onClick={handleAdd} disabled={todo.length<1} className='mx-2 hover:bg-blue-800 font-bold disabled:bg-violet-400 bg-purple-700 text-sm p-2 rounded-md text-white py-1'>Add</button>
          </div>
        </div>
           <input className='my-4 mx-2' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} />
           <lebel for='show'>Show Finished</lebel>
          <div className='h-[1px] w-[90%] bg-black mx-auto opacity-30 my-4'></div>

          <h2 className='text-lg font-bold'>Your todos</h2>
          <div className="todos">
            {todos.length===0 && <div className='m-5'>No Todos to display</div>}
            {todos.map((item)=>{

           return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between   my-3">
            <div className='flex gap-5'>
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>

              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e,item.id)}} className='hover:bg-blue-800 font-bold bg-purple-700 text-sm p-2 rounded-md text-white mx-1 py-1'><FaEdit/></button>
                <button onClick={(e)=>{handleDelete(e,item.id)}} className='hover:bg-blue-800 font-bold bg-purple-700 text-sm p-2 rounded-md text-white mx-1 py-1'><AiFillDelete/>
</button>
              </div>
            </div>
})}
          </div>

        
      </div>
    </>
  )
}

export default App

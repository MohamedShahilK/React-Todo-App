
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [toDo, setToDo] = useState('')
  // const [toDos, setToDos] = useState([])
  const [toDos, setToDos] = useState(()=>{

    const saved = localStorage.getItem("Storage");
    const initialValue = JSON.parse(saved)
    return (initialValue || "")
  })

  useEffect(()=>{
    localStorage.setItem("Storage",JSON.stringify(toDos))
  },[toDos])

  const handleUserInput = (e) => {
    setToDo(e.target.value)
  }
  const clearUserInput = () => {
    setToDo('')
  }
  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (toDo) {

      setToDos([...toDos,
      {
        id: Date.now(),
        text: toDo,
        statusDone: false,
        statusDropped: false,
        statusRetrieve: false,
        // statusRemove: false
      }
      ])
      setToDo('')
    }
  }


  return (
    <div className="app">

      {/* Heading Start*/}
      <div className="heading">
        <div className="mainHeading">
          <h1>Todo List</h1>
        </div>
        <div className="subHeading">
          <h2>Hey, it's Wednesday</h2>
        </div>
      </div>
      {/* Heading End*/}

      {/* Input Form Start*/}
      <form onSubmit={handleInputSubmit} >
        <div className="todoInput">
          <div className="inputField">
            <input onChange={handleUserInput} value={toDo} type="text" placeholder='Note it Down ...' />
          </div>
          <div className="buttons">
            <div className="erase-button">
              <i onClick={clearUserInput} class="fa-solid fa-eraser" title='Clear'></i>
            </div>
            <div >
              <button className="add-button" style={{ backgroundColor: "rgb(0, 9, 14)", border: 'none' }} type='submit'><i class="fa-solid fa-location-arrow" title='Add'></i></button>
            </div>
          </div>
        </div>
      </form>
      {/* Input Form End*/}

      {/* DoneList Container Start */}

      <div className="container">
        <h3>Completed List</h3>

        {

          toDos && toDos.map((eachTodo) => {

            if (eachTodo.statusDone) {
              return (
                <div key={eachTodo.id} className="toDoList">

                  <div className="toDoListText">
                    <p className='textChecked'>{eachTodo.text}</p>
                  </div>

                  <div className="delete">
                    <i onClick={() => {

                      let isdelete = window.confirm('Do you want to remove it?')
                      if (isdelete) {

                        setToDos(toDos.filter((elem) => {

                          if (elem.id === eachTodo.id) {
                            elem = null
                          }
                          return elem
                        }))
                      }

                    }} class="fa-solid fa-trash" title='Remove'></i>

                  </div>

                </div>
              )
            }
            return null
          })
        }


      </div>

      <div className="container">

        <h3>Ongoing List</h3>
        {
          toDos && toDos.map((eachTodo) => {

            if (!eachTodo.statusDone && !eachTodo.statusDropped) {
              return (
                <div key={eachTodo.id} className='toDoList'>

                  <div className="addtocompletelist">
                    <i onClick={() => {

                      let value = true
                      setToDos(toDos.filter((elem) => {

                        if (elem.id === eachTodo.id) {
                          elem.statusDone = value
                        }
                        return elem
                      }))
                    }} class="fa-solid fa-clipboard-check" title='Done'></i>
                  </div>

                  <div className="toDoListText">
                    <p>{eachTodo.text}</p>
                  </div>

                  <div className="drop_delete">
                    <div className="delete">
                      <i onClick={() => {

                        let isdelete = window.confirm('Do you want to remove it?')
                        if (isdelete) {

                          setToDos(toDos.filter((elem) => {

                            if (elem.id === eachTodo.id) {
                              elem = null
                            }
                            return elem
                          }))
                        }

                      }} class="fa-solid fa-trash" title='Remove'></i>
                    </div>
                    <div className="drop">
                      <i onClick={(e) => {

                        e.target.value = true
                        setToDos(toDos.filter((elem) => {
                          if (elem.id === eachTodo.id) {
                            elem.statusDropped = e.target.value
                          }
                          return elem
                        }))
                      }} class="fa-solid fa-xmark" title='Drop'></i>
                    </div>
                  </div>

                </div>
              )
            } else if (eachTodo.statusRetrieve && !eachTodo.statusDropped) {
              <div key={eachTodo.id} className='toDoList'>

                <div className="addtocompletelist">
                  <i onClick={() => {

                    let value = true
                    setToDos(toDos.filter((elem) => {

                      if (elem.id === eachTodo.id) {
                        elem.statusDone = value
                      }
                      return elem
                    }))
                  }} class="fa-solid fa-clipboard-check" title='Done'></i>
                </div>

                <div className="toDoListText">
                  <p>{eachTodo.text}</p>
                </div>

                <div className="drop_delete">
                  <div className="delete">
                    <i onClick={() => {

                      let isdelete = window.confirm('Do you want to remove it?')
                      if (isdelete) {

                        setToDos(toDos.filter((elem) => {

                          if (elem.id === eachTodo.id) {
                            elem = null
                          }
                          return elem
                        }))
                      }

                    }} class="fa-solid fa-trash" title='Remove'></i>
                  </div>
                  <div className="drop">
                    <i onClick={(e) => {

                      e.target.value = true
                      setToDos(toDos.filter((elem) => {
                        if (elem.id === eachTodo.id) {
                          elem.statusDropped = e.target.value
                        }
                        return elem
                      }))
                    }} class="fa-solid fa-xmark" title='Drop'></i>
                  </div>
                </div>

              </div>
            }
            return null
          })
        }
      </div>

      <div className="container">
        <h3>Dropped List</h3>

        {
          toDos && toDos.map((eachTodo) => {

            if (eachTodo.statusDropped) {
              return (

                <div className="toDoList">

                  <div className="retrieve">
                    <i onClick={(e) => {

                      e.target.value = true
                      setToDos(toDos.filter((elem) => {
                        if (elem.id === eachTodo.id) {
                          elem.statusRetrieve = e.target.value
                          elem.statusDropped = !e.target.value
                        }
                        return elem

                      }))
                    }} class="fa-solid fa-rotate-right" title='Retrieve'></i>
                  </div>

                  <div className="toDoListText">
                    <p>{eachTodo.text}</p>
                  </div>

                  <div className="delete">
                    <i onClick={() => {

                      let isdelete = window.confirm('Do you want to remove it?')
                      if (isdelete) {

                        setToDos(toDos.filter((elem) => {

                          if (elem.id === eachTodo.id) {
                            elem = null
                          }
                          return elem
                        }))
                      }

                    }} class="fa-solid fa-trash" title='Remove'></i>

                  </div>

                </div>
              )
            } return null
          })

        }

      </div>



      {/* DoneList Container End */}

    </div>
  );
}

export default App;

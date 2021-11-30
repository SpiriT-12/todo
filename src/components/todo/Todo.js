import React, { useState, useEffect } from 'react';
import './style.css';

// get the localStorage data back
const getLocalData = () => {
   const lists = localStorage.getItem('mytodolist');

   if (lists) {
      return JSON.parse(lists);
   } else {
      return [];
   }
};

const Todo = () => {
   const [inputdata, setInputData] = useState('');
   const [items, setItems] = useState(getLocalData());
   const [isEditItem, setIsEditItem] = useState('');
   const [toggleButton, setToggleButton] = useState(false);

   // add the items fucnction
   const addItem = () => {
      if (!inputdata) {
         alert('plz fill the data');
      } else if (inputdata && toggleButton) {
         setItems(
            items.map((curElement) => {
               if (curElement.id === isEditItem) {
                  return { ...curElement, name: inputdata };
               }
               return curElement;
            })
         );

         setInputData('');
         setIsEditItem(null);
         setToggleButton(false);
      } else {
         const myNewInputData = {
            id: new Date().getTime().toString(),
            name: inputdata,
         };
         setItems([...items, myNewInputData]);
         setInputData('');
      }
   };

   //edit the items
   const editItem = (index) => {
      const item_todo_edited = items.find((curElement) => {
         return curElement.id === index;
      });
      setInputData(item_todo_edited.name);
      setIsEditItem(index);
      setToggleButton(true);
   };

   // how to delete items section
   const deleteItem = (index) => {
      const updatedItems = items.filter((curElement) => {
         return curElement.id !== index;
      });
      setItems(updatedItems);
   };

   // remove all the elements
   const removeAll = () => {
      setItems([]);
   };

   // adding localStorage
   useEffect(() => {
      localStorage.setItem('mytodolist', JSON.stringify(items));
   }, [items]);

   return (
      <>
         <div className='main-div'>
            <div className='child-div'>
               <figure>
                  <img src='./images/todo.svg' alt='todologo' />
                  <figcaption>Add Your List Here ✌</figcaption>
               </figure>
               <div className='addItems'>
                  <input
                     type='text'
                     placeholder='✍ Add Item'
                     className='form-control'
                     value={inputdata}
                     onChange={(event) => setInputData(event.target.value)}
                  />
                  {toggleButton ? (
                     <i className='fad fa-edit add-btn' onClick={addItem}></i>
                  ) : (
                     <i className='fad fa-plus add-btn' onClick={addItem}></i>
                  )}
               </div>
               {/* show our items  */}
               <div className='showItems'>
                  {items.map((curElement) => {
                     return (
                        <div className='eachItem' key={curElement.id}>
                           <h3>{curElement.name}</h3>
                           <div className='todo-btn'>
                              <i
                                 className='fad fa-edit add-btn'
                                 onClick={() => editItem(curElement.id)}
                              ></i>
                              <i
                                 className='fad fa-trash add-btn'
                                 onClick={() => deleteItem(curElement.id)}
                              ></i>
                           </div>
                        </div>
                     );
                  })}
               </div>

               {/* rmeove all button  */}
               <div className='showItems'>
                  <button
                     className='btn effect04'
                     data-sm-link-text='Remove All'
                     onClick={removeAll}
                  >
                     <span> CHECK LIST</span>
                  </button>
               </div>
            </div>
         </div>
      </>
   );
};

export default Todo;

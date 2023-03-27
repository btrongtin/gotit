import React from 'react'
import { Link } from 'react-router-dom';

const GoalUserList = (props) => {
  const {users, handleFilterCardByUsers} = props
  // console.log('USER NE', users)


  return (
    <ul className="flex flex-wrap justify-center sm:justify-start mb-8 sm:mb-0 -space-x-3 -ml-px">
      {users && users.map((user, index) => 
        (<li key={index}>
          {/* <div className="block" onClick={handleFilterCardByUsers}> */}
            <img onClick={handleFilterCardByUsers} name={user.uid} className="cursor-pointer w-9 h-9 rounded-full" src={user.photoURL} width="36" height="36" alt="User 01" />
          {/* </div> */}
        </li>) 
      )}
      
      {/* <li>
        <button className="flex justify-center items-center w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-indigo-500 shadow-sm transition duration-150 ml-2">
          <span className="sr-only">Add new user</span>
          <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
          </svg>
        </button>
      </li> */}
    </ul>
  )
}

export default GoalUserList
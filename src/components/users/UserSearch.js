import { useState, useContext } from 'react'
import { searchUsers } from '../../context/github/GithubActions'

import GithubContext from '../../context/github/GithubContext'
import AlertContext from '../../context/alert/AlertContext'

function UserSearch() {
    const [ text, setText ] = useState('')
    const { users, dispatch } = useContext(GithubContext)
    const { setAlert } = useContext(AlertContext)

    const handleChange = (e) => setText(e.target.value)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(text === '') {
            setAlert('Please enter something', 'error')
        } else {
            dispatch({type: 'SET_LOADING'})
            const users = await searchUsers(text)
            dispatch({type: 'GET_USERS', payload: users})
            setText('')
        }
    }
  return (
    <div className='grid gird-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
        <div>
            <form onSubmit={handleSubmit}>
                <div className='form-control'>
                    <div className="relative">
                        <input type="text" className="w-full pr-40 bg-gray-200 input input-lg text-black" 
                                placeholder='search' value={text} onChange={handleChange} />
                        <button className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg">Submit</button>
                    </div>
                </div>
                {users.length > 0 && (
                <div>
                    <button className="btn btn-ghost btn-lg"
                        onClick={()=> dispatch({type:'CLEAR_USERS'})}>
                        Clear
                    </button>
                </div>
                )}
            </form>
        </div>
    </div>
  )
}

export default UserSearch
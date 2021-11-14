import {MdDelete} from 'react-icons/md'
import './index.css'

const UserList = props => {
  const {Details, deleteUser} = props
  const {id, email, firstName, lastName, avatar} = Details
  const onDelete = () => {
    deleteUser(id)
  }
  return (
    <li className="user-container">
      <img src={avatar} alt={`avatar ${id}`} className="imageE" />
      <h1 className="name">{firstName}</h1>
      <h1 className="name">{lastName}</h1>
      <h1 className="emailE">{email}</h1>
      <button type="button" className="delete-button" onClick={onDelete}>
        <MdDelete className="delete-icon" />
      </button>
    </li>
  )
}

export default UserList

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {MdSearch} from 'react-icons/md'
import UserList from '../UserList'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserDetails extends Component {
  state = {
    searchInput: '',
    pageNo: '',
    userDetailsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getUserDetails()
  }

  onFirstPage = () => {
    this.setState({pageNo: 1}, this.getUserDetails)
  }

  onSecondPage = () => {
    this.setState({pageNo: 2}, this.getUserDetails)
  }

  onReload = () => {
    this.getUserDetails()
  }

  getUserDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {pageNo} = this.state
    const apiUrl = `https://reqres.in/api/users?page=${pageNo}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.data.map(x => ({
        id: x.id,
        email: x.email,
        firstName: x.first_name,
        lastName: x.last_name,
        avatar: x.avatar,
      }))
      this.setState({
        userDetailsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteUser = id => {
    const {userDetailsList} = this.state
    const filteredData = userDetailsList.filter(x => x.id !== id)
    this.setState({userDetailsList: filteredData})
  }

  renderUserList = () => {
    const {userDetailsList, searchInput} = this.state
    const searchResults = userDetailsList.filter(x =>
      x.firstName.includes(searchInput),
    )
    return (
      <div className="user-details-container">
        <h1 className="user-list-heading">User Details List</h1>
        <div className="input-container">
          <label htmlFor="searchE">
            <MdSearch className="search-icon" />
          </label>
          <input
            type="search"
            id="searchE"
            value={searchInput}
            placeholder="search with First Name"
            className="search-element"
            onChange={this.onSearchInput}
          />
        </div>
        <ul className="user-list">
          <div className="user-heading-container">
            <p className="user-profile">Profile Image</p>
            <p className="user-profile">First Name</p>
            <p className="user-profile">Last Name</p>
            <p className="user-profile">Email</p>
            <p className="user-profile">Delete</p>
          </div>
          {searchResults.map(user => (
            <UserList
              Details={user}
              key={user.id}
              deleteUser={this.deleteUser}
            />
          ))}
        </ul>
        <div className="page-button-container">
          <button
            type="button"
            className="page-button"
            onClick={this.onFirstPage}
          >
            1
          </button>
          <button
            type="button"
            className="page-button"
            onClick={this.onSecondPage}
          >
            2
          </button>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="FailureImage"
        className="failure-image"
      />
      <button type="button" className="reload-button" onClick={this.onReload}>
        Reload
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderUserList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default UserDetails

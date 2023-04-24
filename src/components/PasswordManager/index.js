import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

class PasswordManager extends Component {
  state = {
    web: '',
    user: '',
    pswrd: '',
    passwordsList: [],
    showPassword: false,
    searchInputVal: '',
  }

  websiteChange = event => {
    this.setState({web: event.target.value})
  }

  usernameChange = event => {
    this.setState({user: event.target.value})
  }

  passwordChange = event => {
    this.setState({pswrd: event.target.value})
  }

  addCredentials = event => {
    event.preventDefault()
    const {web, user, pswrd, showPassword} = this.state
    if (web !== '' && user !== '' && pswrd !== '') {
      const newPassword = {
        id: v4(),
        WebsiteName: web,
        UserName: user,
        Password: pswrd,
        ShowPassword: showPassword,
      }
      this.setState(prevstate => ({
        web: '',
        user: '',
        pswrd: '',
        passwordsList: [...prevstate.passwordsList, newPassword],
      }))
    }
  }

  togglePasswords = () => {
    const {showPassword} = this.state
    this.setState(prevState => ({
      showPassword: !showPassword,
      passwordsList: prevState.passwordsList.map(each => ({
        ...each,
        ShowPassword: !each.showPassword,
      })),
    }))
  }

  searchInput = event => {
    this.setState({searchInputVal: event.target.value})
  }

  deleteBtn = id => {
    const {passwordsList} = this.state
    const afterDeletion = passwordsList.filter(eachIt => eachIt.id !== id)
    this.setState({passwordsList: afterDeletion})
  }

  render() {
    const {
      web,
      user,
      pswrd,
      passwordsList,
      searchInputVal,
      showPassword,
    } = this.state
    const filteredList = passwordsList.filter(eachItem =>
      eachItem.WebsiteName.toLowerCase().includes(searchInputVal.toLowerCase()),
    )
    return (
      <div className="mainContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="passwordManagerLogo"
        />
        <div className="addPasswordContainer">
          <form className="addPasswordCard">
            <h1 className="addPasswordCSS">Add New Password</h1>
            <div className="logoAndInputContainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="logoAlter"
              />
              <input
                value={web}
                onChange={this.websiteChange}
                className="inputBoxCSS"
                placeholder="Enter Website"
              />
            </div>
            <div className="logoAndInputContainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="logoAlter"
              />
              <input
                value={user}
                onChange={this.usernameChange}
                className="inputBoxCSS"
                placeholder="Enter Username"
              />
            </div>
            <div className="logoAndInputContainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="logoAlter"
              />
              <input
                value={pswrd}
                onChange={this.passwordChange}
                type="password"
                className="inputBoxCSS"
                placeholder="Enter Password"
              />
            </div>
            <div className="BtnClass">
              <button
                onClick={this.addCredentials}
                className="addBtn"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="containerImage"
          />
        </div>
        <div className="yourPasswordsContainer">
          <div className="passwordsTextAndSearchContainer">
            <div className="headAndPara">
              <h1 className="yourPasswordText">Your Passwords </h1>
              <p className="passwordsCount">{passwordsList.length}</p>
            </div>
            <div className="width logoAndInputContainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="logoAlter"
              />
              <input
                onChange={this.searchInput}
                className="inputBoxCSS"
                placeholder="Search"
                value={searchInputVal}
                type="search"
              />
            </div>
          </div>
          <hr className="lineCSS" />
          <div className="checkAndTextContainer">
            <input
              onClick={this.togglePasswords}
              type="checkBox"
              id="checkBox"
              className="inputCheck"
            />
            <label htmlFor="checkBox" className="labelCSS">
              Show Passwords
            </label>
          </div>
          {!filteredList.length > 0 && (
            <>
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="noPasswordImage"
              />
              <p className="noPasswordsText">No Passwords</p>
            </>
          )}
          <ul className="passwordsList">
            {filteredList.map(eachEntity => (
              <PasswordItem
                key={eachEntity.id}
                showPassword={showPassword}
                details={eachEntity}
                deleteBtn={this.deleteBtn}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default PasswordManager

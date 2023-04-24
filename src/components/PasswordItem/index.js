import './index.css'

const PasswordItem = props => {
  const {details, showPassword, deleteBtn} = props
  const {id, WebsiteName, UserName, Password} = details
  const initial = WebsiteName[0].toUpperCase()
  const deleteFunction = () => {
    deleteBtn(id)
  }

  return (
    <li className="entityContainer">
      <p className="initialEl">{initial}</p>
      <div className="allCredentialsContainer">
        <p className="textCSS">{WebsiteName}</p>
        <p className="textCSS">{UserName}</p>
        {!showPassword && (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            className="passwordStars"
            alt="stars"
          />
        )}
        {showPassword && <p className="textCSS">{Password}</p>}
      </div>
      <button
        onClick={deleteFunction}
        type="button"
        className="deleteBtn"
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          className="deleteIcon"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem

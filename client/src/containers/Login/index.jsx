import React, { useState } from "react"
import EmailIcon from "@mui/icons-material/Email"
import SaveIcon from "@mui/icons-material/Save"
import FacebookIcon from "@mui/icons-material/Facebook"
import GoogleIcon from "@mui/icons-material/Google"
import LockIcon from "@mui/icons-material/Lock"
import { Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()
  const [user, SetUser] = useState({ email: "", password: "" })
  const [email, SetEmail] = useState("")
  //const [password, SetPassword] = useState("")
  const handleSignIn = (event: any) => {
    event.preventDefault()
    const userItem = {
      email: "test@gmail.com",
      password: "abc",
    }
    SetUser(userItem)
    console.log(user)
  }
  return (
    <>
      {user?.email && <Navigate to="/list" replace={true} />}
      <div className="signup-form">
        <h3 className="text-center">SIGN IN</h3>
        <form className="row g-3 justify-content-md-center">
          <div className="col-12">
            <label className="visually-hidden" htmlFor="signUpEmail">
              Email
            </label>
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                id="signUpEmail"
                placeholder="example@yahoo.com"
                value={email}
              />
              <div className="input-group-text">
                <EmailIcon />
              </div>
            </div>
          </div>
          <div className="col-12">
            <label className="visually-hidden" htmlFor="signUpPassword">
              Password
            </label>
            <div className="input-group">
              <input
                type="password"
                className="form-control"
                id="signUpPassword"
                placeholder="*****"
              />
              <div className="input-group-text">
                <LockIcon />
              </div>
            </div>
          </div>

          <div className="text-center ">
            <button className="btn btn-primary" onClick={(event) => handleSignIn(event)}>
              Sign In
            </button>
          </div>
          <div className="text-center">- OR -</div>
          <div className="text-center">
            <button className="btn btn-primary" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

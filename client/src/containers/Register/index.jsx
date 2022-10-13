import React from "react"
import PersonIcon from "@mui/icons-material/Person"
import EmailIcon from "@mui/icons-material/Email"
import SaveIcon from "@mui/icons-material/Save"
import FacebookIcon from "@mui/icons-material/Facebook"
import GoogleIcon from "@mui/icons-material/Google"
import LockIcon from "@mui/icons-material/Lock"

export default function Register() {
  return (
    <div className="signup-form">
      <h3 className="text-center">SIGN UP</h3>
      <form className="row g-3 justify-content-md-center">
        <div className="col-12">
          <label className="visually-hidden" htmlFor="signUpfullName">
            Full Name
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="signUpfullName"
              placeholder="Full Name"
            />
            <div className="input-group-text">
              <PersonIcon />
            </div>
          </div>
        </div>
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

        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="inlineFormCheck" />
              <span className="form-check-label">
                I agree to the <a>term</a>
              </span>
            </div>
            <button type="submit" className="btn btn-primary">
              <SaveIcon />
              Register
            </button>
          </div>
        </div>
        <div className="text-center">- OR -</div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary mx-2">
            <FacebookIcon />
            Sign up using Facebook
          </button>
          <button type="submit" className="btn btn-primary signup-btn-google mx-2">
            <GoogleIcon />
            Sign up using Google+
          </button>
        </div>
      </form>
    </div>
  )
}

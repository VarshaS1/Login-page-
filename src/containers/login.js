
import React from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./login.css";




class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      token: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

  handleChange(event) {
    console.log(event.target)
    const { name, value } = event.target
    this.setState({ [name]: value });

    //this.setState({value: event.target.value});
    //this.setState({value: event.target.value});

  }


  componentDidMount() {
    fetch(
      'http://localhost:3000/jwt'
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ token: data.token })
      })
  }
  validation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //username
    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "*Please enter your username.";
    }

    if (typeof fields["username"] !== "undefined") {
      if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["username"] = "*Please enter alphabet characters only.";
      }
    }


    /*if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    if (typeof fields["password"] !== "undefined") {
      if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        errors["password"] = "*Please enter secure and strong password.";
      }
    }*/
    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  handleSubmit(event) {

    //alert('A name was submitted');
    event.preventDefault();
    fetch(
      'http://localhost:3000/secret', { headers: { 'Authorization': 'Bearer ' + this.state.token } }
    )
      .then(response => response.json())
      .then(data => {
        if (data.code === 200 || data.code === 204)
          alert("Login Successful")
        else if (data.error)
          alert(data.error)
      }).catch(err => { alert("Authorization error") });

  }
  render() {
    const { username, password } = this.state;
    const isEnabled = username.trim().length > 0 && password.length > 0;
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username">
            <FormLabel>UserName</FormLabel>
            <FormControl
              autoFocus
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password">
            <FormLabel>Password</FormLabel>
            <FormControl
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />

          </FormGroup>
          <Button type="submit" disabled={!isEnabled}>
            Login
          </Button>

        </form>
      </div>
    );
  }
}


export default Login;

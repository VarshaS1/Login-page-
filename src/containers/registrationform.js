import React from "react";
import './style.css';
import axios from 'axios';
import jquery from "jquery";
import Input from './input';



class RegisterForm extends React.Component {
    constructor() {
        super();
        this.state = {
            fields: {},
            errors: {}
        }
        // this.handleChange = this.handleChange.bind(this);
        //this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
    };
   
    
    handleChange = (e) => {
        let fields = this.state.fields;
        const char = e.target.value;
        const isLowerCase = char => char.toLowerCase() === char;
        const swapCase = char => isLowerCase(char) ? char.toUpperCase() : char.toLowerCase();
        fields[e.target.name] = e.target.value;
        fields[e.target.name] =swapCase;
        this.setState({
            fields
        });
    }

    submituserRegistrationForm = (e) => {
        e.preventDefault();
        let field = this.state.fields;

        if (this.validateForm()) {
            console.log("Inside Form Data" + JSON.stringify(field));
            this.setState({ fields: field });
        }

        console.log("Outside Form Data" + JSON.stringify(field))

        var data = field;
        // jquery.ajax({
        //     method: "POST",
        //     url: 'http://localhost:8080/api/auth/register',
        //     dataType: 'json',
        //     data: data,
        //     cache: false,
        //     success: function (data) {
        //         this.setState({ fields: data });
        //         console.log('success');
        //         //<Link to="/login"></Link>
        //     }.bind(this),
        //     error: function (xhr, status, err) {
        //         console.error(this.props.url, status, err.toString());
        //         console.log(err);
        //     }.bind(this)
        // });
        axios
        .post("http://localhost:8080/api/auth/register")
        .then(response => console.log(response))
        .catch(error => this.setState({ error, isLoading: false }));
    }

    validateForm() 
    {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["name"]) {
            formIsValid = false;
            errors["nameerror"] = "*Please enter your name.";
        }

        if (typeof fields["name"] !== "undefined") {
            if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["nameerror"] = "*Please enter alphabet characters only.";
            }
        }

        if (!fields["email"]) {
            formIsValid = false;
            errors["emailerror"] = "*Please enter your email-ID.";
        }

        if (typeof fields["email"] !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields["email"])) {
                formIsValid = false;
                errors["emailerror"] = "*Please enter valid email-ID.";
            }
        }

        if (!fields["mobile"]) {
            formIsValid = false;
            errors["mobileerror"] = "*Please enter your mobile no.";
        }

        if (typeof fields["mobile"] !== "undefined") {
            if (!fields["mobile"].match(/^[0-9]{10}$/)) {
                formIsValid = false;
                errors["mobileerror"] = "*Please enter valid mobile no.";
            }
        }

        if (!fields["password"]) {
            formIsValid = false;
            errors["passworderror"] = "*Please enter your password.";
        }

        // if (typeof fields["password"] !== "undefined") {
        //     if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        //         formIsValid = false;
        //         errors["password"] = "*Please enter secure and strong password.";
        //     }
        // }

        this.setState({
            errors: errors
        });
        return formIsValid;
    }
    render()
     {
        const { fields: { name, email, mobile, password } } = this.state;
        const { errors: { nameerror, emailerror, mobileerror, passworderror } } = this.state;
        return (
            <div id="main-registration-container">
                <div id="register">
                    <h3>Registration page</h3>
                    <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm} >
                        <Input
                            type="text"
                            title={'Name'}
                            name="name"
                            value={name}
                            handleChange={this.handleChange}
                            className="errorMsg"
                            valueerror={nameerror}
                        />

                        <Input
                            type="text"
                            title={'emailID'}
                            name="email"
                            value={email}
                            handleChange={this.handleChange}
                            className="errorMsg"
                            valueerror={emailerror}
                        />

                        <Input
                            type="text"
                            title={'Mobile No'}
                            name="mobile"
                            value={mobile}
                            handleChange={this.handleChange}
                            className="errorMsg"
                            valueerror={mobileerror}

                        />

                        <Input
                            type="password"
                            title={'password'}
                            name="password"
                            value={password}
                            handleChange={this.handleChange}
                            className="errorMsg"
                            valueerror={passworderror}
                        />


                        {/* <input type="text" name="email" value={email} onChange={this.handleChange} />
                        <div className="errorMsg">{emailerror}</div> */}

                        {/* <input type="text" name="mobile" value={mobile} onChange={this.handleChange} />
                        <div className="errorMsg">{mobileerror}</div> */}

                        {/* <input type="password" name="password" value={password} onChange={this.handleChange} />
                        <div className="errorMsg">{passworderror}</div> */}
                        <input type="submit" className="button" value="Register" />
                    </form>
                </div>
            </div>
        );
    }
}
export default RegisterForm;


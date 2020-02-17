import React from 'react';
import './style.css';
import jquery  from "jquery";


class RegisterForm extends React.Component {
    constructor() {
        super();
        this.state = {
            fields: {},
            errors: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    };

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });

    }

    submituserRegistrationForm=(e)=> {
        e.preventDefault();
        let field = this.state.fields;

        if (this.validateForm()) {
            console.log("Inside Form Data" + JSON.stringify(field));
            this.setState({ fields: field });
        }

        console.log("Outside Form Data" + JSON.stringify(field))

       // alert(this.fields["name"]);

       var data = field;

        jquery.ajax({
            method: "POST",
            url: 'http://localhost:8080/api/auth/register',
            dataType: 'json',
            data:data,
            cache: false,
            success: function(data) {
              this.setState({fields: data});
              console.log('success');
            }.bind(this),
            error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
              console.log(err);
            }.bind(this)
          });

    }

    validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "*Please enter your name.";
        }

        if (typeof fields["name"] !== "undefined") {
            if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["name"] = "*Please enter alphabet characters only.";
            }
        }

        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "*Please enter your email-ID.";
        }

        if (typeof fields["email"] !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields["email"])) {
                formIsValid = false;
                errors["email"] = "*Please enter valid email-ID.";
            }
        }

        if (!fields["mobile"]) {
            formIsValid = false;
            errors["mobile"] = "*Please enter your mobile no.";
        }

        if (typeof fields["mobile"] !== "undefined") {
            if (!fields["mobile"].match(/^[0-9]{10}$/)) {
                formIsValid = false;
                errors["mobile"] = "*Please enter valid mobile no.";
            }
        }

        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
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
    render() {
        return (
            <div id="main-registration-container">
                <div id="register">
                    <h3>Registration page</h3>
                    <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm} >
                        <label>Name</label>
                        <input type="text" name="name" value={this.state.fields.name} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.name}</div>
                        <label>Email ID:</label>
                        <input type="text" name="email" value={this.state.fields.email} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.email}</div>
                        <label>Mobile No:</label>
                        <input type="text" name="mobile" value={this.state.fields.mobile} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.mobile}</div>
                        <label>Password</label>
                        <input type="password" name="password" value={this.state.fields.password} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.password}</div>
                        <input type="submit" className="button" value="Register" />
                    </form>
                </div>
            </div>
        );
    }
}
export default RegisterForm;


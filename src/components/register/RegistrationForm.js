import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {register} from "../../actions/authActions";
import FormInput from '../common/FormInput';
import validate from '../../utils/formValidator';
import Footer from '../common/Footer';
import {withRouter} from 'react-router-dom';

export class RegistrationForm extends Component {
    constructor(props, context) {
        super(props, context);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(values) {
        this.props.register(values)
            .then(() => {
                if (this.props.registered) {
                    //this.context.router.history.push('/login');
                     this.props.history.push('/login')
                }
            });
    }

    render() {
        const { handleSubmit, loading } = this.props;
        let button = '';

        if (loading) {
            button = <Button type="submit" inverted disabled loading color="purple" className="fluid">𝐑𝐞𝐠𝐢𝐬𝐭𝐞𝐫</Button>;
        } else {
            button = <Button type="submit" inverted color="purple" className="fluid">𝐑𝐞𝐠𝐢𝐬𝐭𝐞𝐫</Button>;
        }

        return(
            <div className="ui center aligned inverted landingContent">
                <img src={process.env.PUBLIC_URL + '/img/back.jpg'} alt="background" />
                <div className="overlay" />

                <div className="ui inverted center aligned grid">
                    <div className="ui inverted container formContainer">
                        <Form onSubmit={handleSubmit(this.onSubmit)}>
                            <h1 className="ui inverted header">𝐑𝐞𝐠𝐢𝐬𝐭𝐞𝐫</h1>
                            <FormInput
                                type="text"
                                placeholder="name"
                                name="name"
                                required="required"
                                icon="user"/>

                            <FormInput
                                type="text"
                                placeholder="Lastname"
                                name="Lastname"
                                required="required"
                                icon="user"/>

                            <FormInput
                                type="text"
                                placeholder="Username"
                                name="username"
                                required="required"
                                icon="user"/>

                            <FormInput
                                type="email"
                                placeholder="Email"
                                name="email"
                                required="required"
                                icon="mail"/>

                            <FormInput
                                type="password"
                                placeholder="Password"
                                name="password"
                                required="required"
                                icon="key"/>

                            <FormInput
                                type="password"
                                placeholder="Confirm Password"
                                name="c_password"
                                required="required"
                                icon="key"/>

                            <FormInput
                                type="Number"
                                placeholder="Mobile Number"
                                name="mobilenumber"
                                required="required"
                                icon="mobile"/>

                            { button }
                        </Form>

                        <br/>
                        <p className="ui inverted">
                            Already have an account? <Link to="/login" className="formLink">𝐒𝐢𝐠𝐧 𝐈𝐧</Link>
                        </p>
                        <p className="ui inverted">
                            Forgot password? <Link to="/reset" className="formLink">𝐑𝐞𝐬𝐞𝐭 𝐏𝐚𝐬𝐬𝐰𝐨𝐫𝐝</Link>
                        </p>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}

// Pull in the React Router context so router is available on this.context.router.
RegistrationForm.contextTypes = {
    router: PropTypes.object
};

// Define prop types
RegistrationForm.propTypes = {
    loading: PropTypes.bool.isRequired,
    registered: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    register: PropTypes.func
};

// Map store state to component props
export function mapStateToProps(state) {
    return {
        loading: state.auth.loading,
        registered: state.auth.registered
    };
}

export default reduxForm({
    validate,
    form: 'SignUpForm'
})(connect(mapStateToProps, {register})(RegistrationForm));

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Form} from 'semantic-ui-react';
import {reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from "../../actions/authActions";
import FormInput from '../common/FormInput';
import validate from '../../utils/formValidator';
import Footer from '../common/Footer';
import {withRouter} from 'react-router-dom';

export class LoginForm extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            email: '',
            password: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(values) {
        this.props.login(values)
            .then(() => {
                if (this.props.loggedIn) {
                    //this.context.router.history.push('/dashboard');
                    this.props.history.push('/dashboard')
                }
            });
    }

    onChange(event) {
        let fields = {};
        fields[event.target.name] = event.target.value;
        this.setState(fields);
    }

    render() {
        const {handleSubmit, loading} = this.props;
        let button = '';

        if (loading) {
            button = <Button type="submit" inverted disabled loading color="purple" className="fluid">𝐑𝐞𝐠𝐢𝐬𝐭𝐞𝐫</Button>;
        } else {
            button = <Button type="submit" inverted color="purple" className="fluid">Login</Button>;
        }

        return (
            <div className="ui center aligned inverted landingContent">
                <img src={process.env.PUBLIC_URL + '/img/back.jpg'} alt="background"/>
                <div className="overlay"/>

                <div className="ui inverted center aligned grid">
                    <div className="ui inverted container formContainer">
                        <Form onSubmit={handleSubmit(this.onSubmit)} onChange={this.onChange}>
                            <h2 className="ui inverted header">𝐋𝐨𝐠 𝐈𝐧</h2>

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

                            {button}
                        </Form>

                        <br/>
                        <p className="ui inverted">
                            Already have an account? <Link to="/register" className="formLink">𝐒𝐢𝐠𝐧 𝐔𝐩</Link>
                        </p>
                        <p className="ui inverted">
                            Forgot password? <Link to="/reset" className="formLink">𝐑𝐞𝐬𝐞𝐭 𝐏𝐚𝐬𝐬𝐰𝐨𝐫𝐝</Link>
                        </p>
                    </div>
                </div>

                <Footer/>
            </div>
        );
    }
}

// Pull in the React Router context so router is available on this.context.router.
LoginForm.contextTypes = {
    router: PropTypes.object
};

// Define prop types
LoginForm.propTypes = {
    login: PropTypes.func,
    loading: PropTypes.bool.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

// Map store state to component props
export function mapStateToProps(state) {
    return {
        loading: state.auth.loading,
        loggedIn: state.auth.loggedIn
    };
}

export default reduxForm({
    validate,
    form: 'SignInForm'
})(connect(mapStateToProps, {login})(LoginForm));

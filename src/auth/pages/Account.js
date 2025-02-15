import { Form, Icon, Input } from 'antd';
import React, { Component } from 'react';

import { passwordUpdate } from '../api/auth';
import { byPropKey } from '../../shared/utils';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { FormButton } from '../components/common/FormButton';
import { FormContainer } from '../components/common/FormContainer';
import { AuthUserContext } from '../utils/AuthUserContext';
import { withAuthorization } from '../utils/AuthHOC';

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class AccountScreen extends Component {
    state = { ...INITIAL_STATE };

    handleSubmit = (event) => {
        event.preventDefault();

        return passwordUpdate(this.state.passwordOne)
            .then(() => {
                this.props.form.setFieldsValue({
                    passwordOne: '',
                    passwordTwo: '',
                });
            })
            .catch((error) => {
                this.setState(byPropKey('error', error.message));
            });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { error } = this.state;
        return (
            <AuthUserContext.Consumer>
                {(authUser) => (
                    <FormContainer>
                        <h3>Account: {authUser.email}</h3>

                        <Form onSubmit={(event) => this.handleSubmit(event)} className="login-form">
                            <Form.Item>
                                {getFieldDecorator('passwordOne', {
                                    rules: [
                                        { required: true, message: 'Please input your Password!' },
                                    ],
                                })(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="lock"
                                                style={{ color: 'rgba(0,0,0,.25)' }}
                                            />
                                        }
                                        onChange={(event) =>
                                            this.setState(
                                                byPropKey('passwordOne', event.target.value)
                                            )
                                        }
                                        type="password"
                                        placeholder="Password"
                                    />
                                )}
                            </Form.Item>

                            <Form.Item>
                                {getFieldDecorator('passwordTwo', {
                                    rules: [
                                        { required: true, message: 'Please input your Password!' },
                                    ],
                                })(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="lock"
                                                style={{ color: 'rgba(0,0,0,.25)' }}
                                            />
                                        }
                                        onChange={(event) =>
                                            this.setState(
                                                byPropKey('passwordTwo', event.target.value)
                                            )
                                        }
                                        type="password"
                                        placeholder="Password"
                                    />
                                )}
                            </Form.Item>

                            <Form.Item>
                                <FormButton type="primary" htmlType="submit">
                                    Reset my password
                                </FormButton>
                            </Form.Item>

                            <ErrorMessage>{error}</ErrorMessage>
                        </Form>
                    </FormContainer>
                )}
            </AuthUserContext.Consumer>
        );
    }
}

export default withAuthorization((authUser) => !!authUser)(Form.create()(AccountScreen));

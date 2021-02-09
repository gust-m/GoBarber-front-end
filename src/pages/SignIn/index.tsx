/* eslint-disable no-unused-expressions */
import React, { useRef, useCallback } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';

import { useAuth } from '../../hooks/AuthContext';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail required')
            .email('Enter a valid e-mail adress'),
          password: Yup.string().required('At least 6 digits'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    },
    [signIn],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="logo" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Login</h1>

          <Input icon={FiMail} name="email" placeholder="E-mail" />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Password"
          />

          <Button type="submit">Sign In </Button>

          <a href="forgot">Forgot password</a>
        </Form>

        <a href="register">
          Create account
          <FiLogIn />
        </a>
      </Content>

      <Background />
    </Container>
  );
};

export default SignIn;

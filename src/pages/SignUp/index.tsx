/* eslint-disable no-unused-expressions */
import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FaArrowLeft } from 'react-icons/fa';
import * as Yup from 'yup';

import api from '../../services/api';
import { useToast } from '../../hooks/Toast';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { AnimationContainer, Container, Content, Background } from './styles';

import getValidationErrors from '../../utils/getValidationErrors';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignupFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Name required'),
          email: Yup.string()
            .required('E-mail required')
            .email('Enter a valid e-mail adress'),
          password: Yup.string().min(6, 'At least 6 digits'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'sucess',
          title: 'You were registered',
          description: 'You can do login on GoBarber',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Register error',
          description: 'An error has occurred, try again',
        });
      }
    },
    [history, addToast],
  );

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="logo" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Register</h1>

            <Input icon={FiUser} name="name" placeholder="Name" />
            <Input icon={FiMail} name="email" placeholder="E-mail" />
            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Password"
            />

            <Button type="submit">Done</Button>
          </Form>

          <Link to="/">
            <FaArrowLeft />
            Back to Login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;

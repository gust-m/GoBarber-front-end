/* eslint-disable no-unused-expressions */
import React, { useRef, useCallback } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { FiLock } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';

import { useToast } from '../../hooks/Toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { AnimationContainer, Container, Content, Background } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';

interface ResetPasswordFormData {
  email: string;
  password: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('At least 6 digits'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Password are not the same',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        history.push('/signin');

        addToast({
          type: 'sucess',
          title: 'You can make logon with your new password',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Error while trying to change your password',
          description:
            'An error occurred while trying to change your password, try again',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="logo" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Reset Password</h1>

            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="New Password"
            />
            <Input
              icon={FiLock}
              name="password_confirmation"
              type="password"
              placeholder="Confirm new Password"
            />

            <Button type="submit">Change Password </Button>
          </Form>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default ResetPassword;

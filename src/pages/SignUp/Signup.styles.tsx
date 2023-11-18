// Signup.styles.tsx
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 100%;
  text-align: center;
  margin: 0 20px;
`;

export const ContainerUsers = styled.div`
  text-align: center;
  margin: 0 20px;
  border: 1px solid var(--color-content-secondary);
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Adjust the values as needed */
`;

export const Title = styled.h1`
  margin: 0 auto 16px;
`;

export const InlineLink = styled(Link)`
  font-weight: var(--font-weight-semi-bold);
  padding-left: 5px;
  text-decoration: underline;
  text-underline-offset: 0.3em;
  color: var(--color-content-link);

  &:hover {
    color: var(--color-content-link-hover);
  }
`;


export const Label = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.7rem;
`;

export const FormWrapper = styled.div`
margin-bottom: 1rem;
`;

export const Error = styled.div`
  color: red;
  font-size: 0.5rem;
`;

export const PasswordError = styled.label`
  color: red;
`;

export const DataEntry = styled.input`
    width: 90%;
    margin: auto;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    `;
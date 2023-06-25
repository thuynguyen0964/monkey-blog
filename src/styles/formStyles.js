import styled from 'styled-components';

export const FormStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    width: 80px;
    height: 100px;
    object-fit: cover;
    margin-left: auto;
    margin-right: auto;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: 500;
    margin: 16px 0px 30px 0px;
  }

  .form {
    max-width: 600px;
    margin: 0 auto;
  }
  .isHaveAccount {
    text-align: center;
    margin: 20px 0 0 0;
    a {
      color: blueviolet;
      text-decoration: underline;
    }
  }
`;

import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  TextField,
  IconButton,
  InputAdornment,
  Button,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import HttpsIcon from '@material-ui/icons/Https';
import { withStyles } from '@material-ui/core/styles';
import styles from './AuthForm.module.scss';

const ValidationTextField = withStyles({
  root: {
    '& input:valid + fieldset': {
      borderColor: '#2e7d32',
      borderWidth: 2,
    },
    '& input:invalid + fieldset': {
      borderColor: '#c2185b',
      borderWidth: 2,
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important', // override inline-style
    },
  },
})(TextField);

export default function AuthForm({
  shouldRenderName,
  text,
  redirectLinkText,
  redirectPath,
  handleAuthenticate,
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = useCallback(event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'email':
        setEmail(value);
        break;

      case 'password':
        setPassword(value);
        break;

      default:
        throw new Error();
    }
  }, []);

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();

      handleAuthenticate({ name, email, password });
      reset();
    },
    [handleAuthenticate, name, email, password],
  );

  const reset = () => {
    setName('');
    setEmail('');
    setPassword('');
    setShowPassword(false);
  };

  const handleShowPassword = useCallback(() => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  }, []);

  return (
    <form onSubmit={handleSubmit} className={styles.authForm} noValidate>
      <HttpsIcon className={styles.lockIcon} />
      <h2 className={styles.authFormTitle}>{text}</h2>
      {shouldRenderName && (
        <ValidationTextField
          onChange={handleChange}
          className={styles.inputField}
          autoFocus={shouldRenderName ? true : false}
          id="validation-outlined-input"
          type="name"
          name="name"
          value={name}
          label="Name"
          variant="outlined"
          required
          fullWidth
        />
      )}
      <ValidationTextField
        onChange={handleChange}
        className={styles.inputField}
        autoFocus={shouldRenderName ? false : true}
        id="validation-outlined-input"
        type="email"
        name="email"
        value={email}
        label="Email adress"
        variant="outlined"
        required
        fullWidth
      />

      <ValidationTextField
        onChange={handleChange}
        className={styles.inputField}
        id="validation-outlined-input"
        type={showPassword ? 'text' : 'password'}
        name="password"
        value={password}
        label="Password"
        variant="outlined"
        required
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleShowPassword}
                className={styles.passwordIcon}
                aria-label="toggle password visibility"
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        className={styles.authFormBtn}
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        size="large"
      >
        {text}
      </Button>
      <Link to={redirectPath} className={styles.formLink}>
        {redirectLinkText}
      </Link>
    </form>
  );
}

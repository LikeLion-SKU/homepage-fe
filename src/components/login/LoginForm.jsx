import { useState } from 'react';

import EmailInput from './EmailInput';
import ForgotPasswordLink from './ForgotPasswordLink';
import LoginButton from './LoginButton';
import LoginTitle from './LoginTitle';
import PasswordInput from './PasswordInput';
import SignUpLink from './SignUpLink';

export default function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ email, password });
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 sm:px-0">
      <form onSubmit={handleSubmit}>
        <LoginTitle />
        <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
        <ForgotPasswordLink />
      </form>
      <div className="w-full">
        <LoginButton onClick={handleSubmit} disabled={!email || !password} />
      </div>
      <SignUpLink />
    </div>
  );
}

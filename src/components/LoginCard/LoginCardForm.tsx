import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FiLock, FiMail } from "react-icons/fi";

import { Button } from "../common/Button";

interface Props {
  buttonText: string;
  user?: { firstName: string; lastName: string; email: String; };
  loading: boolean;
  isSignInPage?: boolean;
  isAccountPage?: boolean;
  onSubmit: (data: any) => void;
}

export const LoginCardForm = ({ buttonText, loading, user, isSignInPage, isAccountPage, onSubmit }: Props) => {
  const { handleSubmit, register } = useForm();

  return (
    <Form id="form" onSubmit={handleSubmit(onSubmit)}>
      {!isSignInPage && (
        <Form.Group>
          <Form.Label className="login-card__row" htmlFor="loginFormFirstName">
            {isAccountPage ? "First Name (public)" : "First Name"}
          </Form.Label>
          <Form.Control
            className="login-card__input"
            id="loginFormFirstName"
            autoFocus
            required
            placeholder="First Name"
            type="text"
            {...register("firstName")}
            // @ts-ignore
            defaultValue={isAccountPage && user.firstName}
          />
          <Form.Label className="login-card__row" htmlFor="loginFormLastName">
            {isAccountPage ? "Last Name (public)" : "Last Name"}
          </Form.Label>
          <Form.Control
            className="login-card__input"
            id="loginFormLastName"
            required
            placeholder="Last Name"
            type="text"
            {...register("lastName")}
            // @ts-ignore
            defaultValue={isAccountPage && user.lastName}
          />
        </Form.Group>
      )}

      <Form.Group>
        <Form.Label className="login-card__row" htmlFor="loginFormEmailAddress">
          Email Address
        </Form.Label>
        <InputGroup>
          <InputGroup.Text className="login-card__input-icon">
            <FiMail />
          </InputGroup.Text>
          <Form.Control
            autoFocus={isSignInPage}
            className="login-card__input"
            id="loginFormEmailAddress"
            required
            placeholder="Email Address"
            type="email"
            {...register("email")}
            // @ts-ignore
            defaultValue={isAccountPage && user.email}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group>
        <Form.Label className="login-card__row" htmlFor="loginFormPassword">
          Password
        </Form.Label>
        <InputGroup>
          <InputGroup.Text className="login-card__input-icon">
            <FiLock />
          </InputGroup.Text>
          <Form.Control
            className="login-card__input"
            id="loginFormPassword"
            required
            placeholder="Password"
            type="password"
            {...register("password")}
          />
        </InputGroup>
      </Form.Group>

      <Button
        className="login-card__row login-card__button"
        btnText={buttonText}
        title={buttonText}
        type="submit"
        disabled={loading}
      />
    </Form>
  );
};

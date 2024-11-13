import { LoginCardForm } from "./LoginCardForm";
import { LoginCardLink } from "./LoginCardLink";

interface Props {
  loginType: string;
  linkInfo?: { linkPrompt: string; linkText: string; href: string };
  loading: boolean;
  user?: { firstName: string; lastName: string; email :string };
  isSignInPage?: boolean;
  isAccountPage?: boolean;
  onSubmit: (data : any) => void;
}

export const LoginCard = ({ loginType, linkInfo, user, loading, isSignInPage, isAccountPage, onSubmit }: Props) => {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-card__header">{isAccountPage ? "Account" : loginType}</h1>

        <LoginCardForm
          buttonText={loginType}
          loading={loading}
          isSignInPage={isSignInPage}
          isAccountPage={isAccountPage}
          user={user}
          onSubmit={onSubmit}
        />

        {linkInfo && (
          <LoginCardLink linkPrompt={linkInfo.linkPrompt} linkText={linkInfo.linkText} href={linkInfo.href} />
        )}
      </div>
    </div>
  );
};

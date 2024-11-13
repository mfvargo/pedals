import Link from "next/link";

interface Props {
  linkPrompt: string;
  linkText: string;
  href: string;
}
export const LoginCardLink = ({ linkPrompt, linkText, href }: Props) => {
  return (
    <div className="login-card__link">
      {linkPrompt}{" "}
      <span>
        <Link href={`/${href}`} passHref>
          {linkText}
        </Link>
      </span>
    </div>
  );
};

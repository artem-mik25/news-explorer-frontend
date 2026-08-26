import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          &copy; {new Date().getFullYear()} NewsExplorer, Powered by News API
        </p>
        <nav className="footer__nav">
          <ul className="footer__links">
            <li>
              <Link to="/" className="footer__link">
                Home
              </Link>
            </li>
            <li>
              <a
                href="https://tripleten.com"
                className="footer__link"
                target="_blank"
                rel="noreferrer"
              >
                TripleTen
              </a>
            </li>
          </ul>
          <ul className="footer__socials">
            <li>
              <a
                href="https://github.com/artem-mik25"
                className="footer__social-link"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.002 10.002 0 0 0 22 12c0-5.523-4.477-10-10-10Z"
                    fill="#1A1B22"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/"
                className="footer__social-link"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z"
                    fill="#1A1B22"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;

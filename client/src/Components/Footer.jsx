import { Link } from "react-router-dom";
import { logo } from "../../assets";
import { BsLinkedin, BsFillEnvelopeAtFill, BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="tw-bg-base-100 tw-z-20 tw-absolute tw-bottom-0 tw-left-0 tw-right-0">
      <div className="tw-container tw-flex tw-flex-col tw-items-center tw-justify-between tw-px-6 tw-py-2 tw-mx-auto tw-space-y-4 sm:tw-space-y-0 sm:tw-flex-row">
        <Link to="/">
          <img width={50} height={20} src={logo} alt="Duan Logo" />
        </Link>

        <div className="tw-flex tw--mx-2">
          <a
            href="https://linkedin.com/in/duan-chen/"
            className="tw-mx-2 tw-text-white tw-transition-colors tw-duration-300 hover:tw-text-secondary"
            aria-label="linkedin"
            target="_blank"
          >
            <BsLinkedin className="tw-w-8 tw-h-8" />
          </a>

          <a
            href="mailto:duanchenwork@gmail.com"
            className="tw-mx-2 tw-text-white tw-transition-colors tw-duration-300 hover:tw-text-secondary"
            aria-label="Email"
            target="_blank"
          >
            <BsFillEnvelopeAtFill className="tw-w-8 tw-h-8" />
          </a>

          <a
            href="https://github.com/duanhash/StockScreener"
            className="tw-mx-2 tw-text-white tw-transition-colors tw-duration-300 hover:tw-text-secondary"
            aria-label="Github"
            target="_blank"
          >
            <BsGithub className="tw-w-8 tw-h-8" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

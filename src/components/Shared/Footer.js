import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from "@fortawesome/free-brands-svg-icons"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__about">
        <h5 className="footer__about--heading">About Albumphoria</h5>
        <p className="footer__about--text">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae quis hic illo temporibus repellendus magnam omnis dolorum! Accusamus nulla cupiditate, excepturi veniam debitis eaque in, deserunt dolorum vel fugiat ut.
        </p>
      </div>
      <div className="footer__contact">
        <h6 className="footer__contact--subheading">Contact</h6>
        <a href="https://github.com/Dayo-Akinsola">
          <FontAwesomeIcon className="footer__contact--github" icon={faGithub} />
        </a>
        <span className="footer__contact--email">dayoakinsola3@gmail.com</span>
      </div>
    </footer>
  )
}

export default Footer;
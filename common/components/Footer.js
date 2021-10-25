import Link from "next/link";
import {
  UilYoutube,
  UilFacebook,
  UilPhone,
  UilTwitter,
  UilEnvelope,
  UilLinkedin,
} from "@iconscout/react-unicons";

const socials = [
  {
    link: "http://www.facebook.com",
    Icon: UilFacebook,
  },
  {
    link: "http://www.youtube.com",
    Icon: UilYoutube,
  },
  {
    link: "http://www.linkedin.com",
    Icon: UilLinkedin,
  },
  {
    link: "http://www.twitter.com",
    Icon: UilTwitter,
  },
];

const pages = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
];

const Footer = ({}) => {
  return (
    <div className="footer bg-light text-secondary">
      <div className="container">
        <div className="row justify-content-start pt-5">
          {/* footer links */}
          <div className="col-12 col-sm-2">
            <h6 className="text-dark">Links</h6>
            <ul className="list-unstyled ">
              <small>
                {pages.map(({ name, path }, index) => (
                  <li key={index}>
                    <Link passHref={true} href={path}>
                      {name}
                    </Link>
                  </li>
                ))}
              </small>
            </ul>
          </div>

          {/* footer adresses */}
          <div className="col-12 col-sm-10">
            <h6 className="text-dark">Address</h6>
            <address>
              <small>
                2, Not Clear Water Bay Road
                <br />
                Hay el seloum
                <br />
                BEIRUT
                <br />
                <UilPhone />: +961 76 150 843
                <br />
                <UilEnvelope />
                <span>
                  :{" "}
                  <a href="mailto:yammine.yammine@net.usj.edu.lb">
                    yammine.yammine@net.usj.edu.lb
                  </a>
                </span>
              </small>
            </address>
          </div>

          {/* footer social links */}
          <div className="col-12 align-self-center pt-3">
            <div className="text-center">
              {socials.map(({ link, Icon }, index) => (
                <a key={index} className="btn btn-social-icon" href={link}>
                  <Icon className="text-secondary"/>
                </a>
              ))}
            </div>
          </div>
          {/* copy right */}
          <div className="col-12 align-self-center">
            <p className="text-center">
              <small>
                © Copyright {new Date().getFullYear()} Courses Overflow
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

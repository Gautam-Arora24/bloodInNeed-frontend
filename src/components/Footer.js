import React from "react";

export default function Footer() {
  return (
    <div>
      <footer class="site-footer">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-6">
              <h6>About</h6>
              <p class="text-justify">
                Blood In Need is an effort to make donation of blood easier. I
                have tried my hard to make this website easy to use. Any ideas,
                suggestions or bug reports, reach me out to on my social media
                handles. Peace!!!{" "}
              </p>
            </div>

            <div class="col-xs-6 col-md-3">
              <h6>Tech Stack</h6>
              <ul class="footer-links">
                <li>GraphQL</li>
                <li>MongoDB</li>
                <li>Express.js</li>
                <li>Node.js</li>
                <li>React.js</li>
                <li>Bootstrap</li>
              </ul>
            </div>

            <div class="col-xs-6 col-md-3">
              <h6>About Me</h6>
              <ul class="footer-links">
                <li>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/gautam-arora-b2788b191/"
                  >
                    Linkedin
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://github.com/Gautam-Arora24">
                    Github
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.instagram.com/gautamarora6248/?hl=en"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr />
        </div>
        <div class="container">
          <div class="row">
            <div class="col-md-8 col-sm-6 col-xs-12">
              <p class="copyright-text">
                Copyright &copy; {new Date().getFullYear()} All Rights Reserved
                by Gautam Arora
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

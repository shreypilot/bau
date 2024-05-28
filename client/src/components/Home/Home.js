// src/pages/Home.js
import React from "react";
import "./home.css"

const Home = () => {
  return (
    <>

    <main>
      <section id="welcome" class="jumbotron">
        <div class="container text-center">
          <h1>My Portfolio.</h1>
          <p>
            Write a sentence about what you do. Sell it well. Make the world
            know you're awesome.
          </p>
          <p>
            <a class="btn btn-a btn-lg" href="#services" role="button">
              Learn more
            </a>
          </p>
        </div>
      </section>

      <section id="services" class="section-services">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 text-center">
              <h2>Services</h2>
              <h3 class="text-muted">
                Here are my specialties. I'm a badass at all of them.{" "}
              </h3>
            </div>
          </div>
          <div class="row text-center">
            <div class="col-md-4">
              <span class="glyphicon glyphicon-menu-hamburger gi-5x"></span>
              <h4>Responsive Web Design</h4>
              <p class="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Minima maxime quam architecto quo inventore harum ex magni,
                dicta impedit.
              </p>
            </div>
            <div class="col-md-4">
              <span class="glyphicon glyphicon-phone gi-5x"></span>
              <h4>Mobile Applications</h4>
              <p class="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Minima maxime quam architecto quo inventore harum ex magni,
                dicta impedit.
              </p>
            </div>
            <div class="col-md-4">
              <span class="glyphicon glyphicon-cog gi-5x"></span>
              <h4>Full-Stack Development</h4>
              <p class="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Minima maxime quam architecto quo inventore harum ex magni,
                dicta impedit.
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 text-center">
              <p>
                <a class="btn btn-b btn-lg" href="#contact" role="button">
                  Contact me.
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" class="section-contact">
        <div class="container">
          <div class="row text-center">
            <div class="col-md-8 col-md-offset-2">
              <h2>Contact Me</h2>
              <p>
                I'm available for full-time consulting work. Drop me a line,
                and let's start a conversation.{" "}
              </p>
            </div>
            <div class="col-xs-12">
              <a href="mailto:my-email@gmail.com" class="btn btn-c btn-lg">
                <span class="glyphicon glyphicon-envelope"></span>
                <span>my-email@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>

  </>
  );
};

export default Home;

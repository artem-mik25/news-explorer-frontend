import authorPhoto from "../../images/author.jpg";
import "./About.css";

function About() {
  return (
    <section className="about">
      <img src={authorPhoto} alt="Artem Mikhaylov" className="about__photo" />
      <div className="about__info">
        <h2 className="about__title">About the author</h2>
        <p className="about__text">
          Hi, I&apos;m Artem, a full-stack software engineer who completed the
          TripleTen Software Engineering program. I build web applications
          with React on the frontend and Node.js, Express, and MongoDB on the
          backend.
        </p>
        <p className="about__text">
          This project brings together everything I learned in the program:
          responsive layouts, reusable React components, working with
          third-party APIs, and user authentication. I enjoy turning designs
          into pixel-perfect, functional interfaces and I&apos;m always
          looking for the next challenge.
        </p>
      </div>
    </section>
  );
}

export default About;

import PropTypes from "prop-types";

export default function SectionHeading ({ overline, title, children }) {
  return (
    <div className="section-heading">
      <h5 className="section-heading__overline">{overline}</h5>
      <h2 className="section-heading__title">{title}</h2>
      <p className="section-heading__text">{children}</p>
    </div>
  )
}

SectionHeading.propTypes = {
  overline: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node
};
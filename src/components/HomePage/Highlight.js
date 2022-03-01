const Highlight = ({ highlight }) => {

  const { text, icon } = highlight;

  return (
    <div className="home__highlight">
      {icon}
      <div className="home__highlight--text-wrapper">
        <span className="home__highlight--text">{text}</span>
      </div>
    </div>
  )
}

export default Highlight;
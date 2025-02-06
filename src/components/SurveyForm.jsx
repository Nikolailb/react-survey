function SurveyForm({ title, onSubmit, children }) {
  return (
    <form className="form" onSubmit={onSubmit}>
      <h2>{title}</h2>
      {children}
      <input className="form__submit" type="submit" value="Submit Survey!" />
    </form>
  );
}

export default SurveyForm;

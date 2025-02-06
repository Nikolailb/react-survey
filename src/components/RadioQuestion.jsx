import RadioButtons from "./RadioButtons";
import PropTypes from "prop-types";

function RadioQuestion({ question, name, onChange, value }) {
  return (
    <div className="form__group radio">
      <h3>{question}</h3>
      <RadioButtons name={name} onChange={onChange} value={value} />
    </div>
  );
}

RadioQuestion.propTypes = {
  question: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

export default RadioQuestion;

import Checkboxes from "./Checkboxes";
import PropTypes from "prop-types";

function CheckboxQuestion({ question, name, options, onChange, values }) {
  return (
    <div className="form__group">
      <h3>{question}</h3>
      <Checkboxes
        name={name}
        options={options}
        onChange={onChange}
        values={values}
      />
    </div>
  );
}

CheckboxQuestion.propTypes = {
  question: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
};

export default CheckboxQuestion;

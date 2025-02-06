import { capitalize } from "../utils/misc";
import PropTypes from "prop-types";
import { answersSet } from "./AnswersItem";

function Checkboxes({ name, options, onChange, values }) {
  return (
    <>
      <ul>
        {options.map((element, index) => {
          const isChecked = values.includes(element.toLowerCase());
          return (
            <li key={index}>
              <label>
                <input
                  name={name}
                  type="checkbox"
                  checked={isChecked}
                  value={element.toLowerCase()}
                  onChange={onChange}
                />
                {capitalize(answersSet[element])}
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
}

Checkboxes.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  values: PropTypes.arrayOf(PropTypes.string),
};

export default Checkboxes;

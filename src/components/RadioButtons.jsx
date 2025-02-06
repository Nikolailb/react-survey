import PropTypes from "prop-types";

function RadioButtons({ name, onChange, count = 4, value }) {
  return (
    <>
      <ul>
        {/* eslint-disable-next-line no-unused-vars */}
        {[...Array(count)].map((_, index) => {
          let num = index + 1;
          return (
            <li key={index}>
              <input
                id={name + +"-" + num}
                type="radio"
                name={name}
                value={num}
                checked={value == num}
                onChange={onChange}
              />
              <label htmlFor={name + +"-" + num}>{num}</label>
            </li>
          );
        })}
      </ul>
    </>
  );
}
RadioButtons.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default RadioButtons;

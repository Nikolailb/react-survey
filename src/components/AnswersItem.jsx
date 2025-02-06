// Components don't need to be separeted into individual files
// Here we have a smaller component that helps compose the AnswersItem below
import PropTypes from "prop-types";

const answersSet = {
  swimming: "Swimming",
  bathing: "Bathing",
  chatting: "Chatting",
  notime: "I don't like to spend time with it",
};

function ItemsList({ list }) {
  return (
    <ul>
      {list.map((item, index) => (
        <li key={index}>{answersSet[item]}</li>
      ))}
    </ul>
  );
}
ItemsList.propTypes = {
  list: PropTypes.array,
};

// This is the main component being exported from this file
export default function AnswersItem({
  // Feel free to change this props names to what suits you best
  // Rememeber here we're destructuring answerItem, which is the prop name that we've passed
  answerItem: { username, colour, ducktime, review, id },
  handleEdit,
  handleDelete,
}) {
  return (
    <li>
      <article className="answer">
        <h3>{username || "Anon"} said:</h3>
        <p>
          <em>How do you rate your rubber duck colour?</em>
          <span className="answer__line">{colour}</span>
        </p>
        <div>
          <em>How do you like to spend time with your rubber duck?</em>
          <ItemsList list={ducktime} />
        </div>
        <p>
          <em>What else have you got to say about your rubber duck?</em>
          <span className="answer__line">{review}</span>
        </p>
        <button className="answer__button" onClick={(e) => handleEdit(e, id)}>
          Edit
        </button>
        <button className="answer__button" onClick={(e) => handleDelete(e, id)}>
          Delete
        </button>
      </article>
    </li>
  );
}
AnswersItem.propTypes = {
  answerItem: PropTypes.object,
  handleEdit: PropTypes.func,
  index: PropTypes.number,
  handleDelete: PropTypes.func,
};
export { answersSet };

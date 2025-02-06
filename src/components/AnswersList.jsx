import AnswersItem from "./AnswersItem";
import PropTypes from "prop-types";

export default function AnswersList(props) {
  const { answersList, handleEdit, handleDelete } = props;

  return (
    <ul>
      {answersList.map((answerItem, i) => (
        <AnswersItem
          answerItem={answerItem}
          key={i}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

AnswersList.propTypes = {
  answersList: PropTypes.array,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
};

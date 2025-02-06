import { useEffect, useState } from "react";
import SurveyForm from "./SurveyForm";
import RadioQuestion from "./RadioQuestion";
import CheckboxQuestion from "./CheckboxQuestion";
import AnswersList from "./AnswersList";

function Survey() {
  let initialForm = {
    id: 0,
    colour: "",
    ducktime: [],
    review: "",
    username: "",
    email: "",
  };
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(false); //Ignore this state
  const [formData, setFormData] = useState({ ...initialForm });
  const [answers, setAnswers] = useState([]);
  const [newId, setNewId] = useState(0);

  const refreshAnswers = () => {
    fetch("http://localhost:3000/answerList")
      .then((res) => {
        if (!res.ok) {
          throw Error(
            "Failed to fetch data, check if json server is live and on port 3000!"
          );
        }
        return res.json();
      })
      .then((data) => {
        setAnswers(data);
        let newId =
          data.reduce((max, item) => (item.id > max ? item.id : max), -1) + 1;
        setNewId(newId);
      });
  };

  useEffect(refreshAnswers, []);
  const handleChange = (event) => {
    const { name, value, type } = event.target;

    if (type === "checkbox") {
      let tempData = formData[name].filter((v) => v != value);
      if (event.target.checked) {
        tempData.push(value);
      }
      setFormData({ ...formData, [name]: tempData });
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let existing = answers.find((item) => item.id === formData.id);
    if (existing !== undefined) {
      fetch(`http://localhost:3000/answerList/${existing.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Updated item:", data);
          refreshAnswers();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      fetch("http://localhost:3000/answerList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Created item:", data);
          refreshAnswers();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    setFormData({ ...initialForm, id: newId });
  };

  const handleEdit = (event, id) => {
    event.preventDefault();
    setFormData({ ...answers.find((item) => item.id === id) });
  };

  const handleDelete = (event, id) => {
    event.preventDefault();
    fetch(`http://localhost:3000/answerList/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Updated item:", data);
        refreshAnswers();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <main className="survey">
      <section className={`survey__list ${open ? "open" : ""}`}>
        <h2>Answers list</h2>
        <AnswersList
          answersList={answers}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </section>
      <section className="survey__form">
        <SurveyForm
          title={"Tell us what you think about your rubber duck!"}
          onSubmit={handleSubmit}
        >
          <RadioQuestion
            question={"How do you rate your rubber duck colour?"}
            name={"colour"}
            onChange={handleChange}
            value={formData.colour}
          />
          <CheckboxQuestion
            question={"How do you like to spend time with your rubber duck?"}
            name={"ducktime"}
            options={["swimming", "bathing", "chatting", "notime"]}
            onChange={handleChange}
            values={formData.ducktime}
          />
          <label>
            What else have you got to say about your rubber duck?
            <textarea
              name="review"
              cols="30"
              rows="10"
              onChange={handleChange}
              value={formData.review}
            ></textarea>
          </label>
          <label>
            Put your name here (if you feel like it):
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
          <label>
            Leave us your email pretty please??
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
        </SurveyForm>
      </section>
    </main>
  );
}

export default Survey;

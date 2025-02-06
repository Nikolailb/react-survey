import { useState } from "react";
import SurveyForm from "./SurveyForm";
import RadioQuestion from "./RadioQuestion";
import CheckboxQuestion from "./CheckboxQuestion";

function Survey() {
  let initialForm = {
    colour: "",
    ducktime: [],
    review: "",
    username: "",
    email: "",
  };
  const [open, setOpen] = useState(false); //Ignore this state
  const [formData, setFormData] = useState({ ...initialForm });

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
    console.log(formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Test", initialForm);
    setFormData({ ...initialForm });
  };

  return (
    <main className="survey">
      <section className={`survey__list ${open ? "open" : ""}`}>
        <h2>Answers list</h2>
        {/* answers should go here */}
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
            options={["swimming", "bathing", "chatting", "no time"]}
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

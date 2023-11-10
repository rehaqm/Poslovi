import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";

export const CreateJob = () => {
  const userID = useGetUserID();

  const [job, setJob] = useState({
    position: "",
    qualifications: [],
    responsibilities: "",
    imageUrl: "",
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setJob({ ...job, [name]: value });
  };

  const handleJobChange = (event, idx) => {
    const { value } = event.target;
    const qualifications = job.qualifications;
    qualifications[idx] = value;
    setJob({ ...job, qualifications });
  };

  const addQ = () => {
    setJob({ ...job, qualifications: [...job.qualifications, ""] });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/jobs", job);
      alert("Posao objavljen !");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="create-job">
      <h2>Objavi Posao</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="position">Pozicija</label>
        <input
          type="text"
          id="position"
          name="position"
          onChange={handleChange}
        />
        <label htmlFor="qualifications">Kvalifikacije</label>
        {job.qualifications.map((qualification, idx) => (
          <input
            key={idx}
            type="text"
            name="qualifications"
            value={qualification}
            onChange={(event) => handleJobChange(event, idx)}
          />
        ))}
        <button onClick={addQ} type="button">
          Dodaj kvalifikacije
        </button>

        <label htmlFor="responsibilities">Opis posla</label>
        <textarea
          id="responsibilities"
          name="responsibilities"
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageUrl">Poveznica za fotografiju</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
        ></input>
        <label htmlFor="contract">Lokacija</label>
        <input
          type="text"
          id="contract"
          name="contract"
          onChange={handleChange}
        ></input>
        <button type="submit">Objavi Posao</button>
      </form>
    </div>
  );
};

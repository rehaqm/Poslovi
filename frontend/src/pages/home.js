import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

export const Home = () => {
  const [jobs, setJobs] = useState([]);
  const userID = useGetUserID;
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get("http://localhost:3001/jobs");
        setJobs(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJob();
  }, []);

  const saveJob = async (jobID) => {
    try {
      const response = await axios.put("http://localhost:3001/jobs", {
        jobID,
        userID,
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Poslovi</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <div>
              <h2>{job.position}</h2>
              <button onClick={() => saveJob(job._id)}>Sacuvaj posao</button>
            </div>
            <div>
              <p>{job.responsibilities}</p>
            </div>
            <img src={job.imageUrl} alt={job.position} />
            <h4>Lokacija: {job.contract}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
};

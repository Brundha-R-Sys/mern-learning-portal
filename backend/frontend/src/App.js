import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/courses")
      .then(res => setCourses(res.data))
      .catch(err => console.log(err));
  }, []);

  const registerStudent = () => {
    axios.post("http://localhost:5000/students", { name })
      .then(res => {
        alert("Student Registered! ID: " + res.data._id);
        setStudentId(res.data._id);
      })
      .catch(err => console.log(err));
  };

  const enrollCourse = (cid) => {
    if (!studentId) { alert("Register first!"); return; }
    axios.post(`http://localhost:5000/students/${studentId}/enroll/${cid}`)
      .then(res => alert("Enrolled Successfully!"))
      .catch(err => console.log(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Online Learning Portal</h1>
      <input 
        placeholder="Student Name" 
        value={name} 
        onChange={e => setName(e.target.value)} 
      />
      <button onClick={registerStudent}>Register</button>

      <h2>Courses</h2>
      {courses.map(c => (
        <div key={c._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <h3>{c.title}</h3>
          <p>{c.description}</p>
          <button onClick={() => enrollCourse(c._id)}>Enroll</button>
        </div>
      ))}
    </div>
  );
}

export default App;

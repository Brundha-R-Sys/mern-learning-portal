import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaGraduationCap } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");

  // Fetch courses on load
  useEffect(() => {
    axios.get("http://localhost:5000/courses")
      .then(res => setCourses(res.data))
      .catch(err => toast.error("Failed to load courses"));
  }, []);

  // Register student
  const registerStudent = () => {
    if (!name) { toast.warn("Enter your name"); return; }
    axios.post("http://localhost:5000/students", { name })
      .then(res => {
        toast.success("Student Registered! ID: " + res.data._id);
        setStudentId(res.data._id);
      })
      .catch(err => toast.error("Registration Failed!"));
  };

  // Enroll in a course
  const enrollCourse = (cid) => {
    if (!studentId) { toast.warn("Register first!"); return; }
    axios.post(`http://localhost:5000/students/${studentId}/enroll/${cid}`)
      .then(res => toast.success("Enrolled Successfully!"))
      .catch(err => toast.error("Enrollment Failed!"));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4" style={{ color: "#2c3e50" }}>
        🌟 Online Learning Portal 🌟
      </h1>

      <div className="mb-4 d-flex justify-content-center">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Enter Student Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button className="btn btn-primary ms-2" onClick={registerStudent}>
          Register
        </button>
      </div>

      <h2 className="mb-3 text-center">Available Courses</h2>
      <div className="row">
        {courses.map(c => (
          <div key={c._id} className="col-md-4">
            <div className="card mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{c.title}</h5>
                <p className="card-text">{c.description}</p>
                <button
                  className="btn btn-success"
                  onClick={() => enrollCourse(c._id)}
                >
                  Enroll <FaGraduationCap className="ms-1"/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;

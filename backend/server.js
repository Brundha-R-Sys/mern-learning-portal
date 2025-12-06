const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb+srv://brundha:Brundha123@cluster0.ajfhs.mongodb.net/learningportal")
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));


// Models (Course & Student)
const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Course = mongoose.model("Course", CourseSchema);

const StudentSchema = new mongoose.Schema({
  name: String,
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const Student = mongoose.model("Student", StudentSchema);

// Routes

// 1️⃣ Add a course
app.post("/courses", async (req, res) => {
  let course = new Course(req.body);
  await course.save();
  res.send({ message: "Course added successfully!", course });
});

// 2️⃣ Get all courses
app.get("/courses", async (req, res) => {
  let data = await Course.find();
  res.send(data);
});

// 3️⃣ Register Student
app.post("/students", async (req, res) => {
  let student = new Student(req.body);
  await student.save();
  res.send({ message: "Student registered!", student });
});

// 4️⃣ Enroll a student in a course
app.post("/students/:studentId/enroll/:courseId", async (req, res) => {
  let student = await Student.findById(req.params.studentId);
  student.enrolledCourses.push(req.params.courseId);
  await student.save();
  res.send({ message: "Enrolled Successfully!", student });
});

// 5️⃣ Get student with course details
app.get("/students/:id", async (req, res) => {
  let student = await Student.findById(req.params.id).populate("enrolledCourses");
  res.send(student);
});

// Server Start
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});

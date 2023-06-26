import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css"

function App() {

  const [id, setId] = useState("");
  const [stname, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");
  const [students, setUsers] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {

    const result = await axios.get("https://localhost:44304/api/Students/GetStudents");
    setUsers(result.data);
    console.log(result.data);
  }

  async function save(event) {

    event.preventDefault();
    try {
      await axios.post("https://localhost:44304/api/Students/AddStudents", {

      name: stname,
      phone: phone,
      cource: course

      });
      alert("Student Registation Successfully");
      setId("");
      setName("");
      setCourse("");
      setPhone("");


      Load();
    } catch (err) {
      alert(err);
    }
  }

  async function editStudent(students) {
    setName(students.name);
    setCourse(students.cource);
    setId(students.id);
    setPhone(students.phone)
  }


  async function DeleteStudent(id) {
    await axios.delete("https://localhost:44304/api/Students/DeleteStudents/" + id);
    alert("Employee deleted Successfully");
    setId("");
    setName("");
    setCourse("");
    setPhone("");
    Load();
  }


  

  async function update(event) {

    event.preventDefault();
    try {
      await axios.post("https://localhost:44304/api/Students/UpdateStudents", {
      id: id,
      name: stname,
      phone: phone,
      cource: course

      });
      alert("Student Registation Successfully");
      setId("");
      setName("");
      setCourse("");
      setPhone("");


      Load();
    } catch (err) {
      alert(err);
    }
  }
  

  return (
    <div className="container">
      <h1>Student Details</h1>
      <div class="container mt-4">
        <form>
          <div class="form-group">

            <input
              type="text"
              class="form-control"
              id="id"
              hidden
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />

            <label>Student Name</label>
            <input
              type="text"
              class="form-control"
              id="stname"
              value={stname}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Course</label>
            <input
              type="text"
              class="form-control"
              id="course"
              value={course}
              onChange={(event) => {
                setCourse(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input
              type="text"
              class="form-control"
              id="phone"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
          </div>
          <div className="buttons">
            <button class="btn btn-primary mt-4" onClick={save}>
              Register
            </button>
            <button class="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <br></br>

      <table class="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Student Id</th>
            <th scope="col">Student Name</th>
            <th scope="col">Course</th>
            <th scope="col">Phone</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        {students.map(function fn(student) {
          return (
            <tbody>
              <tr>
                <th scope="row">{student.id} </th>
                <td>{student.name}</td>
                <td>{student.phone}</td>
                <td>{student.cource}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => editStudent(student)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => DeleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>

    </div>
  );
}

export default App;
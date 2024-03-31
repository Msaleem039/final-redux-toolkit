import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [contacts, setContacts] = useState([]);

  const submithandler = (e) => {
    e.preventDefault();
    let newContact = {
      ...contact,
      id: Date.now(),
    };
    toast.success("user have been created");
    contacts.push(newContact);
    setContact({ name: "", email: "", password: "" });
    localStorage.setItem("contact", JSON.stringify(contacts));
  };
  useEffect(() => {
    let data = localStorage.getItem("contact");
    data = JSON.parse(data);
    if (data != null) {
      setContacts(data);
    }
  }, []);
  const removehandler = (id) => {
    let contactArr = JSON.parse(localStorage.getItem("contact"));
    const filteredArr = contactArr.filter((c) => c.id != id);
    localStorage.setItem("contact", JSON.stringify(filteredArr));
  };
  return (
    <div className="container">
      <div className="row">
        <form className="w-25 m-auto pk1" onSubmit={submithandler}>
          <h1 className="text-center fw-bold rounded"> Sign-In</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="name"
              className="form-control"
              name="name"
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
              value={contact.name}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={contact.email}
              onChange={(e) =>
                setContact({ ...contact, email: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={(e) =>
                setContact({ ...contact, password: e.target.value })
              }
              value={contact.password}
              id="exampleInputPassword1"
            />
          </div>

          <button className="btn btn-primary my-3">Login</button>
        </form>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">email</th>
              <th scope="col">password</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((x) => {
              return (
                <tr>
                  <th scope="row">{x.name}</th>
                  <td colSpan={2}>{x.email}</td>
                  <td>{x.password}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => removehandler(x.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    {" "}
                    <Link to={`/register/${x.id}`}>
                      <button className="btn btn-success">Edit</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Register;

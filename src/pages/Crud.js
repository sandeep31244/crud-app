import './Crud.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';


const CRUD = () => {
    const [formData, setFormData] = useState({
        userId: "",
        id: "",
        title: "",
        body: "",
    });

    const [editID, setEditID] = useState(null);

    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(0);

    const { userId, id, title, body } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userId && id && title && body) {
            axios.post('https://jsonplaceholder.typicode.com/posts', formData)
                .then(res => {
                    setData([...data, res.data]);
                    setFormData({ userId: "", id: "", title: "", body: "" });
                    setRefresh(refresh + 1);
                })
                .catch(err => console.log(err));
        }
    };

    const handleUpdate = () => {
        if (userId && id && title && body && editID) {
            axios.put(`https://jsonplaceholder.typicode.com/posts/${editID}`, formData)
                .then(res => {
                    setData(data.map(item => (item.id === editID ? res.data : item)));
                    setFormData({ userId: "", id: "", title: "", body: "" });
                    setEditID(null);
                    setRefresh(refresh + 1);
                })
                .catch(err => console.log(err));
        }
    };

    const handleDelete = (deleteID) => {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${deleteID}`)
            .then(res => {
                setData(data.filter(item => item.id !== deleteID));
                console.log('DELETED RECORD::::', res);
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (editIDNotState) => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${editIDNotState}`)
            .then(res => {
                setFormData(res.data);
                setEditID(editIDNotState);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2 mt-2">
                    <h4>CRUD API Integration in React JS using Axios</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="userId">User Id</label>
                            <input
                                type="text"
                                className="form-control"
                                id="userId"
                                placeholder="Enter user id"
                                name="userId"
                                value={userId}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="id">Id</label>
                            <input
                                type="text"
                                className="form-control"
                                id="id"
                                placeholder="Enter id"
                                name="id"
                                value={id}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                placeholder="Enter title"
                                name="title"
                                value={title}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="body">Message</label>
                            <textarea
                                className="form-control"
                                id="body"
                                rows="3"
                                placeholder="Enter Message"
                                name="body"
                                value={body}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <button type="button" className="btn btn-primary" onClick={editID ? handleUpdate : handleSubmit}>
                            {editID ? "Update" : "Submit"}
                        </button>

                        {editID && (
                            <button type="button" className="btn btn-secondary ml-2" onClick={() => setEditID(null)}>
                                Cancel
                            </button>
                        )}
                    </form>

                    <hr />

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>User Id</th>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Message</th>
                                <th>Action</th>
                            </tr>

                            </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.userId}</td>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.body}</td>
                                    <td >
                                        <button className="btn btn-edit btn-lg  ctm-btn" onClick={() => handleEdit(item.id)}>
                                            Edit
                                        </button>{" "}
                                        <button className="btn btn-danger btn-lg  ctm-btn" onClick={() => handleDelete(item.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CRUD;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Book from "./Book";

export const Books = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");
  const fetchData = async () => {
    try {
      const {
        data: { data },
      } = await axios.get("http://localhost:3000/book", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  };
  const createBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/book", {
        title,
        author,
        description,
      });
      fetchData();

      setTitle("");
      setAuthor("");
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Welcome to your Book App</h1>
      <div className="form_container">
        <form className="form book-form" onSubmit={createBook}>
          <label htmlFor="name" className="form-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="form-input username-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input
            type="text"
            name="author"
            className="form-input username-input"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            type="text"
            name="description"
            className="form-textarea username-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className="btn btn-block" type="submit">
            Submit
          </button>
          <div className="form_alert"></div>
        </form>
      </div>
      <div className="overlay"></div>
      <section className="output_container">
        {/* <div className="loading"></div> */}
        <div className="output">
          {books.map((book, key) => {
            return <Book key={key} book={book} setBooks={setBooks} />;
          })}
        </div>
      </section>
      {/* <section className="modal">
        <div className="form_container">
          <form className="modal_form">
           <label htmlFor="name" className="form-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="form-input username-input"
          />
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input
            type="text"
            title="author"
            className="form-input username-input"
          />
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            type="text"
            name="description"
            className="form-input username-input"
          />
          </form>
        </div>
      </section> */}
    </div>
  );
};

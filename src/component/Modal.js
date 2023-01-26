import axios from "axios";
import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

const Modal = ({ book, setBooks, setShowModal }) => {
  // const { title, author, description, _id: bookID } = book;

  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [description, setDescription] = useState(book.description);

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    try {
      const {
        data: { data },
      } = await axios.get("http://localhost:3000/book", {
        headers: {
          authorization: `Bearers ${token}`,
        },
      });
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  };

  async function editBook() {
    try {
      await axios.patch(`http://localhost:3000/book/${book._id}`, {
        title,
        author,
        description,
      });
      fetchData();
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="form_container">
      <form className="form book-form modal_form" onSubmit={editBook}>
        <h3 className="modal_heading">Edit Book</h3>
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

        <button className="closeBtn" onClick={() => setShowModal(false)}>
          <IoMdCloseCircle className="modal_icon" />
        </button>
        <button className="btn btn-block" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Modal;

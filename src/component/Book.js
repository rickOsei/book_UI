import axios from "axios";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "./Modal";

const Book = ({ book, setBooks }) => {
  const { title, author, description, _id: bookID } = book;
  const [showModal, setShowModal] = useState(false);

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

  const deleteBook = async () => {
    try {
      await axios.delete(`http://localhost:3000/book/${bookID}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="book">
        <p className="name">
          <span>Book Title :</span> {title}
        </p>
        <p className="number">
          <span>Author : </span>
          {author}
        </p>
        <p className="address">
          <span>Description :</span> {description}
        </p>
        <div className="book_icons">
          <button type="button" className="delete-btn">
            <FaTrash className="icons" onClick={deleteBook} />
          </button>
          <button type="button" className="edit-btn">
            <FaEdit
              className="icons"
              onClick={() => setShowModal(showModal === false ? true : false)}
            />
          </button>
        </div>
      </div>
      <section
        className="modal"
        style={{ display: showModal ? "block" : "none" }}
      >
        <Modal book={book} setBooks={setBooks} setShowModal={setShowModal} />
      </section>
    </>
  );
};

export default Book;

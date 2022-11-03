import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.bid}`
  );
  const data = await res.json();

  return {
    props: {
      book: data,
    },
  };
}

const BookEdit = ({ book }) => {
  // SET PROPERTIES
  const [bookTitle, setBookTitle] = useState(book.title);
  const [errors, setErrors] = useState([]);
  const [submiting, setSubmiting] = useState(false);
  const router = useRouter();
  async function handleSubmit(e) {
    setSubmiting(true);
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${book.id}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title: bookTitle,
          _method: "PATCH",
        }),
      }
    );
    // console.log(res);
    if (res.ok) {
      // OK
      setBookTitle("");
      setErrors([]);
      return router.push("/books");
    }
    // ERROR
    const data = await res.json();
    setErrors(data.errors);
    //
    setSubmiting(true);
  }
  return (
    <div>
      <h1>Book Edit</h1>
      <Link href={`/books`}>Back</Link>
      <br></br>
      <br></br>
      <center>
        <form onSubmit={handleSubmit}>
          <label>
            <b>TITLE OF BOOK</b>
          </label>
          <br></br>
          <input
            data-cy="input-title-book"
            onChange={(e) => {
              setBookTitle(e.target.value);
            }}
            value={String(bookTitle)}
            type="text"
            placeholder="TITLE BOOK"
          />
          {errors.title && (
            <span style={{ color: "red", display: "block" }}>
              {errors.title}
            </span>
          )}
          <div>
            <button data-cy="btn-submit-book" disabled={submiting}>
              {submiting ? "UPDATING..." : "UPDATE"}
            </button>
          </div>
        </form>
      </center>
    </div>
  );
};
export default BookEdit;

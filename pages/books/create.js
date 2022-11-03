import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
const BookCreate = () => {
  // SET PROPERTIES
  const [bookTitle, setBookTitle] = useState("");
  const [errors, setErrors] = useState([]);
  const [submiting, setSubmiting] = useState(false);
  const router = useRouter();
  async function handleSubmit(e) {
    setSubmiting(true);
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title: bookTitle,
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
      <h1>BookCreate</h1>
      <Link href="/books">Back</Link>
      <br></br>
      <br></br>
      <center>
        <form onSubmit={handleSubmit}>
          <label>
            <b>TITLE OF NEW BOOK</b>
          </label>
          <br></br>
          <input
            data-cy="input-title-book"
            onChange={(e) => {
              setBookTitle(e.target.value);
            }}
            value={bookTitle}
            type="text"
            placeholder="TITLE BOOK NEW"
          />
          {errors.title && (
            <span style={{ color: "red", display: "block" }}>
              {errors.title}
            </span>
          )}
          <div>
            <button data-cy="btn-submit-book" disabled={submiting}>
              {submiting ? "SAVING..." : "SAVE"}
            </button>
          </div>
        </form>
      </center>
    </div>
  );
};
export default BookCreate;

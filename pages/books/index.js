import Link from "next/link";
// PROPIEDADES DEL COMPONENTE
export async function getStaticProps() {
  // Llamado del API
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`);
  // Obtener la Data
  const data = await res.json();
  // console.log(data);
  return {
    props: {
      books: data,
    },
  };
}
async function handlerDelete(e, bookId) {
  e.preventDefault();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${bookId}`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _method: "DELETE",
      }),
    }
  );
  if (res.ok) {
    window.location.href = "/books";
  }
}
const bookList = ({ books }) => {
  return (
    <div>
      <h1>Book List</h1>
      <Link href="/books/create">Create a new book</Link>
      <ul data-cy="book-list">
        {books.map((book) => (
          <li key={`book-${book.id}`}>
            <Link
              data-cy={`link-to-visit-a-book-${book.id}`}
              href={`/books/${book.id}`}
            >
              {book.title}
            </Link>
            {" | "}
            <Link
              data-cy={`link-to-edit-a-book-${book.id}`}
              style={{ color: "skyblue" }}
              href={`/books/${book.id}/edit`}
            >
              Edit
            </Link>
            {" | "}
            <form
              onSubmit={(e) => handlerDelete(e, book.id)}
              style={{ display: "inline-block" }}
            >
              <button
              data-cy={`btn-to-delete-a-book-${book.id}`}
                style={{
                  "background-color": "red",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default bookList;

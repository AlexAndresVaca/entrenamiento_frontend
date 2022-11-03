import Link from "next/link";
export async function getStaticPaths() {
  // Llamado del API
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`);
  const data = await res.json();
  return {
    paths: data.map((book) => ({
      params: {
        bid: String(book.id),
      },
    })),
    fallback: false,
  };
}
// PROPIEDADES DEL COMPONENTE
export async function getStaticProps({ params }) {
  const id = params.bid;
  // Llamado del API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${id}`
  );
  // Obtener la Data
  const data = await res.json();
  // console.log(data);
  return {
    props: {
      book: data,
    },
  };
}
const BookDetail = ({ book }) => {
  return (
    <>
      <h1>{book.title}</h1>
      <Link style={{ "margin-right": "20px" }} href={`/books`}>
        Back
      </Link>
      <Link style={{ color: "skyblue" }} href={`/books/${book.id}/edit`}>
        Edit
      </Link>
    </>
  );
};
export default BookDetail;

import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import ScaleLoader from "react-spinners/ScaleLoader";
import Button from "../Button";
import Style from "./list.module.css";

export default function ListAuthor() {
  const [authors, setAuthors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const controller = new AbortController();

    async function getAuthors() {
      setIsLoading(true);
      const signal = controller.signal;
      const url =
        "https://api.quotable.io/authors?" + new URLSearchParams({ page });
      const res = await fetch(url, { signal });
      const data = await res.json();

      if (page >= 2) {
        setAuthors((old) => ({
          ...data,
          results: [...old.results, ...data.results],
        }));
      } else {
        setAuthors(data);
      }
      setIsLoading(false);
    }

    getAuthors();

    return () => {
      controller.abort();
    };
  }, [page]);

  return (
    <section className={Style.spaceSection}>
      <h2 className={Style.title}>List Author</h2>
      {isEmpty(authors) ? (
        <ScaleLoader color="#0284c7" cssOverride={{ textAlign: "center" }} />
      ) : (
        <>
          <div className={Style.container}>
            {authors?.results?.map((author) => (
              <div key={author._id} className={Style.card}>
                <p className={Style.content}>{author.name}</p>
              </div>
            ))}
          </div>
          {page === 1 && (
            <div style={{ textAlign: "center", paddingTop: "1.5rem" }}>
              <Button
                onClick={() => setPage((old) => old + 1)}
                disabled={isLoading}
              >
                Load More
              </Button>
            </div>
          )}
        </>
      )}
      {page >= 2 && page !== authors.totalPage ? (
        <div style={{ textAlign: "center", paddingTop: "1.5rem" }}>
          <Button
            onClick={() => setPage((old) => old + 1)}
            disabled={isLoading}
          >
            {isLoading ? <PulseLoader color="white" size="6px" /> : "Load More"}
          </Button>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}

function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
}

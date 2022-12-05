import React from "react";
import "./Pagination.css";

export default function Pagination({
  showPerPage,
  allPokemons,
  pagination,
  page,
}) {
  const pageNumber = [];
  const total = Math.ceil(allPokemons / showPerPage) + 1;
  for (let i = 1; i < total; i++) {
    pageNumber.push(i);
  }

  return (
    // Devolver y renderizar todo en html
    <div className="containerPag">
      <button
        className="buttonPrev"
        onClick={page > 1 ? () => pagination(page - 1) : null}
        hidden={page === 1 ? true : false}
      >
        Prev
      </button>
      {pageNumber &&
        pageNumber.map((n) => (
          <button className="buttonNext" key={n} onClick={() => pagination(n)}>
            {n}{" "}
          </button>
        ))}

      <button
        className="buttonPag"
        onClick={page < total ? () => pagination(page + 1) : null}
        hidden={page === total - 1 ? true : false}
      >
        Next
      </button>
    </div>
  );
}

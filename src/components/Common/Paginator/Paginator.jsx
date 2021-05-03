import styles from "./Paginator.module.css";
import React from "react";

export const Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {

  let pages = [];
  const pagesCount = Math.ceil(totalUsersCount / pageSize);
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  return (
    <div className={styles.pagination}>
      {
        pages.map((pageNumber) => {
          return pageNumber === currentPage ?
              <div key={pageNumber} className={styles.active} onClick={() => {
                onPageChanged(pageNumber)
              }}>{pageNumber}</div> :
              <div key={pageNumber} onClick={() => {
                onPageChanged(pageNumber)
              }}>{pageNumber}</div>
        })
      }
    </div>
  )
}
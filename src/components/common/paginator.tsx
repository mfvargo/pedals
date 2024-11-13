import { useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { Button } from "./Button";

interface Props {
  offset: number;
  count: number;
  pageSize: number;
  changePage: any;
}
export const Paginator = ({ offset, count, pageSize, changePage }: Props) => {
  const page = Math.round(offset / pageSize);
  const pageCount = Math.ceil(count / pageSize);
  const [paginationRange, setPaginationRange] = useState([]);

  useEffect(() => {
    pagination(page, pageCount);
  }, [page, pageCount]);

  async function prevPage() {
    if (page > 0) await changePage({ offset: (page - 1) * pageSize, limit: pageSize });
  }

  async function nextPage() {
    if (page < pageCount) await changePage({ offset: (page + 1) * pageSize, limit: pageSize });
  }

  const handleButtonClick = async (pageNum: number) => {
    await changePage({ offset: (pageNum - 1) * pageSize, limit: pageSize });
  };

  const pagination = (currPage: number, lastPage: number) => {
    let delta = 1,
      left = currPage - delta,
      right = currPage + delta,
      range = [],
      rangeWithDots = [],
      l;

    for (let i = 1; i <= lastPage; i++) {
      if (i === 1 || i === lastPage || (i >= left && i <= right)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    // @ts-ignore
    setPaginationRange(rangeWithDots);
  };

  return (
    <div className={`paginator ${pageCount <= 1 ? "paginator--hidden" : ""}`}>
      <ButtonGroup aria-label="Rooms">
        <Button
          className={`${page <= 0 ? "paginator__button-hidden" : ""}`}
          btnText="&#60;"
          title="Previous page"
          variant="outline-primary"
          onClick={prevPage}
        />

        {paginationRange.map((pageNum, i) => {
          const currentPage = pageNum === page + 1;
          return pageNum === "..." ? (
            <Button
              key={`${pageNum}${i}`}
              className="paginator__ellipsis"
              btnText={pageNum}
              title="More pages"
              variant="outline-primary"
            />
          ) : (
            <Button
              key={`${pageNum}${i}`}
              btnText={pageNum}
              title={`${currentPage ? "Current page" : `Page ${pageNum}`}`}
              variant="outline-primary"
              active={currentPage}
              onClick={() => handleButtonClick(pageNum)}
            />
          );
        })}

        <Button
          className={`${page >= pageCount - 1 ? "paginator__button-hidden" : ""}`}
          btnText="&#62;"
          title="Next page"
          variant="outline-primary"
          onClick={nextPage}
        />
      </ButtonGroup>
    </div>
  );
};

import { useState } from "react";

export function usePaginator(size = 10) {
  const pageSize = size;
  const [pageInfo, setPageInfo] = useState<{ offset: number; limit: number }>({ offset: 0, limit: pageSize });
  const [recordCount, setRecordCount] = useState<number>(0);

  return { pageInfo, setPageInfo, recordCount, setRecordCount, pageSize };
}

export function useSearchBar(inputString = "") {
  const [searchString, setSearchString] = useState<string>(inputString);

  const handleSearchChange = (e: any) => {
    setSearchString(e.target.value);
  };

  return { searchString, setSearchString, handleSearchChange };
}

import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

import { RecordingListTableData } from "./RecordingListTableData";
import { useApi } from "../../hooks/useApi";
import { usePaginator, useSearchBar } from "../../hooks/useCommonUi";
import { SearchBar } from "../common/SearchBar";
import { Paginator } from "../common/paginator";
import { RecordingIndex } from "../../nation";

type IndexResponse = Awaited<ReturnType<typeof RecordingIndex.prototype.runWithinTransaction>>;

export const RecordingList = () => {
  const { execApi } = useApi();
  const [recordings, setRecordings] = useState<IndexResponse["data"]>([]);
  // Pagination Stuff
  const { pageInfo, setPageInfo, recordCount, setRecordCount, pageSize } = usePaginator(8);
  // Search Stuff
  const { searchString, handleSearchChange } = useSearchBar();
  // Order Stuff
  const [orderClause, _setOrderClause] = useState<Array<Array<string>>>([["name", "asc"]]);

  useEffect(() => {
    loadData();
  }, [searchString, pageInfo]);

  async function loadData() {
    const result = await execApi(
      {
        ...pageInfo,
        ...{
          search: searchString,
          order: orderClause,
        },
      },
      "/api/1/recordings",
      "put",
      setRecordings,
      "data",
    );
    setRecordCount(result.count);
  }

  async function deleteRecording(id: number) {
    // delete the selected board
    await execApi(undefined, "/api/1/recordings/" + id, "delete"); // Delete from cloud
    loadData(); // Reload from cloud
  }

  return (
    <div key="RecordingList">
      <SearchBar placeholder="Search Songs" label="Search Songs" onChange={handleSearchChange} />

      <Table hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Preview</th>
            <th>Download</th>
            <th>Stats</th>
            <th colSpan={3}>Action</th>
          </tr>
        </thead>

        <tbody>
          {recordings.map((model) => (
            <RecordingListTableData key={model.id} recording={model} deleteRecording={deleteRecording} />
          ))}
        </tbody>
      </Table>

      <Paginator offset={pageInfo.offset} count={recordCount} pageSize={pageSize} changePage={setPageInfo} />
    </div>
  );
};

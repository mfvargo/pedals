import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

import { useApi } from "../../hooks/useApi";
import { usePaginator } from "../../hooks/useCommonUi";
import { Paginator } from "../common/paginator";
import { AdminRoomIndex } from "../../nation";

type RoomApi = Awaited<ReturnType<typeof AdminRoomIndex.prototype.runWithinTransaction>>;

export const AdminRoomList = () => {
  const { execApi } = useApi();
  const [roomInfo, setRoomInfo] = useState<RoomApi["data"]>([]);
  const { pageInfo, setPageInfo, recordCount, setRecordCount, pageSize } = usePaginator(10);

  useEffect(() => {
    loadData();
  }, [pageInfo]);

  async function loadData() {
    const result = await execApi(pageInfo, "/api/1/admin/rooms", "get", setRoomInfo, "data");
    setRecordCount(result.count);
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>WanIp</th>
          <th>City</th>
          <th>longitude</th>
          <th>latitude</th>
        </tr>
      </thead>
      <tbody>
        {roomInfo.map((unit) => (
          <tr>
            <td>{unit.id}</td>
            <td>{unit.name}</td>
            <td>{unit.wanIp}</td>
            <td>{unit.city}</td>
            <td>{unit.longitude}</td>
            <td>{unit.latitude}</td>
          </tr>
        ))}
        <tr>
          <td colSpan={6}>
            <Paginator offset={pageInfo.offset} count={recordCount} pageSize={pageSize} changePage={setPageInfo} />
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

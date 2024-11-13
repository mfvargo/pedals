import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

import { useApi } from "../../hooks/useApi";
import { usePaginator } from "../../hooks/useCommonUi";
import { Paginator } from "../common/paginator";
import { AdminPacketStatIndex } from "../../nation";

type PacketStatApi = Awaited<ReturnType<typeof AdminPacketStatIndex.prototype.runWithinTransaction>>;

export const PacketStatList = () => {
  const { execApi } = useApi();
  const [packetStatInfo, setPacketStatInfo] = useState<PacketStatApi["data"]>([]);
  const { pageInfo, setPageInfo, recordCount, setRecordCount, pageSize } = usePaginator(10);

  useEffect(() => {
    loadData();
  }, [pageInfo]);

  async function loadData() {
    const result = await execApi(pageInfo, "/api/1/admin/packetStats", "get", setPacketStatInfo, "data");
    setRecordCount(result.count);
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>JamUnit</th>
          <th>BroadcastUnit</th>
          <th>stats</th>
        </tr>
      </thead>
      <tbody>
        {packetStatInfo.map((row) => (
          <tr>
            <td>{row.id}</td>
            <td>{JSON.stringify(row.jamUnit.name)}</td>
            <td>{JSON.stringify(row.broadcastUnit.name)}</td>
            <td>{JSON.stringify(row.stats)}</td>
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

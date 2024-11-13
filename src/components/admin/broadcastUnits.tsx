import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

import { useApi } from "../../hooks/useApi";
import { usePaginator } from "../../hooks/useCommonUi";
import { Paginator } from "../common/paginator";
import { AdminBroadcastUnitIndex } from "../../nation";

type BroadcastUnitApi = Awaited<ReturnType<typeof AdminBroadcastUnitIndex.prototype.runWithinTransaction>>;

interface Props {
  versionInfo: any;
}
export const AdminBroadcastList = ({ versionInfo }: Props) => {
  const { execApi } = useApi();
  const [broadcastUnitInfo, setBroadcastUnitInfo] = useState<BroadcastUnitApi["data"]>([]);
  const { pageInfo, setPageInfo, recordCount, setRecordCount, pageSize } = usePaginator(10);

  useEffect(() => {
    loadData();
  }, [pageInfo]);

  async function loadData() {
    const result = await execApi(pageInfo, "/api/1/admin/broadcastUnits", "get", setBroadcastUnitInfo, "data");
    setRecordCount(result.count);
  }

  function softwareStatus(gitHash: String) {
    if (!versionInfo) {
      return "Unknown";
    }
    return gitHash === versionInfo.cpp_version || gitHash === versionInfo.rust_version ? "Current" : "Out Of Date";
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>User</th>
          <th>macAddress</th>
          <th>lastSeenAt</th>
          <th>latest</th>
          <th>githash</th>
        </tr>
      </thead>
      <tbody>
        {broadcastUnitInfo.map((unit) => (
          <tr>
            <td>{unit.id}</td>
            <td>{unit.name}</td>
            <td>{unit.user}</td>
            <td>{unit.macAddress}</td>
            <td>{unit.lastSeenAt}</td>
            <td>{softwareStatus(unit.gitHash)}</td>
            <td>{unit.gitHash}</td>
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

import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

import { useApi } from "../../hooks/useApi";
import { usePaginator } from "../../hooks/useCommonUi";
import { Paginator } from "../common/paginator";
import { AdminUserIndex } from "../../nation";

type AdminUserIndexApi = Awaited<ReturnType<typeof AdminUserIndex.prototype.runWithinTransaction>>;

export const AdminUserList = () => {
  const { execApi } = useApi();
  const [userInfo, setUserInfo] = useState<AdminUserIndexApi["data"]>([]);
  const { pageInfo, setPageInfo, recordCount, setRecordCount, pageSize } = usePaginator(10);

  useEffect(() => {
    loadData();
  }, [pageInfo]);

  async function loadData() {
    const result = await execApi(pageInfo, "/api/1/admin/users", "get", setUserInfo, "data");
    setRecordCount(result.count);
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>email</th>
          <th>First</th>
          <th>Last</th>
        </tr>
      </thead>
      <tbody>
        {userInfo.map((user) => (
          <tr>
            <td>{user.id}</td>
            <td>{user.email}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
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

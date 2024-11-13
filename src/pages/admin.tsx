import { AdminBroadcastList } from "../components/admin/broadcastUnits";
import { AdminRoomList } from "../components/admin/rooms";
import { AdminUserList } from "../components/admin/users";
import { AdminJamUnitList } from "../components/admin/jamUnits";
import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";

export default function AdminPage() {
  const { execApi } = useApi();
  const [versionInfo, setVersionInfo] = useState<any>();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    await execApi({}, "/api/1/status", "get", setVersionInfo, "component_versions");
  }

  return (
    <>
      <h3>Version Hashes</h3>
      <p>Rust: {versionInfo && versionInfo.rust_version}</p>
      <p>C++: {versionInfo && versionInfo.cpp_version}</p>
      <h3>Broadcast Units</h3>
      <AdminBroadcastList versionInfo={versionInfo} />
      <h3>Rooms</h3>
      <AdminRoomList />
      <h3>Jam Units</h3>
      <AdminJamUnitList versionInfo={versionInfo} />
      <h3>Users</h3>
      <AdminUserList />
    </>
  );
}

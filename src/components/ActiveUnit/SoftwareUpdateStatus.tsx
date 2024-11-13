import { useContext, useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";

import { UnitModel, UpdateMessage } from "../../models/UnitModel";
import { HandlerContext } from "../../contexts/HandlerContext";
import { IconButton } from "../common/IconButton";
import { Tooltip } from "../common/Tooltip";

export const SoftwareUpdateStatus = () => {
  const { jamUnitHandler, successHandler } = useContext(HandlerContext);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isRust, setIsRust] = useState<boolean>(false);
  const [needsUpdate, setNeedsUpdate] = useState<boolean>(false);
  const [version, setVersion] = useState<string>("loading from cloud");
  const [gitHash, setGitHash] = useState<string>("loading from unit");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateMsg, setUpdateMsg] = useState<UpdateMessage>();

  useEffect(() => {
    jamUnitHandler.subscribe("unit", "SoftwareUpdateStatus", distributeUnitInfo);
    return () => {
      jamUnitHandler.unsubscribe("unit", "SoftwareUpdateStatus");
    };
  }, []);

  useEffect(() => {
    loadCurrentVersion();
  }, [gitHash, isRust, isConnected]);

  useEffect(() => {
    if (updateMsg) {
      successHandler.set({ message: updateMsg.text });
    }
  }, [updateMsg]);

  const updateCheck = async () => {
    await jamUnitHandler.updateCheck();
    setIsUpdating(true);
  };

  function distributeUnitInfo(model: UnitModel) {
    setIsConnected(model.connected);
    setIsRust(model.isRust);
    setGitHash(model.gitHash);
    setUpdateMsg(model.updateMsg);
  }

  async function loadCurrentVersion() {
    const url = isRust ? "/pi/rust/version.txt" : "/pi/version.txt";
    const response = await fetch(url, { cache: "no-cache" });
    if (response.status !== 200) {
      setVersion("No Server Version");
    } else {
      const serverVersion = (await response.text()).trim();
      setVersion(serverVersion);
      setNeedsUpdate(serverVersion !== gitHash);
      setIsUpdating(false);
    }
  }

  const buttonClassName = `software-status__update-btn ${isUpdating ? "software-status__update-btn--updating" : ""}`;

  return (
    <div className={`software-status ${needsUpdate ? "software-status--needs-update" : ""}`}>
      {!needsUpdate ? (
        <AiOutlineCheck fontSize={30} />
      ) : (
        <IconButton
          icon="update"
          className={buttonClassName}
          title="Update software"
          id={"updateCheck_button"}
          size={30}
          onClick={updateCheck}
        />
      )}

      <div className="software-status__status-text">Software {!needsUpdate ? "Up To Date" : "Update Required"}</div>

      <Tooltip text={`Newest hash: ${gitHash}.${needsUpdate ? `Your version: ${version}` : ""}`} />
    </div>
  );
};

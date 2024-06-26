import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Loading = ({ className = "" }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Spin />
    </div>
  );
};
export default Loading
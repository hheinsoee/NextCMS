"use client";
import { MarkDownView } from "@/app/(admin)/admin/_private/components/Inputs";
import { useTheme } from "@/context/theme";
import { Button, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import { BiArrowToRight } from "react-icons/bi";
import { JSONTree } from "react-json-tree";
import { JsonView } from "./JsonView";

interface TasterArgs {
  hostname?: string | null;
  pathname?: string[] | null;
  templates?: {
    name: string;
    value: string;
  }[];
}
function Taster({ hostname, pathname, templates }: TasterArgs) {
  const { isDark } = useTheme();
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const [err, setErr] = useState(false);
  const pre = `${hostname ? `http://${hostname}` : ""}/api/`;
  useEffect(() => {
    setPath(pathname ? `${pathname.join("/")}/` : "");
  }, [pathname]);
  const handleSubmit = async () => {
    setLoading(true);
    await fetch(pre + path)
      .then(async (response: any) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const d = await response.json()
        setResult(d);
      })
      .catch((err: any) => {
        setErr(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="p-8">
      <Space.Compact style={{ width: "100%" }}>
        <Input
          width={"100%"}
          prefix={pre}
          value={path}
          onChange={(e) => setPath(e.target.value)}
          onPressEnter={handleSubmit}
        />
        <Button
          loading={loading}
          icon={<BiArrowToRight />}
          onClick={handleSubmit}
        />
      </Space.Compact>
      <div className="h-2 opacity-40">{loading && "loading"}</div>
      {err && <JSONTree data={err} />}
      {result && <div className="child_transparent"><JSONTree data={result} /></div>}
      {/* {result && <JsonView newData={result} />} */}
    </div>
  );
}

export default Taster;

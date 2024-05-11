"use client";
import { MarkDownView } from "@/app/(admin)/admin/_private/components/Inputs";
import { useTheme } from "@/context/theme";
import { Button, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import { BiArrowToRight, BiCheck } from "react-icons/bi";
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
  const [result, setResult] = useState(undefined);
  const [err, setErr] = useState(undefined);
  const pre = `${hostname ? `http://${hostname}` : ""}/api/`;
  useEffect(() => {
    setPath(pathname ? `${pathname.join("/")}/` : "");
  }, [pathname]);
  const handleSubmit = async () => {
    setLoading(true);
    setErr(undefined);
    setResult(undefined);
    await fetch(pre + path)
      .then(async (response: any) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const d = await response.json();
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
        >
          Send
        </Button>
      </Space.Compact>
      <div>
        {loading ? (
          <div className="opacity-40">loading..</div>
        ) : err ? (
          <div className="text-red-800 dark:text-red-400">{err?.message}</div>
        ) : (
          <div className="text-green-800 dark:text-green-400">
            Success <BiCheck />
          </div>
        )}
      </div>
      {err && (
        <div className="child_transparent">
          <JSONTree data={err} />
        </div>
      )}
      {result && (
        <div className="child_transparent">
          <JSONTree data={result} />
        </div>
      )}
    </div>
  );
}

export default Taster;

"use client";
import { MarkDownView } from "@/app/(admin)/admin/_private/components/Inputs";
import { Button, Input, Space } from "antd";
import React from "react";
import { BiArrowToRight } from "react-icons/bi";
interface TasterArgs {
  hostname?: string | null;
  pathname?: string[] | null;
  templates?: {
    name: string;
    value: string;
  }[];
}
function Doc({ hostname, pathname, templates }: TasterArgs) {
  const url = `${hostname ? `http://${hostname}` : ""}/api/${
    pathname ? `${pathname.join("/")}/` : ""
  }`;
  const template = templates?.[0].value;
  const regex = /{{([^{}]+)}}/g;
  const replacedText = template?.replace(regex, (match, group) => {
    if (group.trim() === "url") {
      return url;
    } else {
      return match;
    }
  });
  return (
    <div>
      <MarkDownView text={replacedText || ""} />
    </div>
  );
}

export default Doc;

"use client";
import React from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Link from "next/link";
import { FaDotCircle } from "react-icons/fa";
import { useRepo } from "../admin/_private/context/repo";
import { apiDocLinks } from "./_link";

export const ApiDocMenu: React.FC = () => {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };
  const { contentTypes }: any = useRepo();
  return (
    <Menu
      onClick={onClick}
      title="hello"
      style={{ border: "none", background:'transparent' }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={[
        {
          key: "content",
          children: contentTypes.map((t: any) => ({
            key: t.id,
            label: <Link href={apiDocLinks.content(t.id)}>{t.name}</Link>,
          })),
          label: "content",
          type: "group",
        },

        { type: "divider" },
        {
          key: "content",
          children: [
            {
              key: "content_type",
              label: (
                <Link href={apiDocLinks.home("content")}>Content Type</Link>
              ),
            },
            {
              key: "taxonomy_type",

              label: <Link href={apiDocLinks.home("taxonomy")}>Taxonomy</Link>,
            },
          ],
          label: "setup",
          type: "group",
        },
      ]}
    />
  );
};

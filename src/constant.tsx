import React from "react";
import {
  FaCss3,
  FaDatabase,
  FaHtml5,
  FaJs,
  FaNode,
  FaNodeJs,
  FaPhp,
  FaReact,
} from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";

interface Technology {
  label: string;
  Icon: React.FC<{ className?: string }> ;
}

export const technology: Record<string, Technology> = {
  nodejs: {
    label: "Node.js",
    Icon: ({ className }) => (
      <FaNodeJs
        className={`${className}`}
        style={{ translate: "0px 2px", marginBottom: "2px" }}
      />
    ),
  },
  nextjs: {
    label: "NextJs",
    Icon: ({ className }) => (
      <TbBrandNextjs
        className={`${className}`}
        style={{ translate: "0px 2px", marginBottom: "2px" }}
      />
    ),
  },
  reactjs: {
    label: "ReactJs",
    Icon: ({ className }) => (
      <FaReact
        className={`${className}`}
        style={{ translate: "0px 2px", marginBottom: "2px" }}
      />
    ),
  },
  reactnative: {
    label: "ReactNative",
    Icon: ({ className }) => (
      <FaReact
        className={`${className}`}
        style={{ translate: "0px 2px", marginBottom: "2px" }}
      />
    ),
  },
  php: {
    label: "PHP",
    Icon: ({ className }) => (
      <FaPhp
        className={`${className}`}
        style={{ translate: "0px 2px", marginBottom: "2px" }}
      />
    ),
  },
  sql: {
    label: "SQL",
    Icon: ({ className }) => (
      <FaDatabase
        className={`${className}`}
        style={{ translate: "0px 2px", marginBottom: "2px" }}
      />
    ),
  },
  html: {
    label: "HTML",
    Icon: ({ className }) => (
      <FaHtml5
        className={`${className}`}
        style={{ translate: "0px 2px", marginBottom: "2px" }}
      />
    ),
  },
  css: {
    label: "CSS",
    Icon: ({ className }) => (
      <FaCss3
        className={`${className}`}
        style={{ translate: "0px 2px", marginBottom: "2px" }}
      />
    ),
  },
  javascript: {
    label: "Javascript",
    Icon: ({ className }) => (
      <FaJs
        className={`${className}`}
        style={{ translate: "0px 2px", marginBottom: "2px" }}
      />
    ),
  },
};

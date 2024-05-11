"use client";
import React, { createContext, useContext, useState } from "react";
import { Breadcrumb, Col, Layout, Row, message } from "antd";
import { ApiDocMenu } from "../../_menu";

const ApiDocLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-4 w-full flex-1">
      <div>
        <div className="sticky top-0 ">
          <ApiDocMenu />
        </div>
      </div>
      <div className="flex-1 min-h-screen">{children}</div>
    </div>
  );
};

export default ApiDocLayout;

import React from "react";
import { Col, Row } from "antd";
import { headers } from "next/headers";
import Taster from "./_components/Taster";

import { promises as fs } from 'fs';
import ApiDocLayout from "./_components/ApiDocLayout";
import Doc from "./_components/Doc";

export default async function Page({ params }) {
  const headersList = headers();
  const host = headersList.get("host");
  const text = await fs.readFile(process.cwd() + '/src/templates/doc.md', 'utf8');
  return (
    <ApiDocLayout>
      <Row>
        <Col span={12} >
          <Doc hostname={host} pathname={params.slug} templates={[{ name: 'tast', value: text }]} />

        </Col>
        <Col span={12} className="min-h-screen">

          <div className="sticky top-0 max-h-screen overflow-y-auto">
            <Taster hostname={host} pathname={params.slug} templates={[{ name: 'tast', value: text }]} />
          </div>
        </Col>
      </Row>
    </ApiDocLayout>
  );
}

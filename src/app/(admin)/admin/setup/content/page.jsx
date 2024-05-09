'use client'
import React, { useEffect, useState } from 'react';
import { getContentStructure } from '@service/t_content'
import { Col, List, Row, message } from 'antd';
import { JSONTree } from 'react-json-tree';
import ContentTypeArchive from './_component/Archive';
import ContentTypeForm from './_component/Form';

function Page(props) {
    const [selected, setSelected] = useState(null);
    const [freshData, setFreshData] = useState(null);
    return (
        <Row gutter={[16, 16]}>
            <Col span={8} className="max-w-3xl mx-auto">
                <h2>Content Type Manager</h2>
                <p className='opacity-60'>this is content manager</p>
                <ContentTypeArchive freshData={freshData} selected={selected} setSelected={setSelected} />
            </Col>
            <Col span={16}>
                {/* <JSONTree data={selected} /> */}
                <ContentTypeForm
                    selected={selected}
                    setSelected={setSelected}
                    setFreshData={setFreshData}
                />
            </Col>
        </Row>
    );
}

export default Page;
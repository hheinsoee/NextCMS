"use client";
import React, { useEffect, useState } from "react";
import { JSONTree } from "react-json-tree";
import { deleteContent, getContents } from "@service/r_content";
import { Button, Col, Flex, List, Popconfirm, Row, Space, message } from "antd";
import ContentForm from "./ContentForm";
import { makeFresh } from "@hheinsoee/utility";
import Loading from "@components/Loading";
import { MarkDownView } from "@admin/_private/components/Inputs";
import { FaEdit, FaTrash } from "react-icons/fa";
import Cell from "@/components/Cell";
import { prettyContent } from "@admin/_private/prittier";


function Archive({ type }) {
  const [selected, setSelected] = useState(null);
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const loadContent = (type_id) => {
    setLoading(true);
    getContents({
      where: {
        contentTypeId: type_id,
      },
    })
      .then((data) => {
        setContent(data.map((d) => prettyContent(d)));
      })
      .catch((error) => {
        message.error("sth wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadContent(type.id);
  }, [type]);

  const setFreshData = (data) => {
    setContent(makeFresh({ old: content, fresh: data }));
  };
  const handleDelete = (id) => {
    setDeletingId(id);
    deleteContent({
      where: {
        id
      }
    })
      .then(() => {
        message.success("Deleted")
        setContent(data => data.filter((c => c.id !== id)));
      })
      .catch((error) => {
        message.error(error?.message || "sth wrong");
      })
      .finally(() => {
        setDeletingId(null);
      });
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <div className="max-w-3xl p-8 box-border mx-auto max-h-screen overflow-y-auto">
          <h2>{type.name}</h2>
          <p className="opacity-60">{type.description}</p>
          {/* <JSONTree data={selected} /> */}
          {loading ? (
            <Loading />
          ) : (
            <List>
              {content?.map((c) => (
                <List.Item key={c.id} className="my-8 cursor-default thumbnail">
                  <div className="flex-1">
                    <Cell type="date" value={c.createTime} className="opacity-60" />
                    <Flex justify='space-between'>
                      <h2 className="text-lg m-0">{c.title}</h2>
                      <Space.Compact className='action'>
                        <Button type='link' onClick={() => setSelected(c)} icon={<FaEdit />} />
                        <Popconfirm
                          title={`Delete this ${c.title}`}
                          description={`Are you sure to delete this ${c.title}?`}
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() => handleDelete(c.id)}
                        >
                          <Button loading={deletingId == c.id} type='link' icon={<FaTrash />} danger />
                        </Popconfirm>
                      </Space.Compact>
                    </Flex>
                    {/* <div>{dayjs(c.create_time).format("YYYY-MM-DD")}</div> */}
                    <div>
                      <MarkDownView text={c.description}></MarkDownView>
                    </div>
                    <div className="flex items-center flex-wrap gap-2 opacity-40 text-sm">
                      {
                        c.fields && c.fields.map((obj) => (
                          <Cell type={obj.name} value={obj.value} key={obj.id} />
                        ))
                      }
                    </div>
                  </div>
                </List.Item>
              ))}
            </List>
          )}
        </div>
      </Col>
      <Col span={16}>
        <ContentForm
          type={type}
          selected={selected}
          setSelected={setSelected}
          setFreshData={setFreshData}
        />
      </Col>
    </Row>
  );
}

export default Archive;

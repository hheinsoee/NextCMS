'use client'
import React, { useEffect, useState } from 'react';
import { JSONTree } from 'react-json-tree';
import { MarkDownEditor } from '../../_private/components/Inputs'
import { createContent, updateContent } from '@service/r_content';
import { Button, Col, Divider, Flex, Form, Input, Row, Select, Space, message } from 'antd';
import { useRepo } from '../../_private/context/repo';

function ContentForm({ type, selected, setSelected, setFreshData }) {
    const [loading, setLoading] = useState();
    const [formData, setFormData] = useState();
    const [form] = Form.useForm();
    const { ls_taxonomy_type } = useRepo();

    useEffect(() => {
        form.resetFields()
        form.setFieldsValue(selected)
    }, [selected])
    const handleClear = () => {
        form.resetFields()
        setSelected(null)
    }
    const handleReset = () => {
        form.setFieldsValue(selected)
    }
    const handleSubmit = (value) => {

        setFormData(value)
        // return;

        if (selected?.id) {
            setLoading(true)
            updateContent({
                where: {
                    id: selected.id
                },
                data: {
                    ...value,
                }
            }).then((result) => {
                message.success('updated');
                console.log({result})
                setFreshData(result)
            }).catch((error) => {
                message.error(error?.message || "sth wrong");
            }).finally(() => {
                setLoading(false)
            });
        } else {
            setLoading(true)
            createContent({
                data: {
                    ...value,
                    contentTypeId: type.id
                }
            }).then((result) => {
                message.success('created');
                setFreshData(result)
                handleClear()
            }).catch((error) => {
                message.error(error?.message || "sth wrong");
            }).finally(() => {
                setLoading(false)
            });
        }

    }

    return (
        <div className='overflow-y-auto relative h-screen'>
            <JSONTree data={{ type, selected, ls_taxonomy_type, formData }} />
            <Form
                onFinish={handleSubmit}
                form={form}
                name="basic"
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                className='max-w-5xl mx-auto'
                initialValues={{
                    remember: true,
                }}
                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout='vertical'
            >
                <Row gutter={[16]}>
                    <Col span={16} className='min-h-screen'>
                        <div className='flex items-center gap-4 top-0 sticky z-10'>
                            <h2 className='flex-1 top-0 sticky'>{selected?.id ? "Update" : "Create"} {type.name}</h2>

                            <Space.Compact>
                                <Button disabled={loading} onClick={handleClear}>Clear</Button>
                                <Button disabled={loading} onClick={handleReset}>Reset</Button>
                                <Button loading={loading} type='primary' onClick={form.submit}>{selected?.id ? "Update" : "Create"}</Button>
                            </Space.Compact>
                        </div>
                        <Form.Item
                            name={'title'}
                            label={"Title"}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Title!',
                                },
                            ]}
                        ><Input placeholder="Title" />
                        </Form.Item>
                        <Divider />
                        <Form.Item
                            name={'description'}
                            label={"Description"}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Description!',
                                },
                            ]}
                        >
                            <MarkDownEditor />
                        </Form.Item>
                        <Divider />
                        <Form.Item
                            name={'body'}
                            label={"body"}
                        >
                            <MarkDownEditor />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <div className='sticky top-20'>
                            <Form.Item
                                name={['taxonomies']}
                            >
                                {type.taxonomyTypes?.length > 0 && <>
                                    <div className='opacity-50 text-sm'>taxonomy</div>

                                    {type.taxonomyTypes?.map((t, i) => (
                                        <Form.Item
                                            key={t.id}
                                            name={['taxonomies', i, 'recordIds']}
                                            label={t.name}
                                        >
                                            <Select
                                                mode="multiple"
                                                style={{ width: '100%' }}
                                                options={
                                                    ls_taxonomy_type.find(tax => tax.id == t.id).taxonomies.map((taxo => ({ ...taxo, value: taxo.id, label: taxo.name })))
                                                }
                                                placeholder={t.name} />
                                        </Form.Item>
                                    ))}
                                </>
                                }
                            </Form.Item>

                            <Form.Item
                                name={['taxonomies']}
                            >
                                {type.fieldTypes?.length > 0 && <>
                                    <div className='opacity-50 text-sm'>field</div>

                                    {type.fieldTypes?.map((t, i) => (
                                        <Form.Item
                                            key={t.id}
                                            name={['fields', i]}
                                            label={t.name}
                                        >
                                            <FieldInput name={t.name} />
                                        </Form.Item>
                                    ))}
                                </>
                                }
                            </Form.Item>

                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default ContentForm;

const FieldInput = ({ onChange, value, name }) => {
    const handleChange = (v) => {
        onChange({
            name: name,
            value: v
        })
    }
    return <Input placeholder={name} value={value?.value} onChange={(e) => handleChange(e.target.value)} />
}
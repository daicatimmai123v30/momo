import { Button, Checkbox, Col, Divider, Flex, Modal, ModalProps, notification, Row, Select, Typography } from 'antd';
import TextArea, { TextAreaRef } from 'antd/es/input/TextArea';
import Table, { ColumnType } from 'antd/es/table';
import React, { ChangeEventHandler, FC, Ref, RefObject, useMemo, useRef, useState } from 'react';
import { AccountTypeOptions } from './constant';
import MainServices from '../../services/MainServices';
import { NotificationPlacement } from 'antd/es/notification/interface';

interface ICreateAccountProps {
    ModalProps?: ModalProps;
}
const CreateAccount: FC<ICreateAccountProps> = (props): React.ReactElement => {
    const { ModalProps } = props;

    const [api, contextHolder] = notification.useNotification();

    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [accountTypeState, setAccountType] = useState();
    const accountInputRef = useRef<any>(undefined);

    const columnsSetting: ColumnType[] = useMemo(() => {
        return [
            {
                title: 'UserName',
                dataIndex: 'UserName',
                key: 'UserName',
                width: 200,
                fixed: 'left',
            },
            {
                title: 'Password',
                dataIndex: 'Password',
                key: 'Password',
                width: 200,
            },
            {
                title: 'AuthenticationCode',
                dataIndex: 'AuthenticationCode',
                key: 'AuthenticationCode',
                width: 200,
            },
            {
                title: 'TypeAccount',
                dataIndex: 'TypeAccount',
                key: 'TypeAccount',
                width: 200,
            },
        ];
    }, []);

    const onGenarateAccount = () => {
        const { current: inputRef } = accountInputRef;
        if (!inputRef) return;

        const stringAccount = inputRef.resizableTextArea.textArea.value.trim();
        if (!stringAccount) return;

        const data = stringAccount.split('\n').map((item: string) => {
            const object = item.trim().split('|');

            return {
                UserName: object[0],
                Password: object[1],
                AuthenticationCode: object[2],
                TypeAccount: accountTypeState,
            };
        });
        setDataSource(data);
    };

    const handleChangeAccountType = (value: any) => {
        setAccountType(value);
    };

    const onCreateAccount = () => {
        setLoading(true);
        MainServices.createMultipleAccount(dataSource)
            .then(() => {
                api.info({
                    message: `Create Successfully Twitter Account`,
                    description: `Create Successfully Twitter Account`,
                    placement: 'topRight',
                });
            })
            .catch(() => {})
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Modal
            centered
            open={ModalProps?.open}
            title="Create Twitter Account"
            width={1000}
            onCancel={(e) => {
                if (ModalProps?.onCancel) ModalProps.onCancel(e);
            }}
            footer={(_: any, {}) => (
                <>
                    <Button
                        onClick={(e: any) => {
                            if (ModalProps?.onCancel) ModalProps.onCancel(e);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button type="primary" onClick={onCreateAccount}>
                        Create
                    </Button>
                </>
            )}
        >
            <Flex vertical gap={10}>
                <Row gutter={24} style={{ marginBottom: 10 }}>
                    <Col className="gutter-row" span={3}>
                        <Typography.Paragraph>Account Input: </Typography.Paragraph>
                    </Col>
                    <Col className="gutter-row" span={21}>
                        <TextArea ref={accountInputRef} rows={4} placeholder="Twitter Account" />
                    </Col>
                </Row>

                <Row gutter={24} style={{ marginBottom: 10 }}>
                    <Col className="gutter-row" span={3}>
                        <Typography.Paragraph style={{ marginBottom: 0 }}>Account Type:</Typography.Paragraph>
                    </Col>
                    <Col className="gutter-row" span={21}>
                        <Select
                            onChange={handleChangeAccountType}
                            style={{ width: 200 }}
                            options={AccountTypeOptions}
                        />
                    </Col>
                </Row>
                <Flex vertical align="flex-end" justify="flex-end">
                    <Button style={{ width: '80px' }} disabled={loading} onClick={onGenarateAccount}>
                        Genarate
                    </Button>
                </Flex>
                <Divider style={{ margin: 0 }} />
                <Table
                    dataSource={dataSource}
                    columns={columnsSetting}
                    loading={loading}
                    scroll={{ x: 'max-content', y: 55 * 5 }}
                />
            </Flex>
            {contextHolder}
        </Modal>
    );
};

export default CreateAccount;

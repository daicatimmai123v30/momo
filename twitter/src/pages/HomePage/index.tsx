import { DownOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Dropdown, Flex, Input, notification, Row, Space, Table, Typography } from 'antd';
import { ColumnType } from 'antd/es/table';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { PanelContainer } from '../../components/atoms/CommonPanel/PanelContainer';
import { PanelItem } from '../../components/atoms/CommonPanel/PanelItem';
import LayoutDefault from '../../components/templates/LayoutDefault';
import MainServices from '../../services/MainServices';
import { AccountTypeOptions } from './constant';
import CreateAccount from './CreateAccount';

interface IHomePageProps {}
type IFormSearchInput = {
    UserName: string;
    TypeAccount: string[];
};

const HomePage: FC<IHomePageProps> = (props): React.ReactElement => {
    const [api, contextHolder] = notification.useNotification();

    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [selectedRowObj, setSelectedRowObj] = useState<any[]>([]);
    const [isOpenCreateAccountModal, setIsOpenCreateAccountModal] = useState(false);

    const [formSearchInput, setFormSearchInput] = useState<IFormSearchInput>({
        UserName: '',
        TypeAccount: AccountTypeOptions.map((item) => item.value),
    });

    const isDisableButtonActions = selectedRowObj.length === 0;

    const columnsSetting: ColumnType[] = useMemo(() => {
        return [
            {
                title: 'UserName',
                dataIndex: 'UserName',
                key: 'UserName',
                width: 100,
                fixed: 'left',
                render: (item: any, record: any, index: number) => {
                    return (
                        <Flex key={index} align="center" justify="space-between">
                            <Typography.Paragraph ellipsis style={{ width: 250, marginBottom: 0 }}>
                                {item}
                            </Typography.Paragraph>
                            {renderCommandButtons(record)}
                        </Flex>
                    );
                },
            },
            {
                title: 'Password',
                dataIndex: 'Password',
                key: 'Password',
                width: 100,
            },
            {
                title: 'AuthenticationCode',
                dataIndex: 'AuthenticationCode',
                key: 'AuthenticationCode',
                width: 100,
            },
            {
                title: 'TypeAccount',
                dataIndex: 'TypeAccount',
                key: 'TypeAccount',
                width: 100,
                render: (value: any, record: any, index: number) => {
                    const label = AccountTypeOptions.find((item) => item.value == value);
                    return (
                        <Typography.Paragraph ellipsis style={{ width: 250, marginBottom: 0 }}>
                            {label?.label}
                        </Typography.Paragraph>
                    );
                },
            },
            {
                title: 'ProfileName',
                dataIndex: 'ProfileChrome',
                key: 'ProfileName',
                width: 100,
                render: (item: any, record: any, index: number) => {
                    return (
                        <Typography.Paragraph ellipsis style={{ width: 250, marginBottom: 0 }}>
                            {item?.ProfileName}
                        </Typography.Paragraph>
                    );
                },
            },
            {
                title: 'UsrDirPath',
                dataIndex: 'ProfileChrome',
                key: 'UsrDirPath',
                width: 100,
                render: (item: any, record: any, index: number) => {
                    return (
                        <Typography.Paragraph ellipsis style={{ width: 250, marginBottom: 0 }}>
                            {item?.UsrDirPath}
                        </Typography.Paragraph>
                    );
                },
            },
            {
                title: 'ExcutablePath',
                dataIndex: 'ProfileChrome',
                key: 'ExcutablePath',
                with: 300,
                render: (item: any, record: any, index: number) => {
                    return (
                        <Typography.Paragraph ellipsis style={{ width: 250, marginBottom: 0 }}>
                            {item?.ExcutablePath}
                        </Typography.Paragraph>
                    );
                },
            },
        ];
    }, []);

    const commandButtonSetting = useMemo(() => {
        return [
            {
                key: 'OpenChrome',
                label: 'Open Chrome',
                onClick: () => {
                    openMultipleAccount(selectedRowObj);
                },
            },
            {
                key: 'AccountDetail',
                label: 'AccountDetail',
            },
            {
                key: 'DeleteAccount',
                label: 'Delete Account',
            },
        ];
    }, []);

    const getList = async () => {
        const formSearch: Record<string, any> = {};

        if (formSearchInput.UserName) {
            formSearch['UserName'] = formSearchInput.UserName;
        }

        if (formSearchInput.TypeAccount.length) {
            formSearch['TypeAccount'] = formSearchInput.TypeAccount;
        }

        setLoading(true);
        MainServices.getAccounts(formSearch)
            .then((result) => {
                setDataSource(result.data.data);
            })
            .catch(() => {})
            .finally(() => {
                setLoading(false);
            });
    };

    const openMultipleAccount = async (data: any[]) => {
        try {
            const response = await MainServices.openMultipleAccount(data);
            const { dataOpened, dataClosed } = response.data;
            dataOpened.forEach((item: any) => {
                api.info({
                    message: `Open Successfully Twitter Account ${item.UserName}`,
                    description: `Create Successfully Twitter Account ${item.UserName}`,
                    placement: 'topRight',
                });
            });

            dataClosed.forEach((item: any) => {
                api.error({
                    message: `Open failure Twitter Account ${item.UserName}`,
                    description: `Create failure Twitter Account ${item.UserName}`,
                    placement: 'topRight',
                });
            });
        } catch (error) {
            api.error({
                message: `Open failure Twitter Account ${error}`,
                description: `Create failure Twitter Account ${error}`,
                placement: 'topRight',
            });
        }
    };
    const onCommandButtonClick = async (buttonAction: any, record: any) => {
        console.log(buttonAction, record);
        if (buttonAction.key === 'OpenChrome') {
            openMultipleAccount([record]);
        }
    };

    const renderCommandButtons = (record: any) => {
        return (
            <Dropdown
                menu={{
                    items: commandButtonSetting,
                    onClick: (buttonAction: any) => {
                        onCommandButtonClick(buttonAction, record);
                    },
                }}
                placement="bottom"
            >
                <Button>
                    <Space>
                        Actions
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
        );
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: any[]) => {
        console.log(newSelectedRowKeys, selectedRows);
        setSelectedRowObj(selectedRows);
    };

    const onSearch = () => {
        getList();
    };

    useEffect(() => {
        getList();
    }, []);
    return (
        <LayoutDefault>
            <PanelContainer>
                <PanelItem headerTitle="Form Search">
                    <Row gutter={24} style={{ marginBottom: 10 }}>
                        <Col className="gutter-row" span={3}>
                            <Typography.Paragraph style={{ marginBottom: 0 }}>Username:</Typography.Paragraph>
                        </Col>
                        <Col className="gutter-row" span={21}>
                            <Input
                                placeholder="Search"
                                onChange={(event) => {
                                    setFormSearchInput((prevState: IFormSearchInput) => ({
                                        ...prevState,
                                        UserName: event.target.value,
                                    }));
                                }}
                            />
                        </Col>
                    </Row>

                    <Row gutter={24} style={{ marginBottom: 10 }}>
                        <Col className="gutter-row" span={3}>
                            <Typography.Paragraph style={{ marginBottom: 0 }}>Account Type:</Typography.Paragraph>
                        </Col>
                        <Col className="gutter-row" span={5}>
                            <Input placeholder="Search" />
                        </Col>

                        <Col className="gutter-row" span={3}>
                            <Typography.Paragraph style={{ marginBottom: 0 }}>Account Type:</Typography.Paragraph>
                        </Col>
                        <Col className="gutter-row" span={5}>
                            <Input placeholder="Search" />
                        </Col>

                        <Col className="gutter-row" span={3}>
                            <Typography.Paragraph style={{ marginBottom: 0 }}>Account Type:</Typography.Paragraph>
                        </Col>
                        <Col className="gutter-row" span={5}>
                            <Input placeholder="Search" />
                        </Col>
                    </Row>

                    <Row gutter={24} style={{ marginBottom: 10 }}>
                        <Col className="gutter-row" span={3}>
                            <Typography.Paragraph style={{ marginBottom: 0 }}>Account Type:</Typography.Paragraph>
                        </Col>
                        <Col className="gutter-row" span={21}>
                            <Checkbox.Group
                                options={AccountTypeOptions}
                                defaultValue={formSearchInput.TypeAccount}
                                onChange={(checkedValue: string[]) => {
                                    setFormSearchInput((prevState: IFormSearchInput) => ({
                                        ...prevState,
                                        TypeAccount: checkedValue,
                                    }));
                                }}
                            />
                        </Col>
                    </Row>

                    <Flex gap={10} justify="flex-end" align="center">
                        <Button
                            onClick={() => {
                                setIsOpenCreateAccountModal(true);
                            }}
                        >
                            Create Account
                        </Button>
                        <Button type="primary" onClick={onSearch} disabled={loading}>
                            Search
                        </Button>
                    </Flex>
                </PanelItem>

                <PanelItem headerTitle="Search Results">
                    <Flex vertical gap={10}>
                        <Flex gap={10} justify="flex-end">
                            {commandButtonSetting.map((item) => {
                                return (
                                    <Button key={item.key} disabled={isDisableButtonActions} onClick={item.onClick}>
                                        {item.label}
                                    </Button>
                                );
                            })}
                        </Flex>
                        <Table
                            dataSource={dataSource}
                            columns={columnsSetting}
                            loading={loading}
                            scroll={{ x: 'max-content' }}
                            rowSelection={{
                                onChange: onSelectChange,
                            }}
                        />
                    </Flex>
                </PanelItem>
            </PanelContainer>

            {isOpenCreateAccountModal && (
                <CreateAccount
                    ModalProps={{
                        open: isOpenCreateAccountModal,
                        onClose: () => {
                            setIsOpenCreateAccountModal(false);
                        },
                        onCancel: () => {
                            setIsOpenCreateAccountModal(false);
                        },
                    }}
                />
            )}
            {contextHolder}
        </LayoutDefault>
    );
};

export default HomePage;

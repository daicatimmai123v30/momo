import { DownOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Dropdown, Flex, Input, notification, Row, Space, Table, Typography } from 'antd';
import { ColumnType } from 'antd/es/table';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { PanelContainer } from '../../components/atoms/CommonPanel/PanelContainer';
import { PanelItem } from '../../components/atoms/CommonPanel/PanelItem';
import LayoutDefault from '../../components/templates/LayoutDefault';
import MainServices from '../../services/MainServices';
import { AccountTypeOptions } from './constant';
import CreateAccount from './CreateAccount';
import { convertStringToDateTime } from '../../utils/dateUtils';

interface ISchedulePageProps {}
type IFormSearchInput = {
    UserName: string;
    TypeAccount: string[];
};

const SchedulePage: FC<ISchedulePageProps> = (props): React.ReactElement => {
    const [api, contextHolder] = notification.useNotification();

    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [selectedRowObj, setSelectedRowObj] = useState<any[]>([]);
    const [isOpenCreateAccountModal, setIsOpenCreateAccountModal] = useState(false);

    const [formSearchInput, setFormSearchInput] = useState<IFormSearchInput>({
        UserName: '',
        TypeAccount: AccountTypeOptions.map((item) => item.value),
    });

    const columnsSetting: ColumnType[] = useMemo(() => {
        return [
            {
                title: 'Title',
                dataIndex: 'Title',
                key: 'Title',
                width: 100,
                fixed: 'left',
            },
            {
                title: 'StartTime',
                dataIndex: 'StartTime',
                key: 'StartTime',
                width: 100,
                render: (value: any, record: any, index: number) => {
                    return convertStringToDateTime(value);
                },
            },
            {
                title: 'EndTime',
                dataIndex: 'EndTime',
                key: 'EndTime',
                width: 100,
                render: (value: any, record: any, index: number) => {
                    return convertStringToDateTime(value);
                },
            },
            {
                title: 'Interval Minutes',
                dataIndex: 'IntervalMinutes',
                key: 'IntervalMinutes',
                width: 100,
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
                    <Flex vertical gap={10}>
                        <Flex align="center">
                            <Button color="default" variant="link" icon={<PlusOutlined />}>
                                Create Schedule
                            </Button>

                            <Button color="default" variant="link" icon={<ReloadOutlined />}>
                                Refresh
                            </Button>
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

export default SchedulePage;

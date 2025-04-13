import { Breadcrumb, Layout, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { ItemType } from 'antd/es/menu/interface';
import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FooterDefault from '../FooterDefault';
import HeaderDefault from '../HeaderDefault';
import SiderDefault from '../SiderDefault';
import styles from './style.module.scss';

type ILayoutDefaultProps = {} & React.PropsWithChildren;

const LayoutDefault: FC<ILayoutDefaultProps> = (props): React.ReactElement => {
    const { children } = props;

    const location = useLocation();
    const navigate = useNavigate();

    const pathname = location.pathname.split('/').slice(1);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const HeaderMenu: ItemType[] = [
        {
            key: 'HomePage',
            label: `Home`,
            onClick: () => {
                navigate('/HomePage/TwitterAccount');
            },
        },
    ];

    const SiderMenu: ItemType[] = [
        {
            key: 'TwitterAccount',
            label: `Twitter Account`,
            onClick: () => {
                navigate('/HomePage/TwitterAccount');
            },
        },
        {
            key: 'SchedulePage',
            label: `Schedule`,
            onClick: () => {
                navigate('/HomePage/SchedulePage');
            },
        },
    ];

    return (
        <Layout>
            <HeaderDefault menuItems={{ items: HeaderMenu, selectedKeys: [pathname[0]] }} />
            <Layout>
                <SiderDefault menuItems={{ items: SiderMenu, selectedKeys: [pathname[1]] }} />
                <Layout className={styles['BodyContainer']}>
                    <Breadcrumb
                        className={styles['Breadcrumb']}
                        items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
                    />
                    <Content className={styles['ContentContainer']}>{children}</Content>
                    <FooterDefault />
                </Layout>
            </Layout>
        </Layout>
    );
};

export default LayoutDefault;

import { Menu, MenuProps, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { FC } from 'react';
import styles from './style.module.scss';

interface ISiderDefaultProps {
    menuItems: MenuProps;
}

const SiderDefault: FC<ISiderDefaultProps> = (props): React.ReactElement => {
    const { menuItems } = props;

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Sider className={styles['SiderContainer']} style={{ background: colorBgContainer }}>
            <div className="demo-logo" />
            <Menu className={styles['Menu']} mode="inline" {...menuItems} />
        </Sider>
    );
};

export default SiderDefault;

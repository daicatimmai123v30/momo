import { Menu, MenuProps, theme } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React, { FC } from 'react';

interface IHeaderDefaultProps {
    menuItems: MenuProps;
}

const HeaderDefault: FC<IHeaderDefaultProps> = (props): React.ReactElement => {
    const { menuItems } = props;

    return (
        <Header style={{ display: 'flex', alignItems: 'center' }}>
            <div className="demo-logo" />
            <Menu theme="dark" mode="horizontal" style={{ height: '100%', borderRight: 0 }} {...menuItems} />
        </Header>
    );
};

export default HeaderDefault;

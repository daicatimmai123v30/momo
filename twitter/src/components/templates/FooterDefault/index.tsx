import { Footer } from 'antd/es/layout/layout';
import React from 'react';
import { FC } from 'react';

interface IFooterDefaultProps {}

const FooterDefault: FC<IFooterDefaultProps> = (props): React.ReactElement => {
    return (
        <Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant DaiTL</Footer>
    );
};

export default FooterDefault;

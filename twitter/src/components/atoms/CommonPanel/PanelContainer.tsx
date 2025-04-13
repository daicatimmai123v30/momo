import { Flex } from 'antd';
import * as React from 'react';

export type PanelContainerProps = {} & React.PropsWithChildren;

const PanelContainer: React.FC<PanelContainerProps> = (props) => {
    const { children } = props;
    return (
        <Flex gap={20} vertical>
            {children}
        </Flex>
    );
};

export { PanelContainer };

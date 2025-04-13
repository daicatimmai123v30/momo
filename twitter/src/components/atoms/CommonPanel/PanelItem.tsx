import * as React from 'react';
import styles from './CommonPanel.module.scss';
import { Divider, Flex, Typography } from 'antd';

export type PanelItemProps = {
    headerTitle?: string;
} & React.PropsWithChildren;

const PanelItem: React.FC<PanelItemProps> = (props) => {
    const { children, headerTitle } = props;
    return (
        <Flex className={styles['panelItem']} vertical>
            {headerTitle && (
                <>
                    <Typography.Paragraph className={styles['Title']}>{headerTitle}</Typography.Paragraph>
                    <Divider style={{ marginTop: '0px', marginBottom: '20px' }} />
                </>
            )}
            {children}
        </Flex>
    );
};

export { PanelItem };

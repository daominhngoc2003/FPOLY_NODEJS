import type { CountdownProps } from 'antd';
import { Col, Row, Statistic } from 'antd';
import React from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
type Props = {}

const Dashboard = (props: Props) => {
    const { Countdown } = Statistic;

    const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Dayjs is also OK

    const onFinish: CountdownProps['onFinish'] = () => {
        console.log('finished!');
    };

    const onChange: CountdownProps['onChange'] = (val) => {
        if (typeof val === 'number' && 4.95 * 1000 < val && val < 5 * 1000) {
            console.log('changed!');
        }
    };
    return (
        <div className='text-center'>
            <Row gutter={16}>
                <Col span={12}>
                    <Countdown title="Countdown" value={deadline} onFinish={onFinish} />
                </Col>
                <Col span={12}>
                    <Countdown title="Million Seconds" value={deadline} format="HH:mm:ss:SSS" />
                </Col>
                <Col span={24} style={{ marginTop: 32 }}>
                    <Countdown title="Day Level" value={deadline} format="D 天 H 时 m 分 s 秒" />
                </Col>
                <Col span={12}>
                    <Countdown title="Countdown" value={Date.now() + 10 * 1000} onChange={onChange} />
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                            title="Active"
                            value={11.28}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                            title="Idle"
                            value={9.3}
                            precision={2}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<ArrowDownOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
                </Col>
                <Col span={12}>
                    <Statistic title="Unmerged" value={93} suffix="/ 100" />
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard
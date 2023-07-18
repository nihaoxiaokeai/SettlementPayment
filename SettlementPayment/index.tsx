import * as React from 'react';
import * as qs from 'query-string';
import { Toast } from 'antd-mobile';
import TipText from '@components/TipText';
import Table from '@components/Table';
import { getStoreBillPaymentWarnList } from 'services/settlementPayment';
import './styles.scss';

const { memo, forwardRef, useState, useCallback, useEffect } = React;

const SettlementPayment = memo(
    forwardRef((props, ref) => {
        const searchData = qs.parse(window.location.search);
        const [headerList, setHeaderList] = useState([]);
        const [dataList, setDataList] = useState([]);
        const [remark, setRemark] = useState('');

        const getTableList = () => {
            const { msgid } = searchData;
            Toast.loading('加载中....');
            getStoreBillPaymentWarnList({ msgid })
                .then(rs => {
                    Toast.hide();
                    setHeaderList(rs['headerList'] || []);
                    setDataList(rs['dataList'] || []);
                    setRemark(rs['remark'] || '');
                    document.title = rs['title'] || '';
                })
                .catch(() => {
                    Toast.hide();
                });
        };

        useEffect(() => {
            document.title = '结算付款公告';
            getTableList();
        }, []);

        return (
            <div className="settlement-payment">
                {headerList.length > 0 && (
                    <Table
                        stickyLeftNum={0}
                        thTitleKey="name"
                        thList={headerList}
                        tdList={dataList}
                        height="80vh"
                    />
                )}
                <TipText className="tip-text" text={remark} color="#323232" size="12px" />
            </div>
        );
    })
);

export default SettlementPayment;

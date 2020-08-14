import React, { Component } from 'react';

const TableHead = ({resourceType}) =>  {
    if(resourceType === 'deposits'){
        return (
            <>
                <th>Address</th>
                <th>Token</th>
                <th>Amount</th>
                <th>Mint Amount</th>
            </>
        );
    }else if(resourceType === 'withdrawls'){
        return (
            <>
                <th>_reciever</th>
                <th>_withdrawer</th>
                <th>_token</th>
                <th>_amount</th>
                <th>_burnAmount</th>
            </>
        );
    }else if(resourceType === 'borrow'){
        return (
            <>
                <th>_borrower</th>
                <th>_token</th>
                <th>_amount</th>
                <th>_fee</th>
            </>
        );
    }

    
};

export default TableHead;
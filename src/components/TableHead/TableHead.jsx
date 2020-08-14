import React from 'react';

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
                <th>Reciever</th>
                <th>Withdrawer</th>
                <th>Token</th>
                <th>Amount</th>
                <th>Burn Amount</th>
            </>
        );
    }else if(resourceType === 'borrow'){
        return (
            <>
                <th>Borrower</th>
                <th>Token</th>
                <th>Amount</th>
                <th>Fee</th>
            </>
        );
    }

    
};

export default TableHead;
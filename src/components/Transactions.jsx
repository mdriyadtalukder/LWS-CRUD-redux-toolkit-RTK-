import React, { useEffect } from 'react';
import Transaction from './Transaction';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransaction } from '../redux/features/transactions/transactionSlice';

const Transactions = () => {
    const dispatch = useDispatch();
    const { transactions, isLoading, isError, error } = useSelector(state => state.transaction)

    useEffect(() => {
        dispatch(fetchTransaction())
    }, [dispatch])
    let content;
    if (isLoading) {
        content = <p>Loading...</p>
    }
    if (!isLoading && isError) {
        content = <p>{error}</p>
    }
    if (!isError && !isLoading && transactions?.length === 0) {
        content = <p>No Transaction Find!!</p>
    }
    if (!isError && !isLoading && transactions?.length > 0) {
        content = transactions.map(t => <Transaction t={t} key={t.id}></Transaction>)
    }
    return (
        <>
            <p className="second_heading">Your Transactions:</p>

            <div className="conatiner_of_list_of_transactions">
                <ul>
                    {content}
                </ul>
            </div>
        </>
    );
};

export default Transactions;
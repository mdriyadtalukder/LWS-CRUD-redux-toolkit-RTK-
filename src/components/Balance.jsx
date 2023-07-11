import React from 'react';
import { useSelector } from 'react-redux';
import { thousandSaparator } from '../utils/thousandSaparator';

const Balance = () => {
    const { transactions } = useSelector(state => state.transaction);
    const balaces = () => {
        let income = 0;
        transactions.forEach(t => {
            const { type, amount } = t;
            if (type === 'income') {
                income += amount;
            }
            else {
                income -= amount;
            }

        });
        return income;
    }
    return (
        <div className="top_card">
            <p>Your Current Balance</p>
            <h3>
                <span>৳ </span>
                {transactions.length > 0 ? <span>{thousandSaparator(balaces())}</span> : 0}
            </h3>
        </div>
    );
};

export default Balance;
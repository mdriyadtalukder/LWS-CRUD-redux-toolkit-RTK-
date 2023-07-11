import React from 'react';
import img from '../assets/edit.svg';
import img2 from '../assets/delete.svg';
import { useDispatch } from 'react-redux';
import { editTrans, removeTransaction } from '../redux/features/transactions/transactionSlice';
import { thousandSaparator } from '../utils/thousandSaparator';

const Transaction = ({ t }) => {
    const { id, name, type, amount } = t || {};
    const dispatch = useDispatch();
    const edits = () => {
        dispatch(editTrans(t))
    }
    const deleted = () => {
        dispatch(removeTransaction(id));
    }
    return (
        <li className={`transaction ${type}`}>
            <p>{name}</p>
            <div className="right">
                <p>৳ {thousandSaparator(amount)}</p>
                <button className="link" onClick={edits}>
                    <img
                        className="icon"
                        src={img}
                    />
                </button>
                <button onClick={deleted} className="link">
                    <img
                        className="icon"
                        src={img2}
                    />
                </button>
            </div>
        </li>
    );
};

export default Transaction;
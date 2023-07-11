import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTransaction, updateTransaction } from '../redux/features/transactions/transactionSlice';

const Form = () => {
    const [type, setType] = useState("");
    const [edit, setEdit] = useState(false);
    const names = useRef('');
    const amounts = useRef('');
    const dispatch = useDispatch();
    const { isLoading, isError, error, editing } = useSelector(state => state.transaction);

    useEffect(() => {
        if (editing?.id) {
            setEdit(true);
            setType(editing?.type);
        }
        else {
            setEdit(false);
        }

    }, [editing])

    const addTrans = (e) => {
        e.preventDefault();
        var name = names.current.value;
        var amount = Number(amounts.current.value);
        dispatch(createTransaction({
            name,
            type,
            amount,
        }));
        e.target.reset();
        setType("");
    }
    const editTrans = (e) => {
        e.preventDefault();
        var name = names.current.value;
        var amount = Number(amounts.current.value);
        dispatch(updateTransaction({
            id: editing?.id,
            data: {
                name,
                type,
                amount,
            }
        }));
        setType('');
        e.target.reset();
        setEdit(false);

    }
    const cancelTrans = (e) => {
        e.preventDefault();
        setEdit(false);
        setType("");

    }
    return (
        <div className="form">
            <h3>Add new transaction</h3>
            <form onSubmit={edit ? editTrans : addTrans} >
                <div className="form-group">
                    <label for="transaction_name">Name</label>
                    <input
                        type="text"
                        name="transaction_name"
                        placeholder="My Salary"
                        ref={names}
                        defaultValue={edit ? editing?.name : ''}
                    />
                </div>

                <div className="form-group radio">
                    <label for="transaction_type">Type</label>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="income"
                            name="transaction_type"
                            checked={type === "income"}
                            onChange={(e) => setType('income')}

                        />
                        <label for="transaction_type">Income</label>
                    </div>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="expense"
                            name="transaction_type"
                            placeholder="Expense"
                            checked={type === "expense"}
                            onChange={(e) => setType('expense')}

                        />
                        <label for="transaction_type">Expense</label>
                    </div>
                </div>

                <div className="form-group">
                    <label for="transaction_amount">Amount</label>
                    <input
                        type="number"
                        placeholder="Enter amount"
                        name="transaction_amount"
                        ref={amounts}
                        defaultValue={edit ? editing?.amount : ''}
                    />
                </div>

                <button disabled={isLoading} className="btn">{edit ? "Update Transaction" : "Add Transaction"}</button>
                {!isLoading && isError && <p className='error'>{error}</p>}
            </form>
            {
                edit && <button onClick={cancelTrans} className="btn cancel_edit">Cancel Edit</button>
            }
        </div>
    );
};

export default Form;
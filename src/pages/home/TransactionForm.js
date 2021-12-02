import { useState, useEffect } from "react"
import { useFirestore } from '../../hooks/useFirestore'

export default function TransactionForm({ uid }) {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const { addDocument, response } = useFirestore('transactions')

    const handleSubmit = (e) => {
        e.preventDefault()
        addDocument({
            uid, 
            name,
            amount
        })
        console.log("response " + response.success)
    }

    // reset the form fields
    useEffect (() => {
        if (response.success) {
            setName('')
            setAmount('')
            console.log(response.success)
        }
    }, [response.success])

    return (
        <>
            <h3>Add a Transaction</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Transaction name:</span>
                    <input
                    type='text'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                </label>
                <label>
                    <span>Amount ($):</span>
                    <input
                    type='number'
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                />
                </label>
                <button>Add Transaction</button>
            </form>
        </>
    )
}

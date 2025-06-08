import {useState} from 'react'
import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <h1> count: {count}</h1>
            <div>
                <button onClick={() => setCount(prevState => prevState + 1)}>+1</button>
            </div>
        </>
    )
}

export default App

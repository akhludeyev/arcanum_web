import { useState } from 'react'
import './styles/App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="app">
            <header className="app-header">
                <h1>🔮 Arcanum - Матрица Судьбы</h1>
                <p>Web-приложение для нумерологического анализа</p>
            </header>

            <main className="app-main">
                <div className="card">
                    <h2>Добро пожаловать!</h2>
                    <p>Проект успешно инициализирован</p>

                    <div className="counter">
                        <button onClick={() => setCount((count) => count + 1)}>
                            Счетчик: {count}
                        </button>
                    </div>

                    <div className="features">
                        <h3>Что будет реализовано:</h3>
                        <ul>
                            <li>✅ Матрица Судьбы (22 аркана)</li>
                            <li>✅ Психоматрица Пифагора</li>
                            <li>✅ Совместимость пар</li>
                            <li>✅ Роль ребенка в роду</li>
                        </ul>
                    </div>
                </div>
            </main>

            <footer className="app-footer">
                <p>Разработка началась {new Date().toLocaleDateString('ru-RU')}</p>
            </footer>
        </div>
    )
}

export default App

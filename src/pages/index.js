import { useEffect, useState } from 'react'
import { socket } from '../socket'

export default function Home() {
  const [isConnected, setIsConnected] = useState(false)
  const [transport, setTransport] = useState('N/A')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (socket.connected) {
      onConnect()
    }

    function onConnect() {
      setIsConnected(true)
      setTransport(socket.io.engine.transport.name)

      socket.io.engine.on('upgrade', (transport) => {
        setTransport(transport.name)
      })
    }

    function onDisconnect() {
      setIsConnected(false)
      setTransport('N/A')
    }

    function onReturnMessage(msg) {
      setMessages((prev) => [...prev, msg])
    }

    socket.on('connect', onConnect)
    socket.on('return:message', onReturnMessage)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('return:message', onReturnMessage)
    }
  }, [])

  async function submitMessage() {
    socket.emit('message', message)
    setMessage('')
  }

  return (
    <div>
      <p>Status: {isConnected ? 'connected' : 'disconnected'}</p>
      <p>Transport: {transport}</p>
      <div>
        <input
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          value={message}
          className="text-black"
        ></input>
        <button className="border border-white" onClick={() => submitMessage()}>
          submit
        </button>
      </div>
      <ul id="messages">
        {messages.map((msg, index) => (
          <li key={index} className="text-white">
            {msg}
          </li>
        ))}
      </ul>
    </div>
  )
}

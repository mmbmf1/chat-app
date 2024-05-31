import React, { useEffect, useState, useRef } from 'react'
import { socket } from '../socket'

export default function Home() {
  const [isConnected, setIsConnected] = useState(false)
  const [transport, setTransport] = useState('N/A')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef(null)

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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  async function submitMessage() {
    socket.emit('message', message)
    console.log('socket', socket.id)
    setMessage('')
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 border-b border-gray-700 bg-gray-800 fixed top-0 left-0 right-0 z-10">
        <p className="text-xs">
          Status: {isConnected ? 'connected' : 'disconnected'}
        </p>
        <p className="text-xs">Transport: {transport}</p>
      </div>
      <div className="p-8 mt-16 flex-grow overflow-y-auto pb-24">
        <ul id="messages" className="mt-4">
          {messages.map((msg, index) => (
            <div key={index} className="py-4">
              {socket.id} @ {new Date().toString()}
              <div className="flex my-1">
                <li className="text-white border-2 rounded-md w-full p-2">
                  {msg}
                </li>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </ul>
      </div>
      <div className="p-4 border-t border-gray-700 bg-gray-800 fixed bottom-0 left-0 right-0 flex z-10">
        <input
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          value={message}
          className="text-black flex-grow p-2"
        ></input>
        <button
          className="border border-white ml-2 px-4"
          onClick={submitMessage}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

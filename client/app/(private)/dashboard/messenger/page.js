"use client";
import LeftUser from "@/components/LeftUser";
import Messenger from "@/components/seller/Messenger";
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const users = [
  {
    id: 1,
    name: 'HeRa',
    avatar: '/users.jpg',
    status: 'Online',
    address: "503 Broadway",
    city: "New York",
    country: "USA",
    position: "Warehouse Manager",
    phone: "+1 (646) 123-1234",
    email: "glyon@instock.com"
  },
  {
    id: 2,
    name: 'HeRa Khan',
    avatar: '/user.jpg',
    status: 'Offline',
    address: "503 Broadway",
    city: "New York",
    country: "USA",
    position: "Warehouse Manager",
    phone: "+1 (646) 123-1234",
    email: "glyon@instock.com"
  },
];

export default function Home() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);
  return (
    <div className="max-w-screen-xl mx-auto py-4 md:px-8">
      <div className="flex flex-col md:flex-row items-start">
        <div className="w-full md:w-3/12">
          <LeftUser />
        </div>
        <div className="w-full md:w-9/12 pl-0 md:pl-6">
          <Messenger users={users} socket={socket} />
        </div>
      </div>
    </div>
  );
}
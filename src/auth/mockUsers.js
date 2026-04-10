import { User } from '../models/User'

export const mockUsers = [
  new User({
    id: 5001,
    name: 'Admin User',
    phone: '0500000001',
    password: '123456',
    email: 'admin@dewedding.local',
    village: 'كسرى',
    role: 'admin',
    phoneVerified: true,
    myEvents: [101],
  }).toJSON(),
  new User({
    id: 5002,
    name: 'General Supervisor',
    phone: '0500000002',
    password: '123456',
    email: 'general@dewedding.local',
    village: 'كسرى',
    role: 'generalSupervisor',
    phoneVerified: true,
    myEvents: [102],
  }).toJSON(),
  new User({
    id: 5003,
    name: 'Village Supervisor',
    phone: '0500000003',
    password: '123456',
    email: 'village@dewedding.local',
    village: 'كفرسميع',
    role: 'villageSupervisor',
    phoneVerified: true,
    myEvents: [103],
  }).toJSON(),
]

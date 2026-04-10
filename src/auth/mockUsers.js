import { User } from '../models/User'

export const mockUsers = [
  new User({ id: 5001, name: 'Admin User', phone: '0500000001', village: 'كسرى', role: 'admin', myEvents: [101], phoneVerified: true }).toJSON(),
  new User({ id: 5002, name: 'Supervisor User', phone: '0500000002', village: 'كسرى', role: 'supervisor', myEvents: [102], phoneVerified: true }).toJSON(),
  new User({ id: 5003, name: 'Village Customer', phone: '0500000003', village: 'كفرسميع', role: 'user', myEvents: [103], phoneVerified: true }).toJSON(),
]

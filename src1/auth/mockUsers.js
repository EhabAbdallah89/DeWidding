import { User } from '../models/User'

export const mockUsers = [
  new User({
    id: 1,
    name: 'Admin User',
    role: 'admin'
  }).toJSON(),

  new User({
    id: 2,
    name: 'General Supervisor',
    role: 'generalSupervisor'
  }).toJSON(),

  new User({
    id: 3,
    name: 'Village Supervisor - كسرى',
    role: 'villageSupervisor',
    village: 'كسرى'
  }).toJSON(),

  new User({
    id: 4,
    name: 'Village Supervisor - كفرسميع',
    role: 'villageSupervisor',
    village: 'كفرسميع'
  }).toJSON(),

  new User({
    id: 5,
    name: 'Event Creator',
    role: 'eventCreator'
  }).toJSON(),

  new User({
    id: 6,
    name: 'Regular Customer',
    role: 'regular'
  }).toJSON()
]

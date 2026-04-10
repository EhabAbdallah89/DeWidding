import { Event } from '../models/Event'

export const villages = ['البقيعة', 'بيت جن', 'يانوح', 'كفرسميع', 'كسرى']

export const seedEvents = [
  Event.fromJSON({
    id: 101,
    groom: 'سامي',
    bride: 'هديل',
    hall: 'الكرمل',
    date: '2026-06-18',
    village: 'كسرى',
    createdByUserId: 5,
    status: 'approved'
  }).toJSON(),

  Event.fromJSON({
    id: 102,
    groom: 'أحمد',
    bride: 'لينا',
    hall: 'النور',
    date: '2026-06-15',
    village: 'كسرى',
    createdByUserId: 3,
    status: 'approved'
  }).toJSON(),

  Event.fromJSON({
    id: 103,
    groom: 'محمد',
    bride: 'سارة',
    hall: 'الكرمل',
    date: '2026-06-20',
    village: 'كفرسميع',
    createdByUserId: 4,
    status: 'approved'
  }).toJSON(),

  Event.fromJSON({
    id: 104,
    groom: 'رامي',
    bride: 'نور',
    hall: 'الواحة',
    date: '2026-07-05',
    village: 'البقيعة',
    createdByUserId: 5,
    status: 'pending'
  }).toJSON()
]

export const events = seedEvents

import { Event } from '../models/Event'

export const villages = ['البقيعة', 'بيت جن', 'يانوح', 'كفرسميع', 'كسرى']

export const seedEvents = [
  Event.fromJSON({ id: 101, type: 'wedding', groom: 'سامي', bride: 'هديل', hall: 'الكرمل', date: '2026-06-18', village: 'كسرى', createdByUserId: 5001, status: 'approved', title: 'عرس سامي وهديل' }).toJSON(),
  Event.fromJSON({ id: 102, type: 'wedding', groom: 'أحمد', bride: 'لينا', hall: 'النور', date: '2026-06-15', village: 'كسرى', createdByUserId: 5002, status: 'approved', title: 'عرس أحمد ولينا' }).toJSON(),
  Event.fromJSON({ id: 103, type: 'wedding', groom: 'محمد', bride: 'سارة', hall: 'الكرمل', date: '2026-06-20', village: 'كفرسميع', createdByUserId: 5003, status: 'approved', title: 'عرس محمد وسارة' }).toJSON(),
  Event.fromJSON({ id: 104, type: 'wedding', groom: 'إيهاب', bride: 'ريم', hall: 'الأندلس', date: '2026-04-08', village: 'كسرى', createdByUserId: 5004, status: 'pending', title: 'عرس إيهاب وريم' }).toJSON(),
  Event.fromJSON({ id: 105, type: 'wedding', groom: 'كرم', bride: 'نور', hall: 'البستان', date: '2026-04-01', village: 'البقيعة', createdByUserId: 5005, status: 'pending', title: 'عرس كرم ونور' }).toJSON(),
  Event.fromJSON({ id: 106, type: 'wedding', groom: 'رامي', bride: 'هبة', hall: 'البيت', date: '2026-03-25', village: 'كسرى', createdByUserId: 5002, status: 'rejected', title: 'عرس رامي وهبة' }).toJSON(),
]

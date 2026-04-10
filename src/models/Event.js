export class Event {
  constructor({
    id,
    type = 'wedding',
    groom = '',
    bride = '',
    hall = '',
    date = '',
    village = '',
    createdByUserId,
    status = 'approved',
    title = '',
  }) {
    this.id = id
    this.type = type
    this.groom = groom
    this.bride = bride
    this.hall = hall
    this.date = date
    this.village = village
    this.createdByUserId = createdByUserId
    this.status = status
    this.title = title
  }

  static create(data) {
    return new Event({ id: Date.now(), ...data })
  }

  static fromJSON(data) {
    return new Event(data)
  }

  toJSON() {
    return {
      id: this.id,
      type: this.type,
      groom: this.groom,
      bride: this.bride,
      hall: this.hall,
      date: this.date,
      village: this.village,
      createdByUserId: this.createdByUserId,
      status: this.status,
      title: this.title,
    }
  }
}

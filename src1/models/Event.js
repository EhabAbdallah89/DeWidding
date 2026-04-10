export class Event {
  constructor({
    id,
    groom,
    bride,
    hall,
    date,
    village,
    createdByUserId,
    status = 'approved'
  }) {
    this.id = id
    this.groom = groom
    this.bride = bride
    this.hall = hall
    this.date = date
    this.village = village
    this.createdByUserId = createdByUserId
    this.status = status
  }

  static create(data) {
    return new Event({
      id: Date.now(),
      ...data
    })
  }

  static fromJSON(data) {
    return new Event(data)
  }

  toJSON() {
    return {
      id: this.id,
      groom: this.groom,
      bride: this.bride,
      hall: this.hall,
      date: this.date,
      village: this.village,
      createdByUserId: this.createdByUserId,
      status: this.status
    }
  }
}

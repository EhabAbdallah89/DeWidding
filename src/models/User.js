export class User {
  constructor({
    id,
    name,
    phone,
    village,
    profileImage = '',
    role = 'user',
    isActive = true,
    myEvents = [],
    phoneVerified = false,
    avatarMode = 'default',
  }) {
    this.id = id
    this.name = name
    this.phone = phone
    this.village = village
    this.profileImage = profileImage
    this.role = role
    this.isActive = isActive
    this.myEvents = myEvents
    this.phoneVerified = phoneVerified
    this.avatarMode = avatarMode
  }

  static create(data) {
    return new User({ id: Date.now(), ...data })
  }

  static fromJSON(data) {
    return new User(data)
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      village: this.village,
      profileImage: this.profileImage,
      role: this.role,
      isActive: this.isActive,
      myEvents: this.myEvents,
      phoneVerified: this.phoneVerified,
      avatarMode: this.avatarMode,
    }
  }
}

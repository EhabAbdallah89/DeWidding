export class User {
  constructor({
    id,
    name,
    phone,
    email = '',
    password,
    village,
    profileImage = '',
    role = 'regular',
    isActive = true,
    myEvents = [],
    phoneVerified = false,
  }) {
    this.id = id
    this.name = name
    this.phone = phone
    this.email = email
    this.password = password
    this.village = village
    this.profileImage = profileImage
    this.role = role
    this.isActive = isActive
    this.myEvents = myEvents
    this.phoneVerified = phoneVerified
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
      email: this.email,
      password: this.password,
      village: this.village,
      profileImage: this.profileImage,
      role: this.role,
      isActive: this.isActive,
      myEvents: this.myEvents,
      phoneVerified: this.phoneVerified,
    }
  }
}

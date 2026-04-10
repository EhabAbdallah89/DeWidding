export class User {
  constructor({
    id,
    name,
    phone,
    password,
    email = '',
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
    this.password = password
    this.email = email
    this.village = village
    this.profileImage = profileImage
    this.role = role
    this.isActive = isActive
    this.myEvents = Array.isArray(myEvents) ? myEvents : []
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
      password: this.password,
      email: this.email,
      village: this.village,
      profileImage: this.profileImage,
      role: this.role,
      isActive: this.isActive,
      myEvents: this.myEvents,
      phoneVerified: this.phoneVerified,
    }
  }
}

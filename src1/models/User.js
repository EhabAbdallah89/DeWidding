export class User {
  constructor({
    id,
    name,
    role,
    village = '',
    isActive = true
  }) {
    this.id = id
    this.name = name
    this.role = role
    this.village = village
    this.isActive = isActive
  }

  static fromJSON(data) {
    return new User(data)
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      role: this.role,
      village: this.village,
      isActive: this.isActive
    }
  }
}

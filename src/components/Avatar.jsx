function Avatar({ name = '', image = '', size = 40 }) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  const style = { width: size, height: size }

  if (image) {
    return <img src={image} alt={name || 'user'} className="avatar-img" style={style} />
  }

  return (
    <div className="avatar-fallback" style={style} aria-hidden="true">
      {initials || 'U'}
    </div>
  )
}

export default Avatar

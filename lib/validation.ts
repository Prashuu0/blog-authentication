export const validatePhone = (phone: string): boolean => {
  // Indian phone number validation
  const phoneRegex = /^(\+91[\-\s]?)?[789]\d{9}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []
  
  if (password.length < 6) {
    errors.push("Password must be at least 6 characters long")
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter")
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter")
  }
  
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number")
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export const validateAddress = (address: {
  name: string
  phone: string
  street: string
  city: string
  state: string
  zipCode: string
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {}
  
  if (!address.name.trim()) {
    errors.name = "Name is required"
  }
  
  if (!validatePhone(address.phone)) {
    errors.phone = "Please enter a valid phone number"
  }
  
  if (!address.street.trim()) {
    errors.street = "Street address is required"
  }
  
  if (!address.city.trim()) {
    errors.city = "City is required"
  }
  
  if (!address.state.trim()) {
    errors.state = "State is required"
  }
  
  if (!address.zipCode.trim()) {
    errors.zipCode = "ZIP code is required"
  } else if (!/^\d{6}$/.test(address.zipCode)) {
    errors.zipCode = "Please enter a valid 6-digit ZIP code"
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const validateProfile = (profile: {
  name: string
  phone: string
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {}
  
  if (!profile.name.trim()) {
    errors.name = "Name is required"
  } else if (profile.name.length < 2) {
    errors.name = "Name must be at least 2 characters long"
  }
  
  if (profile.phone && !validatePhone(profile.phone)) {
    errors.phone = "Please enter a valid phone number"
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '')
  
  // Format as Indian phone number
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`
  } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`
  }
  
  return phone
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const getOrderStatusColor = (status: string): string => {
  switch (status) {
    case 'delivered': return 'text-green-600 bg-green-50'
    case 'shipped': return 'text-blue-600 bg-blue-50'
    case 'processing': return 'text-yellow-600 bg-yellow-50'
    case 'pending': return 'text-gray-600 bg-gray-50'
    case 'cancelled': return 'text-red-600 bg-red-50'
    case 'returned': return 'text-orange-600 bg-orange-50'
    default: return 'text-gray-600 bg-gray-50'
  }
}

export const getOrderStatusText = (status: string): string => {
  switch (status) {
    case 'delivered': return 'Delivered'
    case 'shipped': return 'Shipped'
    case 'processing': return 'Processing'
    case 'pending': return 'Pending'
    case 'cancelled': return 'Cancelled'
    case 'returned': return 'Returned'
    default: return status
  }
} 
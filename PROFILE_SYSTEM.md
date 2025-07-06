# User Profile System

एक complete user profile system जैसा Flipkart/Amazon में होता है, जिसमें सभी essential features हैं।

## Features

### 1. Personal Information Management
- **Name**: Editable full name
- **Email**: Display only (non-editable for security)
- **Phone**: Editable phone number with Indian format validation
- **Member Since**: Display account creation date
- **Form Validation**: Real-time validation with error messages

### 2. Address Management
- **Multiple Addresses**: Add, edit, and delete addresses
- **Address Types**: Home, Work, Other
- **Default Address**: Set one address as default
- **Complete Form**: Street, city, state, ZIP code, country
- **Phone Number**: Each address has its own phone number
- **Validation**: Comprehensive form validation

### 3. Order History
- **Order Details**: Order number, date, status
- **Product Information**: Name, brand, quantity, price
- **Order Status**: Pending, Processing, Shipped, Delivered, Cancelled, Returned
- **Pricing Breakdown**: Subtotal, tax, shipping, total
- **Tracking**: Tracking number and estimated delivery
- **Visual Status**: Color-coded status badges with icons

### 4. Wishlist Management
- **Product Cards**: Image, name, brand, rating, price
- **Remove Items**: Easy removal from wishlist
- **Add to Cart**: Quick add to cart functionality
- **Date Added**: Shows when item was added
- **Responsive Grid**: Works on all screen sizes

### 5. Security Settings
- **Password Change**: Current password verification
- **Password Requirements**: Minimum 6 characters, uppercase, lowercase, numbers
- **Confirmation**: Password confirmation validation
- **Success Messages**: Clear feedback on actions

## Technical Implementation

### File Structure
```
app/
├── profile/
│   └── page.tsx                 # Main profile page
├── api/
│   └── user/
│       ├── profile/route.ts     # Profile CRUD
│       ├── orders/route.ts      # Order history
│       ├── wishlist/route.ts    # Wishlist management
│       ├── addresses/route.ts   # Address CRUD
│       └── password/route.ts    # Password change

components/
├── ProfileSidebar.tsx           # Responsive sidebar
└── ProfileSkeleton.tsx          # Loading states

lib/
├── userData.ts                  # Mock data and API functions
└── validation.ts                # Form validation utilities

types/
└── index.ts                     # TypeScript interfaces
```

### Key Components

#### ProfileSidebar
- **Mobile**: Slide-out sheet with hamburger menu
- **Desktop**: Fixed sidebar with navigation
- **Active States**: Visual indication of current tab
- **Icons**: Lucide React icons for each section

#### Form Validation
- **Phone Numbers**: Indian format validation (+91 format)
- **Passwords**: Strength requirements
- **Addresses**: Required field validation
- **Real-time**: Instant feedback on form errors

#### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Tablet**: Adaptive layout for medium screens
- **Desktop**: Full sidebar with main content area
- **Touch Friendly**: Large touch targets

### API Endpoints

#### Profile Management
```typescript
GET /api/user/profile?userId=123
PUT /api/user/profile
```

#### Address Management
```typescript
POST /api/user/addresses
PUT /api/user/addresses
DELETE /api/user/addresses
```

#### Orders
```typescript
GET /api/user/orders?userId=123
```

#### Wishlist
```typescript
GET /api/user/wishlist?userId=123
DELETE /api/user/wishlist
```

#### Password
```typescript
PUT /api/user/password
```

### Data Models

#### UserProfile
```typescript
interface UserProfile {
  id: string
  name: string
  email: string
  phone?: string
  role: "user" | "admin" | "seller"
  addresses: UserAddress[]
  defaultAddressId?: string
  preferences: {
    emailNotifications: boolean
    smsNotifications: boolean
    marketingEmails: boolean
  }
  createdAt: Date
  updatedAt: Date
}
```

#### UserAddress
```typescript
interface UserAddress {
  id: string
  userId: string
  type: "home" | "work" | "other"
  name: string
  phone: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
  createdAt: Date
  updatedAt: Date
}
```

#### Order
```typescript
interface Order {
  id: string
  userId: string
  orderNumber: string
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "returned"
  shippingAddress: UserAddress
  billingAddress: UserAddress
  paymentMethod: PaymentMethod
  trackingNumber?: string
  estimatedDelivery?: Date
  createdAt: Date
  updatedAt: Date
}
```

## Usage Instructions

### For Users

1. **Login**: Use any email/password or predefined accounts:
   - `user@example.com` / `password`
   - `admin@example.com` / `admin`

2. **Navigate**: Click on "Profile" in the header or go to `/profile`

3. **Profile Tab**: Update your name and phone number

4. **Addresses Tab**: 
   - Add new addresses with "Add Address" button
   - Edit existing addresses with pencil icon
   - Delete addresses with trash icon (except default)
   - Set default address with checkbox

5. **Orders Tab**: View your complete order history with details

6. **Wishlist Tab**: Manage saved products and remove items

7. **Security Tab**: Change your password with current password verification

### For Developers

#### Adding New Features
1. **Extend Types**: Add new interfaces in `types/index.ts`
2. **Update API**: Add new endpoints in `app/api/user/`
3. **Add Validation**: Create validation functions in `lib/validation.ts`
4. **Update UI**: Add new tabs and components as needed

#### Customization
- **Styling**: Modify Tailwind classes for different themes
- **Validation**: Update validation rules in `lib/validation.ts`
- **Data**: Replace mock data in `lib/userData.ts` with real API calls
- **Icons**: Use Lucide React icons or custom SVGs

#### Testing
- **Form Validation**: Test all form inputs with invalid data
- **Responsive**: Test on mobile, tablet, and desktop
- **Accessibility**: Ensure keyboard navigation works
- **Performance**: Check loading states and error handling

## Features Summary

✅ **Complete Profile Management**
✅ **Multiple Address Support**
✅ **Order History with Details**
✅ **Wishlist Management**
✅ **Password Security**
✅ **Form Validation**
✅ **Responsive Design**
✅ **Loading States**
✅ **Error Handling**
✅ **Success Messages**
✅ **Mobile Optimized**
✅ **Clean UI/UX**

यह system Flipkart/Amazon जैसा complete user profile experience provide करता है! 
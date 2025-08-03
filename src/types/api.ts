// API Response Types
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
  success?: boolean;
}

export interface PaginatedResponse<T> {
  page: number;
  pageSize: number;
  total: number;
  data: T[];
}

// User Types
export interface User {
  id: number;
  email: string;
  role: 'user' | 'facility' | 'admin';
  code: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role?: 'user' | 'facility' | 'admin';
}

export interface GoogleLoginRequest {
  tokenId: string;
}

export interface OTPRequest {
  phone: string;
}

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// Program Types
export interface ProgramStyle {
  id: number;
  name: string;
  code: string;
  description: string;
  status: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Facility {
  id: number;
  name: string;
  description: string;
  ctype: string;
  subtype: string;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  status: string;
  pincode?: string;
  contactNumber?: string;
  code: string;
  slug?: string;
  userCode?: string;
  userId?: number;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
  user?: User;
}

export interface Amenity {
  id: number;
  name: string;
  description: string;
  category: string;
  status: string;
  code: string;
  slug?: string;
  images: string[];
  unit?: string;
  capacity?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Program {
  id: number;
  name: string;
  code: string;
  description: string;
  approved?: boolean;
  startDate: string;
  endDate: string;
  duration?: number;
  location?: string;
  price?: number;
  images: string[];
  programConfig: Record<string, any>;
  slug: string;
  programStyleCode: string;
  status: string;
  creatorCode: string;
  primaryFacilityCode: string;
  createdAt?: string;
  updatedAt?: string;
  programStyle?: ProgramStyle;
  creator?: User;
  facility?: Facility;
  programAmenities?: Amenity[];
  amenities?: Amenity[];
}

export interface CreateProgramRequest {
  name: string;
  description: string;
  images: string[];
  programConfig: Record<string, any>;
  programStyleCode: string;
  status: string;
  startDate: string;
  endDate: string;
  creatorCode: string;
  primaryFacilityCode: string;
}

// Booking Types
export interface Booking {
  id: number;
  orderId: string;
  programId?: number;
  programCode?: string;
  userId?: number;
  userCode?: string;
  status: string;
  startDate: string;
  endDate: string;
  code: string;
  createdAt?: string;
  updatedAt?: string;
  program?: Program;
  user?: User;
}

export interface CreateBookingRequest {
  orderId: string;
  programCode: string;
  userCode: string;
  startDate: string;
  endDate: string;
  status?: string;
  code?: string;
}

// Order Types
export interface Order {
  id: number;
  userId?: number;
  userCode?: string;
  status: string;
  totalAmount: number;
  createdAt?: string;
  updatedAt?: string;
  user?: User;
}

export interface CreateOrderRequest {
  userId?: number;
  userCode?: string;
  status: string;
  totalAmount: number;
}

// Payment Types
export interface Payment {
  id: number;
  transactionId: string;
  amount: number;
  status: string;
  paidAt: string;
  orderId: number;
  createdAt?: string;
  updatedAt?: string;
  order?: Order;
}

export interface CreatePaymentRequest {
  transactionId: string;
  amount: number;
  status: string;
  paidAt: string;
  orderId: number;
}

// Review Types
export interface Review {
  id: number;
  programId?: number;
  programCode?: string;
  userId?: number;
  userCode?: string;
  rating: number;
  comment: string;
  createdAt?: string;
  updatedAt?: string;
  program?: {
    id: number;
    name: string;
    code?: string;
  };
  user?: {
    id: number;
    email: string;
    code?: string;
  };
}

export interface CreateReviewRequest {
  programCode: string;
  userCode: string;
  rating: number;
  comment: string;
}

// Location Types
export interface Country {
  id: number;
  name: string;
  status: string;
  code: string;
  slug: string;
  images: string[];
  createdAt?: string;
  updatedAt?: string;
  cities?: City[];
}

export interface City {
  id: number;
  name: string;
  status: string;
  code: string;
  slug: string;
  countryId?: number;
  countryCode?: string;
  images: string[];
  createdAt?: string;
  updatedAt?: string;
  country?: {
    name: string;
    code: string;
  };
}

// Facility Amenity Types
export interface FacilityAmenity {
  id: number;
  facilityId?: number;
  facilityCode?: string;
  amenityId?: number;
  amenityCode?: string;
  programCode?: string;
  basePrice?: number;
  unit: string;
  capacity?: number;
  status: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
  facility?: {
    name: string;
    code: string;
  };
  amenity?: {
    name: string;
    code: string;
  };
}

export interface CreateFacilityAmenityRequest {
  facilityCode: string;
  amenityCode: string;
  programCode?: string;
  basePrice?: number;
  unit: string;
  capacity?: number;
  status: string;
}

// Program Style Amenity Types
export interface ProgramStyleAmenity {
  id: number;
  programStyleId?: number;
  programStyleCode?: string;
  amenityId?: number;
  amenityCode?: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  programStyle?: {
    id: number;
    name: string;
    code: string;
    description: string;
    status: string;
    slug: string;
  };
  amenity?: Amenity;
}

export interface CreateProgramStyleAmenityRequest {
  programStyleCode: string;
  amenityCode: string;
  status: string;
}

// Program Service Types
export interface ProgramService {
  id: number;
  programId?: number;
  programCode?: string;
  facilityAmenityId: number;
  quantity: number;
  createdAt?: string;
  updatedAt?: string;
  program?: {
    name: string;
    code: string;
  };
  facilityAmenity?: {
    id: number;
    status: string;
  };
}

export interface CreateProgramServiceRequest {
  programCode: string;
  facilityAmenityId: number;
  quantity: number;
}

// Dashboard Types
export interface UserDashboard {
  bookings: PaginatedResponse<Booking>;
  reviews: Review[];
}

// Home Page Types
export interface HomePageData {
  recommended: Program[];
  newest: Program[];
}

// Facility Request Types
export interface CreateFacilityRequest {
  name: string;
  description: string;
  ctype: string;
  subtype: string;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  status: string;
  pincode?: string;
  contactNumber?: string;
  code: string;
  slug: string;
  images?: string[];
}

export interface UpdateFacilityRequest {
  name?: string;
  description?: string;
  ctype?: string;
  subtype?: string;
  address?: string;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  status?: string;
  pincode?: string;
  contactNumber?: string;
  images?: string[];
}

// Amenity Request Types
export interface CreateAmenityRequest {
  name: string;
  description: string;
  category: string;
  status: string;
  code: string;
  slug: string;
  images: string[];
}

// Query Parameters
export interface ProgramsQueryParams {
  city?: string;
  style?: string;
  page?: number;
  pageSize?: number;
}

export interface OrdersQueryParams {
  page?: number;
  pageSize?: number;
}

export interface PaymentsQueryParams {
  page?: number;
  pageSize?: number;
}

// Error Types
export interface ApiError {
  error: string;
  message?: string;
  statusCode?: number;
}
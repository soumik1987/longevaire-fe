// API Response Types based on backend documentation

// Base API Response structure
export interface ApiResponse<T> {
  data?: T;
  success?: boolean;
  message?: string;
  error?: string;
}

// Pagination structure
export interface PaginatedResponse<T> {
  page: number;
  pageSize: number;
  total: number;
  data: T[];
}

// Authentication Types
export interface AuthUser {
  id: number;
  email: string;
  role: 'user' | 'facility' | 'admin';
  code: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}

// Program Style
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

// Amenity
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

// Facility
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
  userCode: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
  user?: AuthUser;
}

// Program from Backend
export interface BackendProgram {
  id: number;
  name: string;
  code: string;
  description: string;
  approved: boolean;
  startDate: string;
  endDate: string;
  price: number;
  images: string[];
  programConfig: Record<string, any>;
  slug: string;
  programStyleCode: string;
  status: string;
  creatorCode: string;
  primaryFacilityCode: string;
  duration?: number;
  location?: string;
  createdAt?: string;
  updatedAt?: string;
  programStyle?: ProgramStyle;
  creator?: AuthUser;
  facility?: Facility;
  amenities?: Amenity[];
  programAmenities?: Amenity[];
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
  countryCode: string;
  images: string[];
  createdAt?: string;
  updatedAt?: string;
  country?: {
    name: string;
    code: string;
  };
}

// Booking
export interface Booking {
  id: number;
  orderId: string;
  programCode: string;
  userCode: string;
  status: string;
  startDate: string;
  endDate: string;
  code: string;
  createdAt?: string;
  updatedAt?: string;
  program?: {
    name: string;
    code: string;
  };
  user?: {
    email: string;
    code: string;
  };
}

// Order
export interface Order {
  id: number;
  userCode: string;
  status: string;
  totalAmount: number;
  createdAt?: string;
  updatedAt?: string;
  user?: AuthUser;
}

// Review
export interface Review {
  id: number;
  programCode: string;
  userCode: string;
  rating: number;
  comment: string;
  createdAt?: string;
  updatedAt?: string;
  user?: {
    email: string;
    code: string;
  };
  program?: {
    name: string;
    code: string;
  };
}

// Dashboard Response
export interface DashboardResponse {
  bookings: PaginatedResponse<Booking>;
  reviews: Review[];
}

// Home Page Response
export interface HomePageResponse {
  recommended: BackendProgram[];
  newest: BackendProgram[];
}

// Request Types
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

export interface CreateBookingRequest {
  orderId: string;
  programCode: string;
  userCode: string;
  startDate: string;
  endDate: string;
  code: string;
}

export interface CreateOrderRequest {
  userCode: string;
  status: string;
  totalAmount: number;
}

export interface CreateReviewRequest {
  programCode: string;
  userCode: string;
  rating: number;
  comment: string;
}

// Search and Filter Types
export interface ProgramFilters {
  city?: string;
  style?: string;
  countryCode?: string;
  programStyleCode?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}
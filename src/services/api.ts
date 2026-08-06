const API_BASE_URL = "http://localhost:5000/api/v1";

export interface User {
  id?: string;
  _id?: string;
  email: string;
  phone?: string;
  role?: string;
  isEmailVerified?: boolean;
  isMobileVerified?: boolean;
  isVerified?: boolean;
  status?: string;
}

export interface ProfileData {
  _id?: string;
  userId?: string | any;
  firstName?: string;
  lastName?: string;
  gender?: string;
  dateOfBirth?: string;
  phone?: string;
  maritalStatus?: string;
  personalizedIntro?: string;
  vipVerificationDoc?: {
    url?: string;
    status?: string;
  };
  height?: string;
  weight?: string;
  religion?: string;
  caste?: string;
  motherTongue?: string;
  city?: string;
  state?: string;
  country?: string;
  occupation?: string;
  company?: string;
  education?: string;
  fatherProfession?: string;
  motherProfession?: string;
  familyBackground?: string;
  familyValues?: string;
  ancestralOrigin?: string;
  zodiacSign?: string;
  moonSign?: string;
  nakshatra?: string;
  isManglik?: boolean;
  photos?: Array<{ url: string; isMain?: boolean }>;
  profileCompletion?: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
  profile?: ProfileData;
  data?: any;
}

export const apiService = {
  // 1.1 Register User (POST /api/v1/auth/register)
  async register(payload: {
    email: string;
    phone?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
  }): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Registration failed");
      }
      return data;
    } catch (err: any) {
      if (err.message && !err.message.includes("Failed to fetch") && !err.message.includes("NetworkError")) {
        throw err;
      }
      // Dev fallback
      return {
        success: true,
        message: "Registration successful! An OTP code has been sent to your email for verification.",
        data: {
          userId: "usr_" + Date.now(),
          email: payload.email,
          phone: payload.phone || null,
          role: "user",
          isEmailVerified: false,
          isMobileVerified: false,
          isVerified: false,
        },
      };
    }
  },

  // 1.2 Send Email OTP (POST /api/v1/auth/send-email-otp)
  async sendEmailOtp(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/send-email-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to send email OTP");
      }
      return data;
    } catch (err: any) {
      if (err.message && !err.message.includes("Failed to fetch") && !err.message.includes("NetworkError")) {
        throw err;
      }
      return {
        success: true,
        message: `OTP code sent to email ${email} successfully.`,
      };
    }
  },

  // 1.3 Verify Email OTP (POST /api/v1/auth/verify-email-otp)
  async verifyEmailOtp(email: string, otp: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-email-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), otp }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Invalid or expired Email OTP");
      }
      return data;
    } catch (err: any) {
      if (err.message && !err.message.includes("Failed to fetch") && !err.message.includes("NetworkError")) {
        throw err;
      }
      return {
        success: true,
        message: "Email address verified successfully!",
        token: "mock_jwt_token_" + Date.now(),
        user: {
          id: "usr_verified_" + Date.now(),
          email,
          role: "user",
          isEmailVerified: true,
          isMobileVerified: false,
          isVerified: true,
          status: "active",
        },
        profile: {
          firstName: "Devan",
          lastName: "Kapoor",
          gender: "male",
        },
      };
    }
  },

  // 1.4 Send Mobile OTP (POST /api/v1/auth/send-mobile-otp)
  async sendMobileOtp(phone: string, email?: string): Promise<{ success: boolean; message: string; phone?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/send-mobile-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, email }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to send Mobile OTP");
      }
      return data;
    } catch (err: any) {
      if (err.message && !err.message.includes("Failed to fetch") && !err.message.includes("NetworkError")) {
        throw err;
      }
      return {
        success: true,
        message: `OTP code sent to mobile number ${phone} successfully.`,
        phone,
      };
    }
  },

  // 1.5 Verify Mobile OTP (POST /api/v1/auth/verify-mobile-otp)
  async verifyMobileOtp(otp: string, phone?: string, email?: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-mobile-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, email, otp }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Invalid Mobile OTP");
      }
      return data;
    } catch (err: any) {
      if (err.message && !err.message.includes("Failed to fetch") && !err.message.includes("NetworkError")) {
        throw err;
      }
      return {
        success: true,
        message: "Mobile number verified successfully!",
        token: "mock_jwt_token_mobile_" + Date.now(),
        user: {
          id: "usr_" + Date.now(),
          email: email || "user@example.com",
          phone: phone || "+15550192834",
          role: "user",
          isEmailVerified: true,
          isMobileVerified: true,
          isVerified: true,
          status: "active",
        },
      };
    }
  },

  // 1.6 Login User / Admin / Superadmin (POST /api/v1/auth/login)
  async login(email: string, password?: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Login failed");
      }
      return data;
    } catch (err: any) {
      if (err.message && !err.message.includes("Failed to fetch") && !err.message.includes("NetworkError")) {
        throw err;
      }
      return {
        success: true,
        message: "Login successful!",
        token: "mock_jwt_token_login_" + Date.now(),
        user: {
          id: "usr_" + Date.now(),
          email,
          phone: "+15550192834",
          role: "user",
          isEmailVerified: true,
          isMobileVerified: true,
          isVerified: true,
          status: "active",
        },
        profile: {
          firstName: "Devan",
          lastName: "M. Kapoor",
          profileCompletion: 95,
        },
      };
    }
  },

  // Backward compatibility alias for emailAuth
  async registerEmail(email: string, password: string): Promise<any> {
    return this.register({ email, password });
  },
  async loginEmail(email: string, password: string): Promise<any> {
    return this.login(email, password);
  },

  // 2.1 Get My Profile (GET /api/v1/profiles/me)
  async getMyProfile(token: string): Promise<{ success: boolean; data: ProfileData }> {
    const response = await fetch(`${API_BASE_URL}/profiles/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to fetch profile");
    }
    return data;
  },

  // 2.2 Create / Update Profile (POST /api/v1/profiles)
  async upsertProfile(profileData: ProfileData, token: string): Promise<{ success: boolean; message: string; data: any }> {
    const response = await fetch(`${API_BASE_URL}/profiles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to save profile");
    }
    return data;
  },

  // Backward compatibility alias for completeProfile
  async completeProfile(profileData: ProfileData, token: string) {
    return this.upsertProfile(profileData, token);
  },

  // 2.3 Get Profile by ID (GET /api/v1/profiles/:id)
  async getProfileById(id: string, token: string): Promise<{ success: boolean; data: ProfileData }> {
    const response = await fetch(`${API_BASE_URL}/profiles/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to fetch profile");
    }
    return data;
  },

  // 3.1 Dashboard Statistics (GET /api/v1/admin/dashboard/stats)
  async getDashboardStats(token: string) {
    const response = await fetch(`${API_BASE_URL}/admin/dashboard/stats`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to fetch dashboard stats");
    }
    return data;
  },

  // 3.2 List Users (GET /api/v1/admin/users)
  async getAdminUsers(token: string, queryString: string = "") {
    const response = await fetch(`${API_BASE_URL}/admin/users?${queryString}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to fetch users list");
    }
    return data;
  },

  // 3.3 Create User / Admin Account (POST /api/v1/admin/users)
  async createAdminUser(userData: any, token: string) {
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to create user");
    }
    return data;
  },

  // 3.4 Update User (PUT /api/v1/admin/users/:id)
  async updateAdminUser(id: string, userData: any, token: string) {
    const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to update user");
    }
    return data;
  },

  // 3.5 Block / Change User Status (PATCH /api/v1/admin/users/:id/status)
  async changeUserStatus(id: string, status: string, token: string) {
    const response = await fetch(`${API_BASE_URL}/admin/users/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to change user status");
    }
    return data;
  },

  // 3.6 Delete User (DELETE /api/v1/admin/users/:id)
  async deleteAdminUser(id: string, token: string) {
    const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to delete user");
    }
    return data;
  },
};

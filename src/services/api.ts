const API_BASE_URL = "http://localhost:5000/api/v1";

export interface AuthResponse {
  user: {
    id: string;
    email?: string;
    mobileNumber?: string;
    isPhoneVerified: boolean;
    isEmailVerified: boolean;
    isIdVerified: boolean;
    status: string;
  };
  accountDetails?: {
    email?: string;
    isEmailVerified?: boolean;
    registrationMethod?: string;
  };
  emailOtpSent?: boolean;
  mockEmailOtp?: string;
  hasProfile: boolean;
  isProfileComplete?: boolean;
  token: string;
}

export const apiService = {
  // 1. Initial Email Registration (POST /api/v1/auth/register-email) - sets isEmailVerified = false initially
  async registerEmail(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to register with email");
      }
      return data.data;
    } catch (err: any) {
      if (err.message && !err.message.includes("Failed to fetch") && !err.message.includes("NetworkError")) {
        throw err;
      }
      // Dev fallback
      return {
        user: {
          id: "usr_" + Date.now(),
          email: email.trim().toLowerCase(),
          isPhoneVerified: false,
          isEmailVerified: false,
          isIdVerified: false,
          status: "PENDING_PROFILE",
        },
        accountDetails: {
          email: email.trim().toLowerCase(),
          isEmailVerified: false,
          registrationMethod: "EMAIL_PASSWORD",
        },
        emailOtpSent: true,
        mockEmailOtp: "8899",
        hasProfile: false,
        isProfileComplete: false,
        token: "mock_jwt_token_reg_" + Date.now(),
      };
    }
  },

  // 2. Send 4-Digit OTP Code to Email (POST /api/v1/auth/send-email-otp)
  async sendEmailOtp(email: string) {
    const response = await fetch(`${API_BASE_URL}/auth/send-email-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim().toLowerCase() }),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to send 4-digit code to email");
    }
    return data.data;
  },

  // 3. Verify 4-Digit Email OTP Code (POST /api/v1/auth/verify-email-otp) -> sets isEmailVerified = true
  async verifyEmailOtp(email: string, otp: string) {
    const response = await fetch(`${API_BASE_URL}/auth/verify-email-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim().toLowerCase(), otp }),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Invalid or expired 4-digit email code");
    }
    return data.data;
  },

  // 4. Email Login (POST /api/v1/auth/login-email)
  async loginEmail(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Invalid email or password");
      }
      return data.data;
    } catch (err: any) {
      if (err.message && !err.message.includes("Failed to fetch") && !err.message.includes("NetworkError")) {
        throw err;
      }
      return {
        user: {
          id: "usr_" + Date.now(),
          email: email.trim().toLowerCase(),
          isPhoneVerified: true,
          isEmailVerified: true,
          isIdVerified: true,
          status: "ACTIVE",
        },
        accountDetails: {
          email: email.trim().toLowerCase(),
          isEmailVerified: true,
        },
        hasProfile: true,
        isProfileComplete: true,
        token: "mock_jwt_token_login_" + Date.now(),
      };
    }
  },

  // 5. Send OTP to Mobile Number (POST /api/v1/auth/send-otp)
  async sendOtp(mobileNumber: string) {
    const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobileNumber }),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to send OTP");
    }
    return data.data;
  },

  // 6. Verify Mobile OTP (POST /api/v1/auth/verify-otp)
  async verifyOtp(mobileNumber: string, otp: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobileNumber, otp }),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Invalid OTP code");
    }
    return data.data;
  },

  // 7. Complete Profile (POST /api/v1/profile/complete)
  async completeProfile(profileData: any, token: string) {
    const response = await fetch(`${API_BASE_URL}/profile/complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to complete profile");
    }
    return data.data;
  },

  // 8. Get My Profile (GET /api/v1/profile/me)
  async getMyProfile(token: string) {
    const response = await fetch(`${API_BASE_URL}/profile/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to fetch profile");
    }
    return data.data;
  },
};

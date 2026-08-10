import { Platform } from 'react-native';

const API_BASE_URL = __DEV__
  ? (Platform.OS === 'android' ? 'http://10.0.2.2:5000/api/v1' : 'http://localhost:5000/api/v1')
  : 'https://ever-vow-api.onrender.com/api/v1';


// Custom photo upload using FormData (no third-party SDK needed)
export const uploadPhoto = async (fileUri: string, fileName: string, token: string): Promise<string> => {
  const formData = new FormData();
  formData.append('file', {
    uri: fileUri,
    name: fileName || 'photo.jpg',
    type: 'image/jpeg',
  } as any);

  const response = await fetch(`${API_BASE_URL}/upload/photo`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  });

  const data = await response.json();
  if (!response.ok || !data.url) {
    throw new Error(data.message || 'Photo upload failed');
  }
  return data.url;
};


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
    documentType?: string;
    documentNumber?: string;
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
      throw err;
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
      throw err;
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
      throw err;
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
      throw err;
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
    try {
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
    } catch (err: any) {
      if (err.message && !err.message.includes("Failed to fetch") && !err.message.includes("NetworkError")) {
        throw err;
      }
      throw err;
    }
  },

  // 2.2 Create / Update Profile (POST /api/v1/profiles)
  async upsertProfile(profileData: ProfileData | any, token: string): Promise<{ success: boolean; message: string; data: any }> {
    try {
      // Normalize payload to match flat Mongoose Schema attributes
      const payload: ProfileData | any = { ...profileData };
      if (profileData.fullName && (!payload.firstName || !payload.lastName)) {
        const parts = profileData.fullName.trim().split(' ');
        payload.firstName = parts[0];
        payload.lastName = parts.slice(1).join(' ') || parts[0];
      }
      if (profileData.personalDetails) {
        if (profileData.personalDetails.height) payload.height = profileData.personalDetails.height;
        if (profileData.personalDetails.religion) payload.religion = profileData.personalDetails.religion;
        if (profileData.personalDetails.communityCaste) payload.caste = profileData.personalDetails.communityCaste;
        if (profileData.personalDetails.motherTongue) payload.motherTongue = profileData.personalDetails.motherTongue;
      }
      if (profileData.professionalDetails) {
        if (profileData.professionalDetails.currentJob) payload.occupation = profileData.professionalDetails.currentJob;
        if (profileData.professionalDetails.company) payload.company = profileData.professionalDetails.company;
        if (profileData.professionalDetails.education) payload.education = profileData.professionalDetails.education;
      }
      if (profileData.familyDetails) {
        if (profileData.familyDetails.fatherOccupation) payload.fatherProfession = profileData.familyDetails.fatherOccupation;
        if (profileData.familyDetails.motherOccupation) payload.motherProfession = profileData.familyDetails.motherOccupation;
        if (profileData.familyDetails.familyBackground) payload.familyBackground = profileData.familyDetails.familyBackground;
        if (profileData.familyDetails.familyEthos) payload.familyValues = profileData.familyDetails.familyEthos;
        if (profileData.familyDetails.ancestralOrigins) payload.ancestralOrigin = profileData.familyDetails.ancestralOrigins;
      }
      if (profileData.horoscopeDetails) {
        if (profileData.horoscopeDetails.zodiacSign) payload.zodiacSign = profileData.horoscopeDetails.zodiacSign;
        if (profileData.horoscopeDetails.moonSignRashi) payload.moonSign = profileData.horoscopeDetails.moonSignRashi;
        if (profileData.horoscopeDetails.nakshatra) payload.nakshatra = profileData.horoscopeDetails.nakshatra;
        if (profileData.horoscopeDetails.isManglik !== undefined) payload.isManglik = profileData.horoscopeDetails.isManglik;
      }
      if (profileData.bioIntro) payload.personalizedIntro = profileData.bioIntro;

      console.log("Preparing to fetch:", `${API_BASE_URL}/profiles`);
      console.log("Payload:", payload);

      const response = await fetch(`${API_BASE_URL}/profiles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      console.log("Fetch response status:", response.status);
      const data = await response.json();
      console.log("Fetch response data:", data);
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to save profile");
      }
      return data;
    } catch (err: any) {
      if (err.message && !err.message.includes("Failed to fetch") && !err.message.includes("NetworkError")) {
        throw err;
      }
      throw err;
    }
  },

  // Backward compatibility alias for completeProfile
  async completeProfile(profileData: ProfileData | any, token: string) {
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

  // 2.4 Add Photo (POST /api/v1/photos)
  async addPhoto(url: string, isMain: boolean, token: string): Promise<{ success: boolean; data: any }> {
    const response = await fetch(`${API_BASE_URL}/photos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ url, isMain }),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to add photo");
    }
    return data;
  },

  // 2.5 Get User Photos (GET /api/v1/photos)
  async getUserPhotos(token: string): Promise<{ success: boolean; data: any[] }> {
    const response = await fetch(`${API_BASE_URL}/photos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to fetch photos");
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

  // 4.1 Get Master Options (GET /api/v1/master/options/:category)
  async getMasterOptions(category: string, token: string): Promise<{ success: boolean; data: any[] }> {
    const response = await fetch(`${API_BASE_URL}/master/options/${category}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to fetch master options");
    }
    return data;
  },
};

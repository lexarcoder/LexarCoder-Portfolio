import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/auth",
    withCredentials: true,
});


// ==================== Login ====================
export async function userLogin({ loginId, password }) {
    const response = await api.post("/login", {
        loginId,
        password,
    });

    return response.data;
}


// ==================== Register ====================
export async function userRegister({
    username,
    email,
    password,
}) {
    const response = await api.post("/register", {
        username,
        email,
        password,
    });

    return response.data;
}


// ==================== Get Me ====================

export async function userGetme() {
    const response = await api.get("/getme");

    return response.data;
}


// ==================== Logout ====================

export async function userLogout() {
    const response = await api.get("/logout");

    return response.data;
}


// ==================== Email Verify ====================

export async function emailVerify(token) {
    const response = await api.get("/verify-email", {
        params: {
            token,
        },
    });

    return response.data;
}


// ==================== Profile ====================

export async function profileUpdate(formData) {
    const response = await api.post(
        "/profile",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
}


// ==================== Resend Verification Email ====================

export async function resendVerificationEmail() {
    const response = await api.post(
        "/resend-verification-email"
    );

    return response.data;
}


// ==================== Contact Me ====================

export async function contactMe(data) {
    const response = await api.post(
        "/contact",
        data
    );

    return response.data;
}


// ==================== Google OAuth ====================

export function googleLogin() {
    window.location.href = `${ api.defaults.baseURL }/google`;
}


// ==================== GitHub OAuth ====================

export function githubLogin() {
    window.location.href = `${api.defaults.baseURL}/github`;
}


// ==================== Forgot Password ====================

export async function forgotPassword(email) {
    const response = await api.post(
        "/forgot-password",
        {
            email,
        }
    );
    return response.data;
}


// ==================== Verify Reset OTP ====================

export async function verifyResetOTP({ email, otp }) {
    const response = await api.post(
        "/verify-otp",
        {
            email,
            otp,
        }
    );

    return response.data;
}


// ==================== Reset Password ====================

export async function resetPassword({
    email,
    newPassword,
}) {
    const response = await api.post(
        "/reset-password",
        {
            email,
            newPassword,
        }
    );

    return response.data;
}
import { userLogin, userLogout, userRegister, userGetme, emailVerify, profileUpdate, resendVerificationEmail, contactMe, forgotPassword, resetPassword, googleLogin, githubLogin, verifyResetOTP } from "../services/auth.api";
import { useContext, } from "react"
import { AuthContext } from "../store/auth.context"

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading, profile, setProfile } = context


    async function handleRegister({ username, email, password }) {
        setLoading(true);

        try {
            const data = await userRegister({ username, email, password });
            setUser(data.user);
            return data;
        } catch (err) {
            console.log("Register error:", err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleLogin({ loginId, password }) {
        setLoading(true);

        try {
            const data = await userLogin({ loginId, password });

            setUser(data.user);

            return data;

        } catch (err) {

            console.log(err.response?.data);

            setUser(null);

            alert(err.response?.data?.message || "Something went wrong");

        } finally {
            setLoading(false);
        }
    }

    async function handleEmail(token) {
        setLoading(true);

        try {
            const data = await emailVerify(token);
            return data;
        } catch (err) {
            console.log(err.response?.data);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function handleGetme() {
        setLoading(true);

        try {
            const data = await userGetme();
            setUser(data.user);
            setProfile(data.profile);
        } catch (err) {
            setUser(null); // guest mode
            setProfile(null);
        } finally {
            setLoading(false);
        }
    }

    async function handleLogout() {
        setLoading(true);

        try {
            await userLogout();
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    async function handleUpdateProfile(formData) {
        setLoading(true);
        try {
            await profileUpdate(formData);
            await handleGetme(); // Refresh user data after profile update
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setLoading(false);
        }
    }


    async function handleResendVerificationEmail() {
        setLoading(true);

        try {
            const data = await resendVerificationEmail();
            return data;
        } catch (err) {
            console.log(err.response?.data);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function handleContactMe(formData) {
        setLoading(true);

        try {
            return await contactMe(formData);
        } catch (err) {
            console.log(err.response?.data || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    // ==================== Forgot Password ====================

    async function handleForgotPassword(email) {
        setLoading(true);

        try {
            const data = await forgotPassword(email);

            return data;
        } catch (err) {
            console.log(
                "Forgot Password Error:",
                err.response?.data || err.message
            );
            throw err;
        } finally {
            setLoading(false);
        }
    }


    // ==================== Verify Reset OTP ====================

    async function handleVerifyResetOTP({ email, otp }) {
        setLoading(true);

        try {
            const data = await verifyResetOTP({
                email,
                otp,
            });

            return data;
        } catch (err) {
            console.log(
                "Verify OTP Error:",
                err.response?.data || err.message
            );

            throw err;
        } finally {
            setLoading(false);
        }
    }


    // ==================== Reset Password ====================

    async function handleResetPassword({ email, newPassword }) {
        setLoading(true);

        try {
            const data = await resetPassword({
                email,
                newPassword,
            });

            return data;
        } catch (err) {
            console.log(
                "Reset Password Error:",
                err.response?.data || err.message
            );

            throw err;
        } finally {
            setLoading(false);
        }
    }
    
    // ==================== Google OAuth ====================

    function handleGoogleLogin() {
        googleLogin();
    }


    // ==================== GitHub OAuth ====================

    function handleGithubLogin() {
        githubLogin();
    }

    return (
        {
            user, profile, loading,
            handleRegister,
            handleLogin,
            handleGetme,
            handleLogout,
            handleEmail,
            handleUpdateProfile,
            handleResendVerificationEmail,
            handleContactMe,
            handleForgotPassword,
            handleVerifyResetOTP,
            handleResetPassword,
            handleGoogleLogin,
            handleGithubLogin,
        }
    )

}


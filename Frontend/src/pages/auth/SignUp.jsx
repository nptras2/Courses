import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

const SignUp = () => {
  const navigate = useNavigate();
  const { signup, googleSignup, getRoleHomePath } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client' // default role
  });

  const roles = [
    { value: 'admin', label: 'Admin', description: 'Full system access' },
    { value: 'client', label: 'Student', description: 'Education' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signup(formData.name, formData.email, formData.password, formData.role);
      if (result.success) {
        navigate(getRoleHomePath(result.user.role));
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.log('Signup error:', error);
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="min-h-screen grid lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-white via-blue-50 to-slate-100"
        >
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-11 h-11 rounded-full bg-[#135bec] flex items-center justify-center shadow-lg">
              <Check className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black text-gray-900">CreatorPlatform</span>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#135bec]">Start here</p>
            <h1 className="text-4xl font-black text-gray-900 mt-3">Launch your first course today.</h1>
            <p className="text-[#616f89] mt-4 max-w-md">
              Build, sell, and scale your digital knowledge business with a single platform.
            </p>
            <div className="mt-8 bg-white/70 border border-white rounded-2xl p-6 shadow-sm">
              <p className="text-sm text-[#616f89]">"We launched in a weekend and closed our first 100 students."</p>
              <p className="text-sm font-semibold text-gray-900 mt-3">Marcus Lee � Course Creator</p>
            </div>
          </div>
          <div className="text-xs text-[#616f89]">(c) 2026 CreatorPlatform</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center px-6 py-12"
        >
          <div className="w-full max-w-md">
            <div
              className="flex items-center justify-center gap-3 mb-8 cursor-pointer lg:hidden"
              onClick={() => navigate('/')}
            >
              <div className="w-10 h-10 rounded-full bg-[#135bec] flex items-center justify-center shadow-lg">
                <Check className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black text-gray-900">CreatorPlatform</span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-black text-gray-900 mb-2">Create your account</h1>
                <p className="text-[#616f89]">Start building your course business.</p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#135bec]/40 focus:border-transparent transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#135bec]/40 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-11 pr-12 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#135bec]/40 focus:border-transparent transition-all"
                      placeholder="Create a password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Select Your Role</label>
                  <div className="grid grid-cols-2 gap-3">
                    {roles.map((role) => (
                      <motion.button
                        key={role.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, role: role.value })}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          formData.role === role.value
                            ? 'border-[#135bec] bg-[#135bec]/10'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900">{role.label}</span>
                          {formData.role === role.value && <Check className="w-5 h-5 text-[#135bec]" />}
                        </div>
                        <p className="text-xs text-gray-500">{role.description}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#135bec] hover:bg-[#0f4ec9] text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Create Account
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-[#616f89]">Or continue with</span>
                </div>
              </div>

              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  console.log('GOOGLE ID TOKEN:', credentialResponse.credential);
                  setLoading(true);
                  setError('');

                  try {
                    const result = await googleSignup(
                      credentialResponse.credential,
                      formData.role
                    );

                    if (result.success) {
                      navigate(getRoleHomePath(result.user.role));
                    } else {
                      setError(result.message);
                    }
                  } catch (error) {
                    console.error('Google auth error:', error);
                    setError('Google authentication failed. Please try again.');
                  } finally {
                    setLoading(false);
                  }
                }}
                onError={() => {
                  setError('Google authentication failed. Please try again.');
                }}
                theme="outline"
                size="large"
                width="100%"
              />

              <p className="text-center text-sm text-[#616f89] mt-6">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/signin')}
                  className="text-[#135bec] hover:text-[#0f4ec9] font-semibold transition-colors"
                >
                  Sign In
                </button>
              </p>
            </div>

            <p className="text-center text-xs text-[#616f89] mt-6">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;

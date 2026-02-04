import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import { useAuth } from '@/context/AuthContext';

export default function ClientSettings() {
  const { checkAuthStatus, updateUser } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    location: { city: '', state: '', country: 'India' },
    profilePicture: ''
  });
  const [userMeta, setUserMeta] = useState({ authProvider: '', hasPassword: true });
  const [profileStatus, setProfileStatus] = useState(null);
  const [changePasswordStatus, setChangePasswordStatus] = useState(null);
  const [googlePasswordStatus, setGooglePasswordStatus] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [settingPassword, setSettingPassword] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [googlePasswordForm, setGooglePasswordForm] = useState({
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/api/protected/me');
        if (isMounted) {
          const user = response?.data?.user || {};
          setProfile({
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            bio: user.bio || '',
            location: {
              city: user.location?.city || '',
              state: user.location?.state || '',
              country: user.location?.country || 'India'
            },
            profilePicture: user.profilePicture || ''
          });
          setUserMeta({
            authProvider: user.authProvider || 'local',
            hasPassword: Boolean(user.hasPassword)
          });
          setProfileStatus(null);
        }
      } catch (error) {
        if (isMounted) {
          setProfileStatus({
            type: 'error',
            text:
              error?.response?.data?.message ||
              'Unable to load profile information.'
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith('location.')) {
      const key = name.split('.')[1];
      setProfile((prev) => ({
        ...prev,
        location: { ...prev.location, [key]: value }
      }));
      return;
    }

    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setSavingProfile(true);
    setProfileStatus(null);

    try {
      const response = await api.put('/api/users/me', profile);
      if (response?.data?.user) {
        const user = response.data.user;
        setProfile({
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          bio: user.bio || '',
          location: {
            city: user.location?.city || '',
            state: user.location?.state || '',
            country: user.location?.country || 'India'
          },
          profilePicture: user.profilePicture || ''
        });
        updateUser({ profilePicture: user.profilePicture });
        await checkAuthStatus();
      }
      setProfileStatus({
        type: 'success',
        text: response?.data?.message || 'Profile updated successfully.'
      });
    } catch (error) {
      setProfileStatus({
        type: 'error',
        text:
          error?.response?.data?.message ||
          'Unable to update profile. Please try again.'
      });
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePasswordSubmit = async (event) => {
    event.preventDefault();
    setChangingPassword(true);
    setChangePasswordStatus(null);

    try {
      const response = await api.post('/api/auth/change-password', passwordForm);
      setChangePasswordStatus({
        type: 'success',
        text: response?.data?.message || 'Password updated successfully.'
      });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setChangePasswordStatus({
        type: 'error',
        text:
          error?.response?.data?.message ||
          'Unable to update password. Please try again.'
      });
    } finally {
      setChangingPassword(false);
    }
  };

  const handleSetPasswordChange = (event) => {
    const { name, value } = event.target;
    setGooglePasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSetPasswordSubmit = async (event) => {
    event.preventDefault();
    setSettingPassword(true);
    setGooglePasswordStatus(null);

    try {
      const response = await api.post('/api/auth/set-password', googlePasswordForm);
      setGooglePasswordStatus({
        type: 'success',
        text: response?.data?.message || 'Password set successfully.'
      });
      setUserMeta((prev) => ({ ...prev, hasPassword: true }));
      setGooglePasswordForm({ password: '', confirmPassword: '' });
    } catch (error) {
      setGooglePasswordStatus({
        type: 'error',
        text:
          error?.response?.data?.message ||
          'Unable to set password. Please try again.'
      });
    } finally {
      setSettingPassword(false);
    }
  };

  const handleProfileImageUpload = async (file) => {
    if (!file) return;
    setUploadingImage(true);
    setProfileStatus(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await api.post('/api/users/me/profile-picture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const url = response?.data?.url;
      if (url) {
        setProfile((prev) => ({ ...prev, profilePicture: url }));
        updateUser({ profilePicture: url });
        await checkAuthStatus();
        setProfileStatus({ type: 'success', text: 'Profile picture updated.' });
      }
    } catch (error) {
      setProfileStatus({
        type: 'error',
        text:
          error?.response?.data?.message ||
          'Unable to upload profile picture.'
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your account?');
    if (!confirmed) return;
    setDeleting(true);
    setDeleteStatus(null);

    try {
      const response = await api.delete('/api/users/me');
      setDeleteStatus({
        type: 'success',
        text: response?.data?.message || 'Account deleted.'
      });
    } catch (error) {
      setDeleteStatus({
        type: 'error',
        text:
          error?.response?.data?.message ||
          'Unable to delete account. Please try again.'
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-4">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-black text-gray-900">Account settings</h2>
            <p className="text-sm text-gray-500 mt-2">Update your profile, security, and preferences.</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-gray-900">Profile</h3>
            {isLoading && (
              <p className="text-sm text-gray-500 mt-3">Loading profile...</p>
            )}
            {!isLoading && (
              <form onSubmit={handleProfileSubmit} className="mt-4 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3"
                    placeholder="Full name"
                    required
                  />
                  <input
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3"
                    placeholder="Phone"
                  />
                  <div className="space-y-2">
                    <input
                      name="profilePicture"
                      value={profile.profilePicture}
                      onChange={handleProfileChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3"
                      placeholder="Profile picture URL"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleProfileImageUpload(event.target.files?.[0])}
                      className="w-full text-sm"
                    />
                    {uploadingImage && (
                      <p className="text-xs text-gray-500">Uploading image...</p>
                    )}
                  </div>
                </div>
                <input
                  name="bio"
                  value={profile.bio}
                  onChange={handleProfileChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3"
                  placeholder="Bio"
                />
                <div className="grid sm:grid-cols-3 gap-4">
                  <input
                    name="location.city"
                    value={profile.location.city}
                    onChange={handleProfileChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3"
                    placeholder="City"
                  />
                  <input
                    name="location.state"
                    value={profile.location.state}
                    onChange={handleProfileChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3"
                    placeholder="State"
                  />
                  <input
                    name="location.country"
                    value={profile.location.country}
                    onChange={handleProfileChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3"
                    placeholder="Country"
                  />
                </div>
                {profileStatus && (
                  <p className={`text-sm ${profileStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {profileStatus.text}
                  </p>
                )}
                <button
                  type="submit"
                  className="bg-[#135bec] text-white font-semibold px-4 py-2 rounded-xl disabled:opacity-60"
                  disabled={savingProfile}
                >
                  {savingProfile ? 'Saving...' : 'Save profile'}
                </button>
              </form>
            )}
          </div>

          {!userMeta.hasPassword && userMeta.authProvider === 'google' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-semibold text-gray-900">Set Password</h3>
              <p className="text-sm text-gray-500 mt-1">
                You signed up with Google. Set a password to enable email login.
              </p>
              <form onSubmit={handleSetPasswordSubmit} className="mt-4 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    name="password"
                    type="password"
                    value={googlePasswordForm.password}
                    onChange={handleSetPasswordChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3"
                    placeholder="New password"
                    required
                  />
                  <input
                    name="confirmPassword"
                    type="password"
                    value={googlePasswordForm.confirmPassword}
                    onChange={handleSetPasswordChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3"
                    placeholder="Confirm password"
                    required
                  />
                </div>
                {googlePasswordStatus && (
                  <p className={`text-sm ${googlePasswordStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {googlePasswordStatus.text}
                  </p>
                )}
                <button
                  type="submit"
                  className="bg-[#135bec] text-white font-semibold px-4 py-2 rounded-xl disabled:opacity-60"
                  disabled={settingPassword}
                >
                  {settingPassword ? 'Setting...' : 'Set password'}
                </button>
              </form>
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-gray-900">Change Password</h3>
            <p className="text-sm text-gray-500 mt-1">Update your password to keep your account secure.</p>
            <form onSubmit={handleChangePasswordSubmit} className="mt-4 space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <input
                  name="currentPassword"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3"
                  placeholder="Current password"
                  required
                />
                <input
                  name="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3"
                  placeholder="New password"
                  required
                />
                <input
                  name="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3"
                  placeholder="Confirm password"
                  required
                />
              </div>
              {changePasswordStatus && (
                <p className={`text-sm ${changePasswordStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {changePasswordStatus.text}
                </p>
              )}
              <button
                type="submit"
                className="bg-[#135bec] text-white font-semibold px-4 py-2 rounded-xl disabled:opacity-60"
                disabled={changingPassword}
              >
                {changingPassword ? 'Updating...' : 'Update password'}
              </button>
            </form>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-gray-900">Privacy</h3>
            <p className="text-sm text-gray-500 mt-2">Control your account data.</p>
            {deleteStatus && (
              <p className={`text-sm mt-3 ${deleteStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {deleteStatus.text}
              </p>
            )}
            <div className="mt-4 grid gap-3">
              <button
                className="border border-red-200 text-red-600 font-semibold px-4 py-2 rounded-xl w-fit disabled:opacity-60"
                onClick={handleDeleteAccount}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete account'}
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-gray-900">Support</h3>
            <p className="text-sm text-gray-500 mt-2">Need help? We are here.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a className="border border-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-xl" href="/help-center">
                Help Center
              </a>
              <a className="border border-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-xl" href="/contact">
                Contact
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

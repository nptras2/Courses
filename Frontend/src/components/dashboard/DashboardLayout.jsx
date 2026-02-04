import React from 'react';

const DashboardLayout = ({ title, subtitle, action, fullWidth = false, hideHeaderOnDesktop = false, children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className={`${fullWidth ? 'w-full' : 'max-w-7xl'} mx-auto ${fullWidth ? 'px-4 sm:px-6 lg:px-8 pt-0 pb-4 lg:pb-6' : 'px-4 sm:px-6 lg:px-8 py-8'}`}>
        {title && (
          <div className={`mb-8 flex items-center justify-between gap-4 ${hideHeaderOnDesktop ? 'lg:hidden' : ''}`}>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              {subtitle && <p className="text-gray-600 mt-2 hidden sm:block">{subtitle}</p>}
            </div>
            {action}
          </div>
        )}
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

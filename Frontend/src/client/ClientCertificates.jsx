import React from 'react';
import { Award, BadgeCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function ClientCertificates() {
  const { user } = useAuth();

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#135bec]/10 text-[#135bec] flex items-center justify-center">
          <Award className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Certificates</h2>
          <p className="text-sm text-gray-500">Unlock after completion</p>
        </div>
      </div>
      {Array.isArray(user?.certificates) && user.certificates.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {user.certificates.map((cert) => (
            <div key={cert.id || cert.title} className="border border-gray-100 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <BadgeCheck className="w-4 h-4 text-[#135bec] mt-1" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{cert.title || 'Course Certificate'}</p>
                  {cert.issuedAt && (
                    <p className="text-xs text-gray-500 mt-1">
                      Issued: {new Date(cert.issuedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-gray-200 rounded-xl p-6 text-center">
          <p className="text-sm font-semibold text-gray-700">No certificates yet</p>
          <p className="text-xs text-gray-500 mt-2">
            Complete a course to receive your certificate here.
          </p>
        </div>
      )}
      </div>
    </div>
  );
}

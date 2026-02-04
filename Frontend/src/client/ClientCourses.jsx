import React, { useEffect, useState } from 'react';
import api from '@/services/api';

export default function ClientCourses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [payingId, setPayingId] = useState(null);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleBuyNow = async (courseId) => {
    setPayingId(courseId);
    setError(null);

    try {
      const response = await api.post(`/api/orders/buy/${courseId}`);
      const data = response?.data;

      if (data?.order && data?.order?.paymentStatus === 'paid') {
        setPayingId(null);
        return;
      }

      const razorpayData = data?.razorpay;
      const order = data?.order;

      if (!razorpayData || !order) {
        throw new Error('Payment initiation failed.');
      }

      const loaded = await loadRazorpay();
      if (!loaded) {
        throw new Error('Razorpay SDK failed to load.');
      }

      const options = {
        key: razorpayData.keyId,
        amount: razorpayData.amount,
        currency: razorpayData.currency,
        name: 'Course Purchase',
        description: 'Complete payment to access the course',
        order_id: razorpayData.orderId,
        handler: async (paymentResult) => {
          try {
            await api.post('/api/orders/confirm-payment', {
              orderId: order._id,
              razorpayOrderId: paymentResult.razorpay_order_id,
              razorpayPaymentId: paymentResult.razorpay_payment_id,
              razorpaySignature: paymentResult.razorpay_signature
            });
          } catch (confirmError) {
            setError(
              confirmError?.response?.data?.message ||
                'Payment confirmation failed.'
            );
          } finally {
            setPayingId(null);
          }
        },
        prefill: {
          name: data?.user?.name,
          email: data?.user?.email
        },
        theme: {
          color: '#135bec'
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || 'Payment failed.'
      );
      setPayingId(null);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/api/courses/get/courses');
        if (isMounted) {
          setCourses(response?.data?.courses || []);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err?.response?.data?.message ||
              'Unable to load courses. Please try again.'
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 pt-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Buy Courses</h2>
            <p className="text-sm text-gray-500">Explore all available courses</p>
          </div>
        </div>
        {isLoading && (
          <p className="text-sm text-gray-500">Loading courses...</p>
        )}
        {!isLoading && error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        {!isLoading && !error && courses.length === 0 && (
          <p className="text-sm text-gray-500">No courses available yet.</p>
        )}
        {!isLoading && !error && courses.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course._id}
                className="group rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                <div className="relative aspect-[16/9] bg-slate-100">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                      No image
                    </div>
                  )}
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#135bec]">
                    {course.level || 'Beginner'}
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">
                      {course.category || 'Course'}
                    </p>
                    <h3 className="text-base font-semibold text-gray-900 mt-1">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {course.shortDescription || 'Course overview'}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">
                      {course.isFree || course.price === 0
                        ? 'Free'
                        : `₹${course.discountPrice || course.price}`}
                    </span>
                    <button
                      className="rounded-full border border-[#135bec] px-4 py-1.5 text-xs font-semibold text-[#135bec] hover:bg-[#135bec] hover:text-white transition disabled:opacity-60"
                      onClick={() => handleBuyNow(course._id)}
                      disabled={payingId === course._id}
                    >
                      {payingId === course._id ? 'Processing...' : 'Buy now'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

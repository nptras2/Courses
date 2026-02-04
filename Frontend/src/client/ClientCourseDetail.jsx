import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/services/api";

const ClientCourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/api/users/my-courses/${courseId}`);
        if (isMounted) {
          setCourse(response?.data?.course || null);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err?.response?.data?.message ||
              "Unable to load course details."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (courseId) {
      fetchCourse();
    }

    return () => {
      isMounted = false;
    };
  }, [courseId]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-4 space-y-6">
      {isLoading && (
        <p className="text-sm text-gray-500">Loading course content...</p>
      )}
      {!isLoading && error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {!isLoading && !error && course && (
        <>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-4">
                <div className="h-28 w-44 rounded-xl overflow-hidden bg-gray-100">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-xs text-gray-400">
                      No image
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                      Enrolled
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                      {course.level || "Beginner"}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold">{course.title}</h2>
                  <p className="text-sm text-gray-500 mt-2">
                    {course.shortDescription}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>
                  Category:{" "}
                  <span className="font-medium">
                    {course.category || "General"}
                  </span>
                </p>
                <p className="mt-1">
                  Instructor:{" "}
                  <span className="font-medium">
                    {course.createdBy?.name || "Instructor"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Course Overview</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {course.fullDescription || course.shortDescription}
            </p>
          </div>

          {course.promoVideo && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Promo Video</h3>
              <PromoVideoPlayer url={course.promoVideo} />
              <a
                href={course.promoVideo}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-600 block mt-2 break-all"
              >
                Open in new tab
              </a>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Main Videos</h3>
            {Array.isArray(course.mainVideos) && course.mainVideos.length > 0 ? (
              <div className="space-y-3">
                {course.mainVideos.map((video, index) => (
                  <div
                    key={`main-video-${index}`}
                    className="border border-gray-100 rounded-xl p-4"
                  >
                    <p className="text-sm font-medium mb-2">
                      Video {index + 1}
                    </p>
                    <PromoVideoPlayer url={video} />
                    <a
                      href={video}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-blue-600 block mt-2 break-all"
                    >
                      Open in new tab
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No videos added yet.</p>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Curriculum</h3>
            {Array.isArray(course.curriculum) && course.curriculum.length > 0 ? (
              <div className="space-y-4">
                {course.curriculum.map((section, idx) => (
                  <div key={`section-${idx}`} className="border rounded-xl p-4">
                    <p className="font-semibold">{section.sectionTitle}</p>
                    <div className="mt-3 space-y-2">
                      {(section.lectures || []).map((lecture, ldx) => (
                        <div
                          key={`lecture-${idx}-${ldx}`}
                          className="text-sm text-gray-600 flex items-center justify-between"
                        >
                          <span>{lecture.title}</span>
                          {lecture.videoUrl && (
                            <a
                              href={lecture.videoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-blue-600"
                            >
                              Open video
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Curriculum will be added soon.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ClientCourseDetail;

const PromoVideoPlayer = ({ url }) => {
  const embedUrl = toYouTubeEmbed(url);

  if (embedUrl) {
    return (
      <div className="aspect-video w-full rounded-xl overflow-hidden bg-black/5">
        <iframe
          src={embedUrl}
          title="Promo video"
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="aspect-video w-full rounded-xl overflow-hidden bg-black/5">
      <video src={url} controls className="h-full w-full" />
    </div>
  );
};

const toYouTubeEmbed = (url) => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com")) {
      const videoId = parsed.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
    if (parsed.hostname === "youtu.be") {
      const videoId = parsed.pathname.replace("/", "");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
    return null;
  } catch (error) {
    return null;
  }
};

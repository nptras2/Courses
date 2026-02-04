import React, { useMemo, useState } from "react";
import api from "@/services/api";

const AdminAddCourse = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    category: "",
    level: "Beginner",
    language: "Hindi",
    tags: "",
    thumbnail: "",
    promoVideo: "",
    mainVideos: [""],
    price: 0,
    discountPrice: "",
    isFree: false,
    accessType: "lifetime",
    certificateAvailable: false,
    status: "draft"
  });
  const [curriculum, setCurriculum] = useState([]);
  const [uploadStatus, setUploadStatus] = useState({
    thumbnail: { loading: false, error: null },
    promoVideo: { loading: false, error: null }
  });

  const isPaidDisabled = form.isFree;

  const tagList = useMemo(() => {
    return form.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }, [form.tags]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handlePublishToggle = (event) => {
    const { checked } = event.target;
    setForm((prev) => ({
      ...prev,
      status: checked ? "published" : "draft"
    }));
  };

  const handleMediaUpload = async (field, file) => {
    if (!file) return;

    setUploadStatus((prev) => ({
      ...prev,
      [field]: { loading: true, error: null }
    }));

    const formData = new FormData();
    formData.append(field, file);

    try {
      const response = await api.post("/api/courses/upload-media", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      const uploadedUrl = response?.data?.uploads?.[field];
      if (!uploadedUrl) {
        throw new Error("Upload failed. No URL returned.");
      }

      setForm((prev) => ({ ...prev, [field]: uploadedUrl }));
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Upload failed. Please try again.";
      setUploadStatus((prev) => ({
        ...prev,
        [field]: { loading: false, error: message }
      }));
      return;
    }

    setUploadStatus((prev) => ({
      ...prev,
      [field]: { loading: false, error: null }
    }));
  };

  const addSection = () => {
    setCurriculum((prev) => [
      ...prev,
      { sectionTitle: "", lectures: [] }
    ]);
  };

  const addMainVideo = () => {
    setForm((prev) => ({
      ...prev,
      mainVideos: [...prev.mainVideos, ""]
    }));
  };

  const updateMainVideo = (index, value) => {
    setForm((prev) => ({
      ...prev,
      mainVideos: prev.mainVideos.map((video, idx) =>
        idx === index ? value : video
      )
    }));
  };

  const removeMainVideo = (index) => {
    setForm((prev) => {
      if (prev.mainVideos.length <= 1) return prev;
      return {
        ...prev,
        mainVideos: prev.mainVideos.filter((_, idx) => idx !== index)
      };
    });
  };

  const removeSection = (index) => {
    setCurriculum((prev) => prev.filter((_, idx) => idx !== index));
  };

  const updateSectionTitle = (index, value) => {
    setCurriculum((prev) =>
      prev.map((section, idx) =>
        idx === index ? { ...section, sectionTitle: value } : section
      )
    );
  };

  const addLecture = (sectionIndex) => {
    setCurriculum((prev) =>
      prev.map((section, idx) =>
        idx === sectionIndex
          ? {
              ...section,
              lectures: [
                ...section.lectures,
                {
                  title: "",
                  videoUrl: "",
                  duration: "",
                  isFreePreview: false
                }
              ]
            }
          : section
      )
    );
  };

  const removeLecture = (sectionIndex, lectureIndex) => {
    setCurriculum((prev) =>
      prev.map((section, idx) =>
        idx === sectionIndex
          ? {
              ...section,
              lectures: section.lectures.filter(
                (_, ldx) => ldx !== lectureIndex
              )
            }
          : section
      )
    );
  };

  const updateLecture = (sectionIndex, lectureIndex, field, value) => {
    setCurriculum((prev) =>
      prev.map((section, idx) =>
        idx === sectionIndex
          ? {
              ...section,
              lectures: section.lectures.map((lecture, ldx) =>
                ldx === lectureIndex
                  ? {
                      ...lecture,
                      [field]: value
                    }
                  : lecture
              )
            }
          : section
      )
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    const payload = {
      ...form,
      price: form.isFree ? 0 : Number(form.price) || 0,
      discountPrice:
        form.discountPrice === "" ? undefined : Number(form.discountPrice),
      tags: tagList,
      curriculum,
      mainVideos: form.mainVideos.filter((video) => video.trim() !== "")
    };

    try {
      await api.post("/api/courses/create-course", payload);
      setStatusMessage({ type: "success", text: "Course created successfully." });
      setForm({
        title: "",
        shortDescription: "",
        fullDescription: "",
        category: "",
        level: "Beginner",
        language: "Hindi",
        tags: "",
        thumbnail: "",
        promoVideo: "",
        mainVideos: [""],
        price: 0,
        discountPrice: "",
        isFree: false,
        accessType: "lifetime",
        certificateAvailable: false,
        status: "draft"
      });
      setCurriculum([]);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Unable to create course. Please try again.";
      setStatusMessage({ type: "error", text: message });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Add Course</h2>
      <p className="text-sm text-gray-500 mb-6">
        Fill the details below to create a new course.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-5 rounded-lg border space-y-4">
          <h3 className="text-lg font-semibold">Basic Info</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Level</label>
              <select
                name="level"
                value={form.level}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Language</label>
              <input
                name="language"
                value={form.language}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Short Description
            </label>
            <textarea
              name="shortDescription"
              value={form.shortDescription}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              rows="2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Description
            </label>
            <textarea
              name="fullDescription"
              value={form.fullDescription}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              rows="4"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Tags (comma separated)
            </label>
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {tagList.length > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                Tags: {tagList.join(", ")}
              </p>
            )}
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border space-y-4">
          <h3 className="text-lg font-semibold">Media</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Thumbnail</label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) =>
                  handleMediaUpload("thumbnail", event.target.files?.[0])
                }
                className="w-full text-sm"
              />
              <input
                name="thumbnail"
                value={form.thumbnail}
                onChange={handleChange}
                placeholder="Thumbnail URL"
                className="w-full border rounded px-3 py-2"
                required
              />
              {uploadStatus.thumbnail.loading && (
                <p className="text-xs text-gray-500">Uploading thumbnail...</p>
              )}
              {uploadStatus.thumbnail.error && (
                <p className="text-xs text-red-600">
                  {uploadStatus.thumbnail.error}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Promo Video</label>
              <input
                type="file"
                accept="video/*"
                onChange={(event) =>
                  handleMediaUpload("promoVideo", event.target.files?.[0])
                }
                className="w-full text-sm"
              />
              <input
                name="promoVideo"
                value={form.promoVideo}
                onChange={handleChange}
                placeholder="Promo video URL"
                className="w-full border rounded px-3 py-2"
              />
              {uploadStatus.promoVideo.loading && (
                <p className="text-xs text-gray-500">Uploading promo video...</p>
              )}
              {uploadStatus.promoVideo.error && (
                <p className="text-xs text-red-600">
                  {uploadStatus.promoVideo.error}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium">
                  Main Course Videos (minimum 1)
                </label>
                <p className="text-xs text-gray-500">
                  Add the primary course videos. At least one is required.
                </p>
              </div>
              <button
                type="button"
                onClick={addMainVideo}
                className="px-3 py-1.5 text-sm border rounded"
              >
                Add Video
              </button>
            </div>

            {form.mainVideos.map((video, index) => (
              <div key={`main-video-${index}`} className="flex items-center gap-2">
                <input
                  value={video}
                  onChange={(event) => updateMainVideo(index, event.target.value)}
                  placeholder="Main video URL"
                  className="flex-1 border rounded px-3 py-2"
                  required={index === 0}
                />
                <button
                  type="button"
                  onClick={() => removeMainVideo(index)}
                  className="text-sm text-red-600"
                  disabled={form.mainVideos.length <= 1}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border space-y-4">
          <h3 className="text-lg font-semibold">Pricing & Access</h3>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.status === "published"}
              onChange={handlePublishToggle}
              className="h-4 w-4"
            />
            <span className="text-sm">Publish course</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFree"
              checked={form.isFree}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="text-sm">Mark as free course</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                disabled={isPaidDisabled}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Discount Price
              </label>
              <input
                name="discountPrice"
                type="number"
                value={form.discountPrice}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                disabled={isPaidDisabled}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Access Type
              </label>
              <select
                name="accessType"
                value={form.accessType}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="lifetime">Lifetime</option>
                <option value="limited">Limited</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="certificateAvailable"
              checked={form.certificateAvailable}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="text-sm">Certificate available</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Curriculum</h3>
            <button
              type="button"
              onClick={addSection}
              className="px-3 py-1.5 text-sm border rounded"
            >
              Add Section
            </button>
          </div>

          {curriculum.length === 0 && (
            <p className="text-sm text-gray-500">
              Add sections and lectures for the course curriculum.
            </p>
          )}

          <div className="space-y-4">
            {curriculum.map((section, sectionIndex) => (
              <div
                key={`section-${sectionIndex}`}
                className="border rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <input
                    value={section.sectionTitle}
                    onChange={(event) =>
                      updateSectionTitle(sectionIndex, event.target.value)
                    }
                    placeholder="Section title"
                    className="flex-1 border rounded px-3 py-2"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeSection(sectionIndex)}
                    className="text-sm text-red-600"
                  >
                    Remove
                  </button>
                </div>

                <div className="space-y-3">
                  {section.lectures.map((lecture, lectureIndex) => (
                    <div
                      key={`lecture-${sectionIndex}-${lectureIndex}`}
                      className="grid gap-3 md:grid-cols-4 items-center"
                    >
                      <input
                        value={lecture.title}
                        onChange={(event) =>
                          updateLecture(
                            sectionIndex,
                            lectureIndex,
                            "title",
                            event.target.value
                          )
                        }
                        placeholder="Lecture title"
                        className="border rounded px-3 py-2"
                        required
                      />
                      <input
                        value={lecture.videoUrl}
                        onChange={(event) =>
                          updateLecture(
                            sectionIndex,
                            lectureIndex,
                            "videoUrl",
                            event.target.value
                          )
                        }
                        placeholder="Video URL"
                        className="border rounded px-3 py-2"
                        required
                      />
                      <input
                        value={lecture.duration}
                        onChange={(event) =>
                          updateLecture(
                            sectionIndex,
                            lectureIndex,
                            "duration",
                            event.target.value
                          )
                        }
                        placeholder="Duration (e.g. 10:45)"
                        className="border rounded px-3 py-2"
                      />
                      <div className="flex items-center justify-between gap-2">
                        <label className="flex items-center gap-2 text-xs">
                          <input
                            type="checkbox"
                            checked={lecture.isFreePreview}
                            onChange={(event) =>
                              updateLecture(
                                sectionIndex,
                                lectureIndex,
                                "isFreePreview",
                                event.target.checked
                              )
                            }
                            className="h-4 w-4"
                          />
                          Free preview
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            removeLecture(sectionIndex, lectureIndex)
                          }
                          className="text-xs text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => addLecture(sectionIndex)}
                  className="text-sm border rounded px-3 py-1.5"
                >
                  Add Lecture
                </button>
              </div>
            ))}
          </div>
        </div>

        {statusMessage && (
          <div
            className={`text-sm px-4 py-3 rounded border ${
              statusMessage.type === "success"
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        <div className="flex items-center justify-end gap-3">
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-60"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Create Course"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddCourse;

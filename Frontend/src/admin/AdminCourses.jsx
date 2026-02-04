import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";

const AdminCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [editCourseId, setEditCourseId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [editStatus, setEditStatus] = useState(null);
  const [editForm, setEditForm] = useState({
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

  const editTags = useMemo(() => {
    return editForm.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }, [editForm.tags]);

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/api/courses/admin/all");
        if (isMounted) {
          setCourses(response?.data?.courses || []);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err?.response?.data?.message ||
              "Unable to load courses. Please try again."
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

  const startEdit = (course) => {
    setEditCourseId(course._id);
    setEditStatus(null);
    setEditForm({
      title: course.title || "",
      shortDescription: course.shortDescription || "",
      fullDescription: course.fullDescription || "",
      category: course.category || "",
      level: course.level || "Beginner",
      language: course.language || "Hindi",
      tags: (course.tags || []).join(", "),
      thumbnail: course.thumbnail || "",
      promoVideo: course.promoVideo || "",
      mainVideos:
        course.mainVideos && course.mainVideos.length > 0
          ? course.mainVideos
          : [""],
      price: course.price || 0,
      discountPrice:
        course.discountPrice === undefined || course.discountPrice === null
          ? ""
          : course.discountPrice,
      isFree: Boolean(course.isFree),
      accessType: course.accessType || "lifetime",
      certificateAvailable: Boolean(course.certificateAvailable),
      status: course.status || "draft"
    });
  };

  const handleEditChange = (event) => {
    const { name, value, type, checked } = event.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleEditPublishToggle = (event) => {
    const { checked } = event.target;
    setEditForm((prev) => ({
      ...prev,
      status: checked ? "published" : "draft"
    }));
  };

  const addEditMainVideo = () => {
    setEditForm((prev) => ({
      ...prev,
      mainVideos: [...prev.mainVideos, ""]
    }));
  };

  const updateEditMainVideo = (index, value) => {
    setEditForm((prev) => ({
      ...prev,
      mainVideos: prev.mainVideos.map((video, idx) =>
        idx === index ? value : video
      )
    }));
  };

  const removeEditMainVideo = (index) => {
    setEditForm((prev) => {
      if (prev.mainVideos.length <= 1) return prev;
      return {
        ...prev,
        mainVideos: prev.mainVideos.filter((_, idx) => idx !== index)
      };
    });
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    if (!editCourseId) return;
    setIsSaving(true);
    setEditStatus(null);

    const payload = {
      ...editForm,
      price: editForm.isFree ? 0 : Number(editForm.price) || 0,
      discountPrice:
        editForm.discountPrice === "" ? undefined : Number(editForm.discountPrice),
      tags: editTags,
      mainVideos: editForm.mainVideos.filter((video) => video.trim() !== "")
    };

    try {
      const response = await api.put(`/api/courses/${editCourseId}/edit`, payload);
      const updatedCourse = response?.data?.course;
      if (updatedCourse) {
        setCourses((prev) =>
          prev.map((course) =>
            course._id === editCourseId ? updatedCourse : course
          )
        );
      }
      setEditStatus({ type: "success", text: "Course updated successfully." });
      setEditCourseId(null);
    } catch (err) {
      setEditStatus({
        type: "error",
        text:
          err?.response?.data?.message ||
          "Unable to update course. Please try again."
      });
    } finally {
      setIsSaving(false);
    }
  };

  const cancelEdit = () => {
    setEditCourseId(null);
    setEditStatus(null);
  };

  const handleDelete = async (courseId) => {
    const confirmed = window.confirm("Do you want to delete this course?");
    if (!confirmed) return;
    setDeleteId(courseId);

    try {
      await api.delete(`/api/courses/${courseId}/delete`);
      setCourses((prev) => prev.filter((course) => course._id !== courseId));
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to delete course. Please try again."
      );
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">All Courses</h2>
      <p className="text-sm text-gray-500 mb-6">
        Manage your course catalog, pricing, and visibility.
      </p>
      <div className="bg-white p-5 rounded-lg border">
        {isLoading && (
          <p className="text-sm text-gray-600">Loading courses...</p>
        )}

        {!isLoading && error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        {!isLoading && !error && courses.length === 0 && (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              No courses found. Create your first course.
            </p>
            <button
              type="button"
              onClick={() => navigate("/admin/courses/add")}
              className="px-4 py-2 bg-black text-white rounded"
            >
              Add Course
            </button>
          </div>
        )}

        {!isLoading && !error && courses.length > 0 && (
          <div className="space-y-4">
            {courses.map((course) => (
              <div
                key={course._id}
                className="border rounded-md p-4 space-y-4"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="h-20 w-32 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                      {course.thumbnail ? (
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">No image</span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 uppercase">
                        {course.category || "Uncategorized"}
                      </p>
                      <h3 className="text-lg font-semibold">{course.title}</h3>
                      <p className="text-sm text-gray-600">
                        {course.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm text-gray-500">
                      {course.isFree || course.price === 0
                        ? "Free"
                        : `₹${course.discountPrice || course.price}`}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        course.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {course.status || "draft"}
                    </span>
                    <button
                      type="button"
                      onClick={() => startEdit(course)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(course._id)}
                      className="text-sm text-red-600 hover:text-red-800"
                      disabled={deleteId === course._id}
                    >
                      {deleteId === course._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>

                {editCourseId === course._id && (
                  <form onSubmit={handleEditSubmit} className="border-t pt-4 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Title
                        </label>
                        <input
                          name="title"
                          value={editForm.title}
                          onChange={handleEditChange}
                          className="w-full border rounded px-3 py-2"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Category
                        </label>
                        <input
                          name="category"
                          value={editForm.category}
                          onChange={handleEditChange}
                          className="w-full border rounded px-3 py-2"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Level
                        </label>
                        <select
                          name="level"
                          value={editForm.level}
                          onChange={handleEditChange}
                          className="w-full border rounded px-3 py-2"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Language
                        </label>
                        <input
                          name="language"
                          value={editForm.language}
                          onChange={handleEditChange}
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
                        value={editForm.shortDescription}
                        onChange={handleEditChange}
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
                        value={editForm.fullDescription}
                        onChange={handleEditChange}
                        className="w-full border rounded px-3 py-2"
                        rows="3"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Tags (comma separated)
                      </label>
                      <input
                        name="tags"
                        value={editForm.tags}
                        onChange={handleEditChange}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Thumbnail URL
                        </label>
                        <input
                          name="thumbnail"
                          value={editForm.thumbnail}
                          onChange={handleEditChange}
                          className="w-full border rounded px-3 py-2"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Promo Video URL
                        </label>
                        <input
                          name="promoVideo"
                          value={editForm.promoVideo}
                          onChange={handleEditChange}
                          className="w-full border rounded px-3 py-2"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="block text-sm font-medium">
                            Main Course Videos (minimum 1)
                          </label>
                          <p className="text-xs text-gray-500">
                            At least one main course video is required.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={addEditMainVideo}
                          className="px-3 py-1.5 text-sm border rounded"
                        >
                          Add Video
                        </button>
                      </div>

                      {editForm.mainVideos.map((video, index) => (
                        <div
                          key={`edit-main-video-${index}`}
                          className="flex items-center gap-2"
                        >
                          <input
                            value={video}
                            onChange={(event) =>
                              updateEditMainVideo(index, event.target.value)
                            }
                            placeholder="Main video URL"
                            className="flex-1 border rounded px-3 py-2"
                            required={index === 0}
                          />
                          <button
                            type="button"
                            onClick={() => removeEditMainVideo(index)}
                            className="text-sm text-red-600"
                            disabled={editForm.mainVideos.length <= 1}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={editForm.status === "published"}
                        onChange={handleEditPublishToggle}
                        className="h-4 w-4"
                      />
                      <span className="text-sm">Publish course</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="isFree"
                        checked={editForm.isFree}
                        onChange={handleEditChange}
                        className="h-4 w-4"
                      />
                      <span className="text-sm">Mark as free course</span>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Price
                        </label>
                        <input
                          name="price"
                          type="number"
                          value={editForm.price}
                          onChange={handleEditChange}
                          className="w-full border rounded px-3 py-2"
                          disabled={editForm.isFree}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Discount Price
                        </label>
                        <input
                          name="discountPrice"
                          type="number"
                          value={editForm.discountPrice}
                          onChange={handleEditChange}
                          className="w-full border rounded px-3 py-2"
                          disabled={editForm.isFree}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Access Type
                        </label>
                        <select
                          name="accessType"
                          value={editForm.accessType}
                          onChange={handleEditChange}
                          className="w-full border rounded px-3 py-2"
                        >
                          <option value="lifetime">Lifetime</option>
                          <option value="limited">Limited</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Status
                        </label>
                        <select
                          name="status"
                          value={editForm.status}
                          onChange={handleEditChange}
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
                        checked={editForm.certificateAvailable}
                        onChange={handleEditChange}
                        className="h-4 w-4"
                      />
                      <span className="text-sm">Certificate available</span>
                    </div>

                    {editStatus && (
                      <p
                        className={`text-sm ${
                          editStatus.type === "success"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {editStatus.text}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-black text-white rounded disabled:opacity-60"
                        disabled={isSaving}
                      >
                        {isSaving ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="px-4 py-2 border rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCourses;

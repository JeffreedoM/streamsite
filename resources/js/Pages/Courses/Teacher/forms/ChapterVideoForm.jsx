import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// validation
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

// // Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
);

import { Button } from "@/components/ui/button";
import { useForm, router, usePage } from "@inertiajs/react";
function ChapterVideoForm({ course_chapter, video_url }) {
  const { id, chapter_video } = course_chapter;
  const [files, setFiles] = useState([]);
  const [showSubmitBtn, setShowSubmitBtn] = useState(false);
  const { data, setData } = useForm({ submitVideo: false, filePath: null });
  const { status } = usePage().props;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    router.post(
      `/chapter/${id}/video/submit`,
      { _method: "put", ...data },
      {
        onSuccess: () => {
          alert("Chapter Video updated!");
        },
        onError: (error) => {
          console.error("Error updating chapter video:", error);
        },
      },
    );
  };
  const videoRef = useRef(null);

  return (
    <div>
      {chapter_video ? (
        <div>
          <video controls className="w-full">
            <source src={video_url} type="video/mp4" />
            {/* <source
              src={`https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4`}
              type="video/mp4"
            /> */}
            Your browser does not support the video tag.
          </video>

          {/* <ReactPlayer
            ref={videoRef}
            controls
            url={`/storage/${chapter_video}`}
            // url={
            //   "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"
            // }
          /> */}
        </div>
      ) : (
        <FilePond
          files={files}
          onupdatefiles={setFiles}
          allowMultiple={false}
          maxFiles={3}
          server={{
            process: {
              url: `/chapter/${id}/video/upload`,
              method: "POST",
              withCredentials: true,
              headers: {
                "X-CSRF-TOKEN": document.querySelector(
                  'meta[name="csrf-token"]',
                ).content,
              },
              onload: (response) => {
                // Parse the response from the server to get the file path
                const { filePath } = JSON.parse(response); // Make sure filePath is sent in the response
                setData((prevData) => ({
                  ...prevData,
                  filePath, // Save the filePath
                }));
              },
              onerror: (error) => {
                console.error("File upload error:", error);
              },
            },
            revert: {
              url: `/chapter/${id}/video/upload`,
              method: "DELETE",
              headers: {
                "X-CSRF-TOKEN": document.querySelector(
                  'meta[name="csrf-token"]',
                ).content,
              },
            },
          }}
          onprocessfile={(error) => {
            if (!error) {
              setShowSubmitBtn(true);
              setData("submitVideo", true);
            }
          }}
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "20px",
            border: "2px solid #ddd",
          }}
          name="files"
          acceptedFileTypes={["video/mp4"]}
          labelIdle='Drag & Drop the video or <span class="filepond--label-action">Browse</span>'
        />
      )}

      {showSubmitBtn && (
        <form onSubmit={handleSubmit}>
          <Button type="submit">Upload</Button>
        </form>
      )}
    </div>
  );
}

export default ChapterVideoForm;

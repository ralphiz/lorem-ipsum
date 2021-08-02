import { useState } from "react";
import { auth, storage, STATE_CHANGED } from "../lib/firebase";
import Loader from "./Loader";

// Upload images to Firebase Storage
export default function ImageUploader() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  // Creates a Firebase Upload task
  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the file
    const file = Array.from(e.target.files)[0];
    const extension = file.type.split("/")[1];

    // Makes reference to the storage bucket location
    const ref = storage.ref(
      `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`
    );
    setIsUploading(true);

    // Starts the upload
    const task = ref.put(file);

    // List to updates to upload task
    task.on(STATE_CHANGED, (snapshot) => {
      const uploadPercentage = (
        (snapshot.bytesTransferred / snapshot.totalBytes) *
        100
      ).toFixed(0);
      setProgress(uploadPercentage);
    });

    // Get downloadUrl after task resolves (Note: the first 'then' is not a native Promise)
    task
      .then((d) => ref.getDownloadURL())
      .then((url) => {
        setDownloadUrl(url);
        setIsUploading(false);
      });
  };

  return (
    <div className="box">
      <Loader show={isUploading} />
      {isUploading && <h3>{progress}%</h3>}

      {!isUploading && (
        <>
          <label className="btn">
            📸 Upload Img
            <input
              type="file"
              onChange={uploadFile}
              accept="image/x-png,image/gif,image/jpeg"
            />
          </label>
        </>
      )}

      {downloadUrl && (
        <code className="upload-snippet">{`![alt](${downloadUrl})`}</code>
      )}
    </div>
  );
}

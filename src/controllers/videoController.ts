import { TVideo } from "../models/videoModel";
import { nanoid } from "nanoid"; // import the nanoid function from the nanoid library
import fs from "fs";
import path from "path";

import VideoRepository from "../repositories/videoRepository";

// Create a new instance of the VideoRepository class
const videoRepository = new VideoRepository();

// Define a function called `saveNewVideo` that takes a file object as its argument and returns a Promise that resolves to a saved video object
const saveNewVideo = async (uploadedFile: any): Promise<TVideo> => {
  try {
    // Generate a unique ID for the new video using nanoid
    const readableId = nanoid(10);

    // Get the path of the temporary file that was uploaded
    const fileBuffer = uploadedFile.data;

    // Construct the file path where the uploaded file will be saved
    const filePath = path.join(__dirname, "../../uploads", `${readableId}.mp4`);

    // Write the file buffer to disk using Node.js' built-in fs module
    fs.writeFile(filePath, fileBuffer, function (err) {
      if (err) {
        // Handle any errors that occur while writing the file
        throw new Error(`error is ${err}`);
      }
    });

    const savedNewVideo = await videoRepository.saveVideo(filePath, readableId);

    // Return the saved video object
    return savedNewVideo;
  } catch (e) {
    // If an error occurs, log the error to the console
    throw new Error(`something went wrong and it is ${e}`);
  }
};

const deleteSavedVideo = async (videoId: string): Promise<boolean> => {
  try {
    const deletedVideo = await videoRepository.deleteVideo(videoId);

    if (deletedVideo !== null && "filePath" in deletedVideo) {
      if (
        deletedVideo.filePath !== null ||
        deletedVideo.filePath !== undefined
      ) {
        const filePath = deletedVideo.filePath as string;

        fs.unlink(filePath, (err: any) => {
          if (err) throw new Error(err);
        });

        return true;
      } else {
        return false;
      }
    }
    throw new Error("Error deleting the video from the database");
  } catch (e) {
    // If an error occurs, log the error to the console
    throw new Error("Error deleting the video from the database");
  }
};

const getFilePath = async (videoId: string): Promise<string> => {
  try {
    const videoToBeStreamed = await videoRepository.findVideo(videoId);

    if (videoToBeStreamed?.filePath) {
      return videoToBeStreamed.filePath;
    }
    return `File not found in a local storage.`;
  } catch (e) {
    throw new Error("Error finding the file in a database.");
  }
};

const parseRange = (
  range: string,
  statsSize: number
): { startPos: number; endPos: number | undefined } => {
  const [start, end] = range.replace("bytes=", "").split("-");

  const startPos = parseInt(start, 10);
  const endPos = end ? parseInt(end, 10) : statsSize - 1;

  return { startPos, endPos };
};

// Export the `saveNewVideo` function as the default export of this module
export { saveNewVideo, deleteSavedVideo, getFilePath, parseRange };

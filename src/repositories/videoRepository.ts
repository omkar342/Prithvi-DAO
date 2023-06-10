import { Video, TVideo } from "../models/videoModel";

class VideoRepository {
  /**
   * Saves a new video to the database with the given file path and readable ID.
   * @param filePath - The file path for the video to save.
   * @param readableId - The unique ID for the video to save.
   * @returns A Promise that resolves to the saved video Document.
   * @throws An error if there is an issue saving the video to the database.
   */
  public async saveVideo(
    filePath: string,
    readableId: string
  ): Promise<TVideo> {
    try {
      const newVideo = new Video({
        filePath,
        readableId,
      });
      const savedNewVideo = await newVideo.save();

      // Returning a Document which is saved
      return savedNewVideo;
    } catch (err) {
      throw new Error("Error saving video to the database");
    }
  }

  /**
   * Deletes a video from the database with the given readable ID.
   * @param videoId - The unique ID of the video to delete.
   * @returns A Promise that resolves to the deleted video Document.
   * @throws An error if there is an issue deleting the video from the database.
   */
  public async deleteVideo(videoId: string): Promise<TVideo> {
    try {
      const deletedVideo = await Video.findOneAndDelete({
        readableId: videoId,
      });

      if (!deletedVideo) {
        throw new Error(`Video with ID ${videoId} not found`);
      }
      return deletedVideo;
    } catch (err) {
      throw new Error("Error deleting the video from the database");
    }
  }

  /**
   * Finds a video in the database with the given readable ID.
   * @param videoId - The unique ID of the video to find.
   * @returns A Promise that resolves to the found video Document.
   * @throws An error if there is an issue finding the video in the database.
   */
  public async findVideo(videoId: string): Promise<TVideo> {
    try {
      const foundVideo = await Video.findOne({ readableId: videoId });

      if (!foundVideo) {
        throw new Error(`Video with ID ${videoId} not found`);
      }
      return foundVideo;
    } catch (err) {
      throw new Error("Error finding the video from the database");
    }
  }
}

export default VideoRepository;

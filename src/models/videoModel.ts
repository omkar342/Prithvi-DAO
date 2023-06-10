import { Schema, model } from "mongoose";

type TVideo = {
  filePath: string;
  readableId: string;
};

const videoSchema = new Schema<TVideo>({
  filePath: {
    type: String,
    required: true,
  },
  readableId: {
    type: String,
    required: true,
  },
});

const Video = model<TVideo>("videos", videoSchema);

export { Video, TVideo };

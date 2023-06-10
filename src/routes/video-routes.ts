import express, { Request, Response } from "express";
import fs from "fs";

import {
  saveNewVideo,
  deleteSavedVideo,
  getFilePath,
  parseRange,
} from "../controllers/videoController";

// import saveNewVideo from "../controllers/videoController";

const router = express.Router();

// save video api call
router.post("/", async (req: Request, res: Response) => {
  try {
    if (req.files) {
      const uploadedFile = req.files.myFile;
      const savedVideo = await saveNewVideo(uploadedFile);
      res.status(201).json({ savedVideo: savedVideo });
    } else {
      res.status(400).send("No file was included in the request");
    }
  } catch (err) {
    res.status(500).send(`Errror is ${err}`);
  }
});

// Stream video api call
router.get("/stream", async (req: Request, res: Response) => {
  try {
    const videoId = req.query.videoId as string;

    const filePath = await getFilePath(videoId);

    fs.stat(filePath, function (err, stats) {
      if (err) {
        if (err.code === "ENOENT") {
          res.statusCode = 404;
          res.end("File not found");
        } else {
          res.statusCode = 500;
          res.end("Internal server error");
        }
      } else {
        res.setHeader("Content-Type", "video/mp4");
        res.setHeader("Content-Length", stats.size);
        const range = req.headers.range;

        if (range) {
          const { startPos, endPos } = parseRange(range, stats.size);

          res.setHeader(
            "Content-Range",
            `bytes ${startPos}-${endPos}/${stats.size}`
          );

          res.statusCode = 206;

          const stream = fs.createReadStream(filePath, {
            start: startPos,
            end: endPos,
          });

          stream.pipe(res);
        } else {
          const stream = fs.createReadStream(filePath);
          stream.pipe(res);
        }
      }
    });
  } catch (err) {
    res.status(500).send(`Errror is ${err}`);
  }
});

// delete video api call

router.delete("/delete", async (req: Request, res: Response) => {
  try {
    const { videoId } = req.body;

    if (videoId) {
      if (await deleteSavedVideo(videoId)) {
        res.status(200).send(`Video with readableId: ${videoId} is deleted.`);
      } else {
        res.status(400).send("Something went blah blah blah");
      }
    } else {
      res.status(400).send("No video id was included in the request");
    }
  } catch (err) {
    res.status(500).send(`Errror is ${err}`);
  }
});

export default router;

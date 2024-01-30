const express = require("express");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
const fs = require("fs");
cors = require("cors");

const app = express();
app.use(cors());

app.get("/video", function (request, response) {
  const videoUrl = request.query.url;

  console.log(request.query);

  const head = {
    "Content-Type": "video/mp4",
  };
  response.writeHead(200, head);

  ffmpeg()
    .input(videoUrl)
    .format("mp4")
    .outputFormat("mp4")
    .videoCodec("libx264")
    .withAudioCodec("aac")
    .outputOptions("-movflags frag_keyframe+empty_moov")
    .pipe(response, {
      end: true,
    });
});

app.listen(5555);

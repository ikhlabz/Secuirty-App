import multer from "multer";

const storage = multer.memoryStorage();
const singlePdf = multer({ storage: storage }).fields([
  { name: "pdf", maxCount: 1 },
  { name: "file", maxCount: 1 },
]);

export default singlePdf;

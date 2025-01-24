export default function sendResponse(res,status, error, data, msg) {
  res.status(status).json({
    status,
    error,
    data:data,
    msg,
  });
}
const authMiddleware = (req, res, next) => {
  const header = req.headers["Authorization"];
  if (!header) {
    res.status(401).json({ message: "Unauthorized" });
  }
  const token = req.headers["Authorization"].split(" ")[1];
};

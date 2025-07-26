const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/proxy", async (req, res) => {
  const { url, method = "GET", headers = {}, data = {} } = req.body;

  try {
    const response = await axios({ url, method, headers, data });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data || null
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy draait op poort ${PORT}`));

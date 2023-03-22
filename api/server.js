// SUNUCUYU BU DOSYAYA KURUN
const serverF = require("./users/model");
const express = require("express");
const server = express();
server.use(express.json());

server.post("/api/users", async (req, res) => {
  try {
    const name = req.body.name;
    const bio = req.body.bio;
    if (name && bio) {
      const newUser = { name: name, bio: bio };
      const newUserData = await serverF.insert(newUser);
      res.status(201).json(newUserData);
    } else {
      res
        .status(400)
        .json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
  }
});

server.get("/api/users", async (req, res) => {
  try {
    const data = await serverF.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
  }
});
server.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await serverF.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" });
  }
});
server.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await serverF.findById(id);
    if (user) {
      const deletedUser = await serverF.remove(id);
      res.status(200).json(deletedUser);
    } else {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı silinemedi" });
  }
});

server.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await serverF.findById(id);
    if (user) {
      const name = req.body.name;
      const bio = req.body.bio;
      if (name && bio) {
        const updatedUser = await serverF.update(id, { name: name, bio: bio });
        res.status(200).json(updatedUser);
      } else {
        res
          .status(400)
          .json({ message: "Lütfen kullanıcı için name ve bio sağlayın" });
      }
    } else {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgileri güncellenemedi" });
  }
});

module.exports = server; // SERVERINIZI EXPORT EDİN {}

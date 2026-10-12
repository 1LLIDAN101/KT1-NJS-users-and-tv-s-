const express = require("express");
const mongoose = require("mongoose");
const Store = require("./tvs");
const User = require("./User");

const PORT = 5000;
const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/store")
  .then(() => {
    console.log("подключен к БД");
  })
  .catch((error) => {
    console.log("ошибка" + error);
  });
////////////////////////////////////   USERS


app.get("/user", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
    console.log(user);
  } catch (error) {
    console.log("ОШИБКА ПРИ ПОЛУЧЕНИИ ДАННЫХ ЮЗЕРОВ ---" + error);
    res.status(500).send("Ошибка сервера");
  }
});
app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);

    if (!updatedUser) {
      return res.status(404).send("Такого юзера не существует!");
    }
  } catch (error) {
    console.log("ОШИБКА ПРИ ПОЛУЧЕНИИ 1 ЮЗЕРА ---" + error);
  }
});

app.post("/adduser", async (req, res) => {
  try {
    const { name, last_name, age, city } = req.body;
    const newUser = await User.create({
      name,
      last_name,
      age,
      city,
    });
    res.send("- ЮЗЕР ОТПРАВЛЕН УСПЕШНО -");
  } catch (error) {
    console.log("Ошибка при добавлении ---" + error);
    res.status(500).send("Ошибка сервера");
  }
});

app.patch("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, last_name, age, city } = req.body;
    console.log(name, last_name, age, city);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, last_name, age, city },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).send("Такого юзера не существует!");
    }

    res.send("Юзеры успешно изменены!");
  } catch (error) {
    console.log("Ошибка, не удалось выполнить команду --" + error);
    res.status(500).send("Ошибка сервера");
  }
});


app.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send("Юзер не найден");
    }

    res.send("Юзер успешно удален!!");
  } catch (error) {
    console.log("ОШИБКА ПРИ УДАЛЕНИИ ЮЗЕРА ---- " + error);
    res.status(500).send("Ошибка сервера");
  }
});

//////////////////////////////////////////////////// TVS
app.get("/store", async (req, res) => {
  try {
    const store = await Store.find();
    res.json(store);
    console.log(store);
  } catch (error) {
    console.log("ОШИБКА ПРИ ПОЛУЧЕНИИ ДАННЫХ ТЕЛЕВИЗОРА ---" + error);
    res.status(500).send("Ошибка сервера");
  }
});

app.get("/store/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Store.findById(id);
    res.json(store);

    if (!updatedStore) {
      return res.status(404).send("Такого телевизора не существует!");
    }
  } catch (error) {
    console.log("ОШИБКА ПРИ ПОЛУЧЕНИИ 1 ТЕЛЕВИЗОРА ---" + error);
  }
});



app.post("/addstore", async (req, res) => {
  try {
    const { title, description, price, model } = req.body;
    const newStore = await Store.create({
      title,
      description,
      price,
      model,
    });
    res.send("- ТЕЛЕВИЗОР ОТПРАВЛЕН УСПЕШНО -");
  } catch (error) {
    console.log("Ошибка при добавлении ---" + error);
    res.status(500).send("Ошибка сервера");
  }
});

app.patch("/store/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, model } = req.body;
    console.log(title, description, price, model);

    const updatedStore = await Store.findByIdAndUpdate(
      id,
      { title, description, price, model },
      { new: true },
    );

    if (!updatedStore) {
      return res.status(404).send("Такого телевизора не существует!");
    }

    res.send("Данные успешно изменены!");
  } catch (error) {
    console.log("Ошибка, не удалось выполнить команду --" + error);
    res.status(500).send("Ошибка сервера");
  }
});

app.delete("/deletestore/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const store = await Store.findByIdAndDelete(id);

    if (!store) {
      return res.status(404).send("Телевизор не найден");
    }

    res.send("Продукт(телевизор) успешно удален!!");
  } catch (error) {
    console.log("ОШИБКА ПРИ УДАЛЕНИИ ПРОДУКТА ---- " + error);
    res.status(500).send("Ошибка сервера");
  }
});

app.listen(PORT, () => {
  console.log("Сервер успешно запущен на порту: " + PORT);
});

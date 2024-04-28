import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://kaminskiksawery:Ri6R3JKSKlmkU2ex@voteup.7je8wta.mongodb.net/voteUP"
    );

    console.log("połączono z bazą danych");
  } catch (error) {
    console.log("błąd z łączeniem z bazą danych", error);
  }
};

export default connect;

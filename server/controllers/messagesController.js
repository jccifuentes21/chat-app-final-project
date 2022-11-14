const messageModel = require("../model/messageModel");

module.exports.addMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "message added successfully" });

    return res.json({ msg: "Failed to add message to database" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getMessages = async (req, res) => {
  try {
    const { from, to } = req.body;

    const messages = await messageModel.find({
      users: {
        $all: [from, to],
      }
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((message) => {
      return {
        id: message._id,
        fromSelf: message.sender.toString() === from,
        message: message.message.text,
      };
    });

    return res.json(projectedMessages);
  } catch (error) {
    console.log(error);
  }
};

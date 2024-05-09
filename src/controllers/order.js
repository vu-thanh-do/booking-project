import Order from "../models/order.js";
import Room from "../models/room.js";

export const orderController = {
  createOrder: async (req, res) => {
    try {
      const dataRoom = await Room.findById(req.params.id);
      if (!dataRoom) {
        return res.status(404).json({
          message: "Invalid",
        });
      }
      const data = req.body;
      const newOrder = await Order.create({
        userId: data.userId,
        price: data.price,
        noteBooking: data.noteBooking,
        status: "PENDING",
        typePayment: "EMPTY",
        room: {
          idRoom: req.params.id,
          nameRoom: dataRoom.name,
          imageRoom: dataRoom.image,
          desc: dataRoom.desc,
          piceRoom: dataRoom.price,
          typeRoom: dataRoom.type,
          countPeople: dataRoom.countPeople,
          people: data.people,
          startDate: data.startDate,
          endDate: data.endDate,
        },
      });
      return res.status(201).json({
        message: "ok",
        data: newOrder,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getAllOrder: async (req, res) => {
    try {
      const data = await Order.find({}).populate([
        {
          path: "userId",
          select: "-password -order",
        },
      ]);
      return res.status(200).json({ message: "ok", data: data });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getIdOrder: async (req, res) => {
    try {
      const data = await Order.findById(req.params.id).populate([
        {
          path: "userId",
          select: "-password -order",
        },
      ]);
      if (!data) {
        return res.status(404).json({
          message: "Invalid",
        });
      }
      return res.status(200).json({ message: "ok", data: data });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getAllOrderByUser: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Order.find({
        userId: id,
      });
      return res.status(200).json({ message: "ok", data: data });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateStatusOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const bodyData = req.body;
      const data = await Order.findById(id);
      if (!data) return res.status(404).json({ message: "Invalid order" });
      (data.status = bodyData.status),
        (data.typePayment = bodyData.typePayment);
      await data.save();
      return res.status(200).json({ message: "ok", data });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  editOrder: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

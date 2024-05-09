import Room from "../models/room.js";

export const roomController = {
  createRoom: async (req, res) => {
    try {
      const data = req.body;
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getALlRoom: async (req, res) => {
    try {
      const data = await Room.find({});
      return res.status(200).json({ message: "ok", data: data });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getIdRoom: async (req, res) => {
    try {
      const data = await Room.findById(req.params.id);
      return res.status(200).json({ message: "ok", data: data });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  removeRoom: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  editRoom: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  searchRoom : async (req, res) => {
    try {
        
    } catch (error) {
      return res.status(500).json({ message: error.message });
        
    }
  },
  evaluateRoom : async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

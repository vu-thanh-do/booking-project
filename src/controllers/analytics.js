import Order from "../models/order.js";

export const analyticsController = {
  getAllTotals: async (req, res) => {
    try {
      const { day, week, month, year ,quarter, startDate,endDate } = req.query;
      let filter = { status: "PAYED" };
      if (day) {
        const date = new Date(day);
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        filter["room.startDate"] = { $lte: nextDate.toISOString() };
        filter["room.endDate"] = { $gte: date.toISOString() };
      } else if (week) {
        const startDate = new Date(week);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 7);
        filter["room.startDate"] = { $lte: endDate.toISOString() };
        filter["room.endDate"] = { $gte: startDate.toISOString() };
      } else if (month) {
        const startDate = new Date(`${month}-01T00:00:00.000Z`);
        const nextMonth = new Date(startDate);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        filter["room.startDate"] = { $lte: nextMonth.toISOString() };
        filter["room.endDate"] = { $gte: startDate.toISOString() };
      } else if (year) {
        const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
        const nextYear = new Date(startDate);
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        filter["room.startDate"] = { $lte: nextYear.toISOString() };
        filter["room.endDate"] = { $gte: startDate.toISOString() };
      } else if (quarter) {
        const [q, y] = quarter.split('-');
        const year = parseInt(y, 10);
        let startMonth, endMonth;
        switch (parseInt(q, 10)) {
          case 1:
            startMonth = 0; // January
            endMonth = 3; // April
            break;
          case 2:
            startMonth = 3; // April
            endMonth = 6; // July
            break;
          case 3:
            startMonth = 6; // July
            endMonth = 9; // October
            break;
          case 4:
            startMonth = 9; // October
            endMonth = 12; // January next year
            break;
          default:
            throw new Error("Invalid quarter");
        }
        const startDate = new Date(year, startMonth, 1);
        const endDate = new Date(year, endMonth, 1);
        filter["room.startDate"] = { $lt: endDate.toISOString() };
        filter["room.endDate"] = { $gte: startDate.toISOString() };
      } else if(startDate && endDate){
        const start = new Date(startDate);
        const end = new Date(endDate);
        filter["room.startDate"] = { $lt: end.toISOString() };
        filter["room.endDate"] = { $gte: start.toISOString() };
      } else {
        const today = new Date();
        const past7Days = new Date(today);
        past7Days.setDate(today.getDate() - 7);
        filter["room.startDate"] = { $lte: today.toISOString() };
        filter["room.endDate"] = { $gte: past7Days.toISOString() };
      }

      console.log("Filter:", filter);
      const orders = await Order.find(filter).populate("userId");
      console.log("Orders found:", orders);
      const totalRevenue = orders.reduce((sum, order) => sum + order.price, 0);
      return res.status(200).json({
        total: totalRevenue,
        orderInfo: orders,
        filter: filter,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getToTalIdRoom : async(req,res)=>{
    try {
        const idRoom = req.params.id
        const { day, week, month, year,startDate,endDate ,quarter} = req.query;
        let filter = { status: "PAYED" , ['room.idRoom' ]:idRoom};
        
        if (day) {
          const date = new Date(day);
          const nextDate = new Date(date);
          nextDate.setDate(nextDate.getDate() + 1);
          filter["room.startDate"] = { $lte: nextDate.toISOString() };
          filter["room.endDate"] = { $gte: date.toISOString() };
        } else if (week) {
          const startDate = new Date(week);
          const endDate = new Date(startDate);
          endDate.setDate(endDate.getDate() + 7);
          filter["room.startDate"] = { $lte: endDate.toISOString() };
          filter["room.endDate"] = { $gte: startDate.toISOString() };
        } else if (month) {
          const startDate = new Date(`${month}-01T00:00:00.000Z`);
          const nextMonth = new Date(startDate);
          nextMonth.setMonth(nextMonth.getMonth() + 1);
          filter["room.startDate"] = { $lte: nextMonth.toISOString() };
          filter["room.endDate"] = { $gte: startDate.toISOString() };
        } else if (year) {
          const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
          const nextYear = new Date(startDate);
          nextYear.setFullYear(nextYear.getFullYear() + 1);
          filter["room.startDate"] = { $lte: nextYear.toISOString() };
          filter["room.endDate"] = { $gte: startDate.toISOString() };
        } else if (quarter) {
          const [q, y] = quarter.split('-');
          const year = parseInt(y, 10);
          let startMonth, endMonth;
          switch (parseInt(q, 10)) {
            case 1:
              startMonth = 0; // January
              endMonth = 3; // April
              break;
            case 2:
              startMonth = 3; // April
              endMonth = 6; // July
              break;
            case 3:
              startMonth = 6; // July
              endMonth = 9; // October
              break;
            case 4:
              startMonth = 9; // October
              endMonth = 12; // January next year
              break;
            default:
              throw new Error("Invalid quarter");
          }
          const startDate = new Date(year, startMonth, 1);
          const endDate = new Date(year, endMonth, 1);
          filter["room.startDate"] = { $lt: endDate.toISOString() };
          filter["room.endDate"] = { $gte: startDate.toISOString() };
        } else if(startDate && endDate){
          const start = new Date(startDate);
          const end = new Date(endDate);
          filter["room.startDate"] = { $lt: end.toISOString() };
          filter["room.endDate"] = { $gte: start.toISOString() };
        }  else {
          const today = new Date();
          const past7Days = new Date(today);
          past7Days.setDate(today.getDate() - 7);
          filter["room.startDate"] = { $lte: today.toISOString() };
          filter["room.endDate"] = { $gte: past7Days.toISOString() };
        }
        console.log("Filter:", filter);
        const orders = await Order.find(filter).populate("userId");
        console.log("Orders found:", orders);
        const totalRevenue = orders.reduce((sum, order) => sum + order.price, 0);
        return res.status(200).json({
          total: totalRevenue,
          orderInfo: orders,
          filter: filter,
        });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
  }
};

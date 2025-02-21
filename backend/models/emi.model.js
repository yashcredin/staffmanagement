import mongoose from "mongoose";

const emiSchema = new mongoose.Schema({
  personId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
    required: true
  },
  month: String,
  emi: String,
  charges: { type: String, default: 0 },
  totalEmi: String,
  amountPaid: { type: String, default: 0 },
  balanceAmt: String
});

const EMI = mongoose.model("EMI", emiSchema);
export default EMI;

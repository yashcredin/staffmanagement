import mongoose from "mongoose";

const emiSchema = new mongoose.Schema({
  personId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
    required: true
  },
  month: String,
  emi: String,
  adjustedAmount : {type:String , default : 0},
  charges: { type: String, default: 0 },
  totalEmi: String,
  amountPaid: { type: String, default: 0 },
  balanceAmt: String,
  transactionDone : {type : Boolean , default : false}
});

const EMI = mongoose.model("EMI", emiSchema);
export default EMI;

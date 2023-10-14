const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const JobSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, 'You must provide a company name!'],
      trim: true,
      maxlength: [50, 'name can not be more than 50 characters'],
    },
    position: {
      type: String,
      required: [true, 'Please provide position info'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide the User associated with this Job'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model('Job', JobSchema);

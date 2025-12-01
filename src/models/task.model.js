const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    taskId: {
      type: String,
      default: () => require('crypto').randomUUID(),
      unique: true,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Task description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
taskSchema.index({ userId: 1, completed: 1 });
taskSchema.index({ createdAt: 1 });
taskSchema.index({ taskId: 1 });

// Virtual field to populate user details
taskSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

// Enable virtuals in JSON
taskSchema.set('toJSON', { virtuals: true });
taskSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Task', taskSchema);

// const mongoose = require('mongoose');
// const { v4: uuidv4 } = require('uuid');

// const taskSchema = new mongoose.Schema(
//   {
//     taskId: {
//       type: String,
//       default: uuidv4,
//       unique: true,
//       required: true,
//     },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: [true, 'User ID is required'],
//     },
//     title: {
//       type: String,
//       required: [true, 'Task title is required'],
//       trim: true,
//       minlength: [3, 'Title must be at least 3 characters'],
//       maxlength: [200, 'Title cannot exceed 200 characters'],
//     },
//     description: {
//       type: String,
//       required: [true, 'Task description is required'],
//       trim: true,
//       maxlength: [1000, 'Description cannot exceed 1000 characters'],
//     },
//     completed: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // Index for faster queries
// taskSchema.index({ userId: 1, completed: 1 });
// taskSchema.index({ createdAt: 1 });
// taskSchema.index({ taskId: 1 });

// // Virtual field to populate user details
// taskSchema.virtual('user', {
//   ref: 'User',
//   localField: 'userId',
//   foreignField: '_id',
//   justOne: true,
// });

// // Enable virtuals in JSON
// taskSchema.set('toJSON', { virtuals: true });
// taskSchema.set('toObject', { virtuals: true });

// module.exports = mongoose.model('Task', taskSchema);
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var eventSchema = new Schema({
  dateCreated:{type:Date, default:Date.now},
  confirmed:{type:Boolean, default:true},
  reminded:{type:Boolean, default:false},
  reminderPhone:{type:String, required:false},
  reminderEmail:{type:String, required:false},
  storeId:{type:mongoose.Schema.Types.ObjectId, required:true},
  storeName:{type:String, required:false},
  startDate:{type:Date, required:true},
  endDate:{type:Date, required:true},
  clientId:{type:mongoose.Schema.Types.ObjectId, required:true},
  clientName:{type:String, required:false},
  employeeId:{type:mongoose.Schema.Types.ObjectId, default:null},
  employeeName:{type:String, default:null},
  recurring:{type:Boolean, default:false},
  fullDay:{type:Boolean, default:false},
  frequencyRecurring:{type:Number, default:null},
    //(0 = everyDay, 1 = once a week, 2 = once a month, 3 = once a year)
  services:[{
    serviceId:{type:mongoose.Schema.Types.ObjectId, required:true},
    serviceName:{type:String, required:false},
    price:{type:Number, required:false},
    duration:{type:Number, default:0}
  }],
  numberTimesMissedOrMoved:{type:Number, default:0},
  addNote:{type:String, required:false}
});


var Event = mongoose.model('Event', eventSchema, 'Events');


module.exports = Event;

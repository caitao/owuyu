/**
 * Created by Administrator on 2016/10/18.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
    title: String,
    director: String,
    language: String,
    country: String,
    flash: String,
    poster: String,
    year: String,
    summary: String,
    meta:{
        createAt:{
            type: Date,
            default: Date.now()
        },
        updateAt:{
            type: Date,
            default: Date.now()
        }
    }
});

MovieSchema.pre('save',function (next) {
    if(this.isNew){
        this.meta.createAt = this.updateAt = Date.now();
    }else{
        this.updateAt = Date.now();
    }
    next();
});

// MovieSchema.statics = {
//     fetch: function (cb) {
//         return this
//           .find({})
//           .sort('meta.updateAt')
//           exec(cb);
//     },
//     findByID: function (id, cb) {
//         return this
//           .findOne({_id: id})
//           exec(cb);
//     }
// };

module.exports = mongoose.model('Movie', MovieSchema);
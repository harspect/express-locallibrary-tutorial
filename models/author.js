const mongoose = require("mongoose");
const {DateTime} = require("luxon");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: {type: String, required: true, maxLength: 100},
    family_name: {type: String, required: true, maxLength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date}
});

AuthorSchema.virtual("name").get(function () {
    let fullName = "";
    if (this.first_name && this.family_name)
        fullName = `${this.first_name} ${this.family_name}`;
    return fullName;
});

AuthorSchema.virtual("url").get(function() {
    return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("name").get(function () {
    let fullName = "";
    if (this.first_name && this.family_name)
        fullName = `${this.first_name} ${this.family_name}`;
    return fullName;
});

AuthorSchema.virtual("date_of_birth_formatted").get(function () {
    if (this.date_of_birth != null)
        return DateTime.fromJSDate(this.date_of_birth).toFormat("dd LLL yyyy");
    else
        return null;
});

AuthorSchema.virtual("date_of_death_formatted").get(function () {
    if (this.date_of_death != null)
        return DateTime.fromJSDate(this.date_of_death).toFormat("dd LLL yyyy");
    else
        return null;
});

module.exports = mongoose.model("Author", AuthorSchema);